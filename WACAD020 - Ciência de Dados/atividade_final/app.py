# =====================================================================
# Dashboard — Patrimônio dos Candidatos do AM
# Execute com: streamlit run app.py
# =====================================================================
import streamlit as st
import pandas as pd
import plotly.express as px

# B1. Configuração da página como primeira chamada Streamlit
st.set_page_config(
    page_title="Patrimônio dos candidatos do AM",
    page_icon="💼",
    layout="wide",
)

# -----------------------------
# Funções de apoio
# -----------------------------


@st.cache_data
def carregar_base(caminho: str = "bens_am_por_candidato.csv") -> pd.DataFrame:
    df = pd.read_csv(caminho)
    df["patrimonio_total"] = pd.to_numeric(
        df["patrimonio_total"], errors="coerce").fillna(0)
    df["qtd_bens"] = pd.to_numeric(df["qtd_bens"], errors="coerce").fillna(0)
    df["tipo_principal"] = df["tipo_principal"].fillna("SEM_BENS")
    return df


@st.cache_data
def carregar_bens_brutos(caminho: str = "data/bem_candidato_2026_AM.csv") -> pd.DataFrame | None:
    try:
        bens = pd.read_csv(
            caminho,
            sep=";",
            encoding="latin-1",
            decimal=",",
            usecols=["SQ_CANDIDATO", "DS_TIPO_BEM_CANDIDATO",
                     "VR_BEM_CANDIDATO", "SG_UF"],
        )
        bens["VR_BEM_CANDIDATO"] = pd.to_numeric(
            bens["VR_BEM_CANDIDATO"], errors="coerce").fillna(0)
        return bens
    except FileNotFoundError:
        return None


@st.cache_data
def para_download(dados: pd.DataFrame) -> bytes:
    return dados.to_csv(index=False).encode("utf-8")


def moeda_br(valor: float) -> str:
    return f"R$ {valor:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def pct_variacao(valor_filtrado: float, valor_base: float) -> float:
    if pd.isna(valor_base) or valor_base == 0:
        return 0.0
    return (valor_filtrado - valor_base) / valor_base * 100


# -----------------------------
# Carga
# -----------------------------
try:
    df = carregar_base()
except FileNotFoundError:
    st.error("Arquivo 'bens_am_por_candidato.csv' não encontrado na pasta do app.")
    st.stop()

bens_raw = carregar_bens_brutos()

# -----------------------------
# Cabeçalho
# -----------------------------
st.title("Patrimônio dos candidatos do Amazonas")
st.caption(
    "Dashboard com base no join entre candidatos e bens declarados. "
    "Os indicadores e gráficos reagem aos filtros da lateral."
)

# -----------------------------
# Filtros
# -----------------------------
st.sidebar.header("Filtros")

cargos = sorted(df["DS_CARGO"].dropna().unique())
partidos = sorted(df["SG_PARTIDO"].dropna().unique())
generos = ["Todos"] + sorted(df["DS_GENERO"].dropna().unique())

cargos_sel = st.sidebar.multiselect("Cargo", cargos, default=cargos)
partidos_sel = st.sidebar.multiselect("Partido", partidos, default=partidos)
genero_sel = st.sidebar.selectbox("Gênero", generos, index=0)

patrimonio_min = int(df["patrimonio_total"].min())
patrimonio_max = int(df["patrimonio_total"].max())
patrimonio_min_sel = st.sidebar.slider(
    "Patrimônio mínimo declarado (R$)",
    min_value=patrimonio_min,
    max_value=patrimonio_max,
    value=patrimonio_min,
    step=1000,
)

qtd_bens_min = int(df["qtd_bens"].min())
qtd_bens_max = int(df["qtd_bens"].max())
qtd_bens_sel = st.sidebar.slider(
    "Quantidade mínima de bens",
    min_value=qtd_bens_min,
    max_value=qtd_bens_max,
    value=qtd_bens_min,
    step=1,
)

mask = (
    df["DS_CARGO"].isin(cargos_sel)
    & df["SG_PARTIDO"].isin(partidos_sel)
    & (df["patrimonio_total"] >= patrimonio_min_sel)
    & (df["qtd_bens"] >= qtd_bens_sel)
)

if genero_sel != "Todos":
    mask &= df["DS_GENERO"].eq(genero_sel)

dff = df[mask].copy()

if dff.empty:
    st.warning("Nenhum registro corresponde aos filtros selecionados.")
    st.stop()

# -----------------------------
# KPIs
# -----------------------------
total_geral = df["patrimonio_total"].sum()
media_geral = df["patrimonio_total"].mean()
mediana_geral = df["patrimonio_total"].median()
cand_geral = df["SQ_CANDIDATO"].nunique()

total_filtrado = dff["patrimonio_total"].sum()
media_filtrada = dff["patrimonio_total"].mean()
mediana_filtrada = dff["patrimonio_total"].median()
cand_filtrado = dff["SQ_CANDIDATO"].nunique()
qtd_sem_bens = int((dff["qtd_bens"] == 0).sum())

delta_media = pct_variacao(media_filtrada, media_geral)
delta_cand = pct_variacao(cand_filtrado, cand_geral)
delta_total = pct_variacao(total_filtrado, total_geral)

c1, c2, c3, c4 = st.columns(4)
c1.metric("Patrimônio total", moeda_br(total_filtrado),
          delta=f"{delta_total:+.1f}% do total geral")
c2.metric("Candidatos", f"{cand_filtrado}",
          delta=f"{delta_cand:+.1f}% vs. base")
c3.metric("Patrimônio médio", moeda_br(media_filtrada),
          delta=f"{delta_media:+.1f}% vs. média geral")
c4.metric("Patrimônio mediano", moeda_br(mediana_filtrada), delta=None)

st.divider()

