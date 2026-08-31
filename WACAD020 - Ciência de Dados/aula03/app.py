# =====================================================================
# app.py — Dashboard Olist (Streamlit + Pandas + Plotly)
# Execute com:  streamlit run app.py
# =====================================================================
import streamlit as st
import pandas as pd
import plotly.express as px

# 1) Configuração da página — PRIMEIRA chamada Streamlit
st.set_page_config(page_title="Olist · Dashboard de Vendas",
                   page_icon="📦", layout="wide")

# 2) Carga de dados com cache (lê o CSV uma única vez)
@st.cache_data
def carregar_dados(caminho: str = "olist_pedidos.csv") -> pd.DataFrame:
    df = pd.read_csv(caminho, parse_dates=["data_pedido"])
    df["mes"] = df["data_pedido"].dt.to_period("M").dt.to_timestamp()
    return df

@st.cache_data
def para_download(dados: pd.DataFrame) -> bytes:
    return dados.to_csv(index=False).encode("utf-8")

try:
    df = carregar_dados()
except FileNotFoundError:
    st.error("Arquivo 'olist_pedidos.csv' não encontrado na pasta do app.")
    st.stop()

st.title("📦 Olist — Dashboard de Vendas e Logística")
st.caption("Marketplace brasileiro · pedidos entregues 2016–2018 · dados públicos anonimizados")

# 3) Sidebar — filtros combinados
st.sidebar.header("🔎 Filtros")
regioes = sorted(df["regiao"].dropna().unique())
regioes_sel = st.sidebar.multiselect("Região", regioes, default=regioes)

cats = sorted(df["categoria"].unique())
categorias_sel = st.sidebar.multiselect("Categoria", cats, default=cats)

data_min, data_max = df["data_pedido"].min().date(), df["data_pedido"].max().date()
periodo = st.sidebar.date_input("Período", value=(data_min, data_max),
                                min_value=data_min, max_value=data_max)
if isinstance(periodo, tuple) and len(periodo) == 2:
    data_ini, data_fim = pd.Timestamp(periodo[0]), pd.Timestamp(periodo[1])
else:
    data_ini, data_fim = pd.Timestamp(data_min), pd.Timestamp(data_max)

ticket_min = st.sidebar.slider("Ticket mínimo (R$)", 0, 500, 0, step=10)

mask = (df["regiao"].isin(regioes_sel)
        & df["categoria"].isin(categorias_sel)
        & df["data_pedido"].between(data_ini, data_fim)
        & (df["valor_total"] >= ticket_min))
dff = df[mask]

if dff.empty:
    st.warning("Nenhum pedido corresponde aos filtros. Ajuste a seleção.")
    st.stop()

# 4) KPIs com delta real (últimos 90d vs. 90d anteriores)
def kpis_com_delta(dados):
    fim = dados["data_pedido"].max()
    rec = dados[dados["data_pedido"] > fim - pd.Timedelta(days=90)]
    ant = dados[(dados["data_pedido"] <= fim - pd.Timedelta(days=90)) &
                (dados["data_pedido"] >  fim - pd.Timedelta(days=180))]
    def var(col):
        a = rec[col].mean()
        b = ant[col].mean() if not ant.empty else a
        return a, (0.0 if pd.isna(b) or b == 0 else (a - b) / b * 100)
    ticket, d_t = var("valor_total")
    nota,   d_n = var("avaliacao")
    return len(dados), ticket, d_t, nota, d_n, dados["entregue_no_prazo"].mean()*100

n, ticket, d_t, nota, d_n, prazo = kpis_com_delta(dff)
c1, c2, c3, c4 = st.columns(4)
c1.metric("Pedidos", f"{n:,}".replace(",", "."))
c2.metric("Ticket médio", f"R$ {ticket:,.2f}", delta=f"{d_t:+.1f}% vs. tri. ant.")
c3.metric("Avaliação média", f"{nota:.2f} ★", delta=f"{d_n:+.1f}%")
c4.metric("Entregas no prazo", f"{prazo:.1f}%")