# -----------------------------
# Gráficos
# -----------------------------
tab1, tab2, tab3 = st.tabs(["Cargos", "Partidos", "Tipos de bem"])

with tab1:
    col1, col2 = st.columns([0.55, 0.45])

    por_cargo = (
        dff.groupby("DS_CARGO", as_index=False)
        .agg(
            candidatos=("SQ_CANDIDATO", "count"),
            patrimonio_medio=("patrimonio_total", "mean"),
            patrimonio_mediano=("patrimonio_total", "median"),
            patrimonio_total=("patrimonio_total", "sum"),
        )
        .sort_values("patrimonio_mediano", ascending=False)
    )

    fig1 = px.bar(
        por_cargo.head(10),
        x="patrimonio_mediano",
        y="DS_CARGO",
        orientation="h",
        color="patrimonio_mediano",
        color_continuous_scale="Blues",
        title="Patrimônio mediano por cargo",
        labels={
            "patrimonio_mediano": "Patrimônio mediano (R$)", "DS_CARGO": ""},
    )
    fig1.update_layout(coloraxis_showscale=False)
    fig1.update_yaxes(autorange="reversed")
    col1.plotly_chart(fig1, use_container_width=True)

    ranking = dff.sort_values("patrimonio_total", ascending=False).head(15)
    fig2 = px.bar(
        ranking,
        x="patrimonio_total",
        y="NM_URNA_CANDIDATO",
        color="SG_PARTIDO",
        orientation="h",
        title="Ranking dos candidatos com maior patrimônio",
        labels={
            "patrimonio_total": "Patrimônio total (R$)", "NM_URNA_CANDIDATO": ""},
    )
    fig2.update_yaxes(autorange="reversed")
    col2.plotly_chart(fig2, use_container_width=True)

with tab2:
    col1, col2 = st.columns([0.52, 0.48])

    por_partido = (
        dff.groupby("SG_PARTIDO", as_index=False)
        .agg(
            candidatos=("SQ_CANDIDATO", "count"),
            patrimonio_medio=("patrimonio_total", "mean"),
            patrimonio_mediano=("patrimonio_total", "median"),
            patrimonio_total=("patrimonio_total", "sum"),
        )
        .sort_values("patrimonio_mediano", ascending=False)
    )

    fig3 = px.bar(
        por_partido,
        x="patrimonio_mediano",
        y="SG_PARTIDO",
        orientation="h",
        color="patrimonio_mediano",
        color_continuous_scale="Teal",
        title="Patrimônio mediano por partido",
        labels={
            "patrimonio_mediano": "Patrimônio mediano (R$)", "SG_PARTIDO": ""},
    )
    fig3.update_layout(coloraxis_showscale=False)
    fig3.update_yaxes(autorange="reversed")
    col1.plotly_chart(fig3, use_container_width=True)

    por_genero = (
        dff.groupby("DS_GENERO", as_index=False)
        .agg(patrimonio_mediano=("patrimonio_total", "median"))
        .sort_values("patrimonio_mediano", ascending=False)
    )

    fig4 = px.bar(
        por_genero,
        x="DS_GENERO",
        y="patrimonio_mediano",
        color="DS_GENERO",
        title="Patrimônio mediano por gênero",
        labels={"DS_GENERO": "Gênero",
                "patrimonio_mediano": "Patrimônio mediano (R$)"},
    )
    fig4.update_layout(showlegend=False)
    col2.plotly_chart(fig4, use_container_width=True)

with tab3:
    if bens_raw is None:
        st.info(
            "Arquivo bruto de bens não encontrado. O app segue funcionando com o CSV agregado.")
    else:
        tipo_bem = (
            bens_raw.groupby("DS_TIPO_BEM_CANDIDATO", as_index=False)
            .agg(quantidade=("SQ_CANDIDATO", "count"), valor_total=("VR_BEM_CANDIDATO", "sum"))
            .sort_values("quantidade", ascending=False)
        )

        col1, col2 = st.columns([0.6, 0.4])

        fig5 = px.bar(
            tipo_bem.head(15),
            x="quantidade",
            y="DS_TIPO_BEM_CANDIDATO",
            orientation="h",
            color="quantidade",
            color_continuous_scale="Blues",
            title="Tipos de bem mais frequentes",
            labels={"quantidade": "Quantidade", "DS_TIPO_BEM_CANDIDATO": ""},
        )
        fig5.update_layout(coloraxis_showscale=False)
        fig5.update_yaxes(autorange="reversed")
        col1.plotly_chart(fig5, use_container_width=True)

        top_valor = tipo_bem.head(8).sort_values(
            "valor_total", ascending=False)
        fig6 = px.bar(
            top_valor,
            x="valor_total",
            y="DS_TIPO_BEM_CANDIDATO",
            orientation="h",
            color="valor_total",
            color_continuous_scale="Teal",
            title="Contribuição dos principais tipos ao valor total",
            labels={"valor_total": "Valor total (R$)",
                    "DS_TIPO_BEM_CANDIDATO": ""},
        )
        fig6.update_layout(coloraxis_showscale=False)
        fig6.update_yaxes(autorange="reversed")
        col2.plotly_chart(fig6, use_container_width=True)

st.divider()

# -----------------------------
# Exportação
# -----------------------------
with st.expander("Ver dados filtrados e exportar CSV"):
    st.write(
        f"Registros filtrados: {len(dff)} | "
        f"Candidatos únicos: {cand_filtrado} | "
        f"Sem bens: {qtd_sem_bens}"
    )
    st.dataframe(dff, use_container_width=True, height=420)
    st.download_button(
        label="Baixar recorte filtrado em CSV",
        data=para_download(dff),
        file_name="bens_am_por_candidato_filtrado.csv",
        mime="text/csv",
    )