st.divider()

# 5) Gráficos em abas
aba_geral, aba_geo, aba_log = st.tabs(["📈 Visão Geral", "🗺️ Geografia", "🚚 Logística"])

with aba_geral:
    col1, col2 = st.columns([0.55, 0.45])
    serie = (dff.set_index("data_pedido").resample("MS")
                .agg(receita=("valor_total", "sum")).reset_index())
    fig_t = px.area(serie, x="data_pedido", y="receita", markers=True,
                    title="Receita mensal (R$)",
                    labels={"data_pedido": "Mês", "receita": "Receita (R$)"})
    fig_t.update_traces(line_color="#2E86AB", fillcolor="rgba(46,134,171,0.15)")
    col1.plotly_chart(fig_t, use_container_width=True)

    cat = (dff.groupby("categoria")["valor_total"].sum()
              .sort_values().tail(10).reset_index())
    fig_c = px.bar(cat, x="valor_total", y="categoria", orientation="h",
                   title="Top 10 categorias por receita", color="valor_total",
                   color_continuous_scale="Blues",
                   labels={"valor_total": "Receita (R$)", "categoria": ""})
    fig_c.update_layout(coloraxis_showscale=False)
    col2.plotly_chart(fig_c, use_container_width=True)

with aba_geo:
    por_uf = (dff.groupby("estado")
                 .agg(pedidos=("id_pedido", "count"),
                      receita=("valor_total", "sum"),
                      ticket=("valor_total", "mean")).reset_index())
    GEO = ("https://raw.githubusercontent.com/codeforgermany/click_that_hood/"
           "main/public/data/brazil-states.geojson")
    try:  # coroplético; cai para barras se a rede falhar
        fig_m = px.choropleth(por_uf, geojson=GEO, locations="estado",
                              featureidkey="properties.sigla", color="pedidos",
                              color_continuous_scale="Blues", scope="south america",
                              title="Pedidos por estado")
        fig_m.update_geos(fitbounds="locations", visible=False)
        st.plotly_chart(fig_m, use_container_width=True)
    except Exception:
        fig_m = px.bar(por_uf.sort_values("pedidos", ascending=False),
                       x="estado", y="pedidos", color="ticket",
                       color_continuous_scale="Teal", title="Pedidos por estado (UF)")
        st.plotly_chart(fig_m, use_container_width=True)

with aba_log:
    col1, col2 = st.columns(2)
    fig_s = px.box(dff, x="entregue_no_prazo", y="avaliacao",
                   color="entregue_no_prazo",
                   color_discrete_map={True: "#2E86AB", False: "#E15554"},
                   category_orders={"entregue_no_prazo": [True, False]},
                   title="Avaliação × entrega no prazo",
                   labels={"entregue_no_prazo": "No prazo?", "avaliacao": "Nota"})
    fig_s.update_layout(showlegend=False)
    col1.plotly_chart(fig_s, use_container_width=True)

    reg = (dff.assign(frete_pct=lambda d: d["valor_frete"]/d["valor_total"]*100)
              .groupby("regiao")
              .agg(frete_pct=("frete_pct", "mean"),
                   prazo=("prazo_entrega_dias", "mean"),
                   pedidos=("id_pedido", "count")).reset_index())
    fig_r = px.scatter(reg, x="prazo", y="frete_pct", size="pedidos",
                       color="regiao", text="regiao", size_max=60,
                       title="Custo e prazo por região",
                       labels={"prazo": "Prazo médio (dias)",
                               "frete_pct": "Frete (% do valor)"})
    fig_r.update_traces(textposition="top center")
    col2.plotly_chart(fig_r, use_container_width=True)

st.divider()

# 6) Dados brutos (expander) + exportação do recorte filtrado
with st.expander("🔬 Ver dados filtrados / exportar"):
    st.dataframe(dff.head(200), use_container_width=True)
    st.download_button(
        "⬇️ Baixar CSV filtrado", data=para_download(dff),
        file_name="olist_filtrado.csv", mime="text/csv",
        icon=":material/download:",
    )
