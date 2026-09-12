# Trabalho Final — Deploy de um Microsserviço de Classificação

**Disciplina:** Aprendizagem de Máquina para Web Developers
**Formato de entrega:** repositório (pasta compactada `.zip` ou link de repositório Git)
**Correção:** automatizada — sua API é executada e testada.

---

## Contexto

Você vai empacotar um modelo de análise de sentimento em um microsserviço REST, do jeito
que um time de produção faria. O modelo classifica avaliações de produtos em **positivo** ou
**negativo**. O dataset é o mesmo da aula: **B2W-Reviews01** (avaliações reais de e-commerce
em português).

Diferente de um exercício de notebook, aqui o que importa é o **artefato que roda**: um
serviço que sobe, carrega o modelo e responde a requisições HTTP seguindo um contrato exato.

---

## Dataset (fixo para todos)

**B2W-Reviews01**, amostra de 10 mil linhas, baixável direto por URL (sem login):

```
https://raw.githubusercontent.com/alan-barzilay/NLPortugues/master/Semana%2003/data/b2w-10k.csv
```

Colunas que você vai usar: `review_text` (o texto) e `overall_rating` (nota de 1 a 5).

**Definição do alvo (obrigatória, para todos igual):**
- notas **4 e 5** → `1` (positivo)
- notas **1 e 2** → `0` (negativo)
- nota **3** → **descartada**

---

## O que entregar

Um repositório com **exatamente** esta estrutura e estes nomes de arquivo:

```
entrega/
├── train.py                 # treina o pipeline e gera models/pipeline.joblib
├── app/
│   ├── __init__.py
│   └── main.py              # a API FastAPI
├── models/
│   └── pipeline.joblib      # o pipeline treinado e serializado (COMMITADO)
├── requirements.txt
├── Dockerfile
└── README.md               # seu nome + 2-3 linhas sobre suas escolhas
```

> Os nomes e caminhos acima são **obrigatórios**. O corretor procura esses arquivos nesses
> lugares. Estrutura diferente = testes falham.

> **Inclua o `models/pipeline.joblib` na entrega** (não só o `train.py`). A API precisa
> conseguir subir mesmo que o corretor não rode o treino.

---

## Contrato da API (é isto que será testado)

Sua aplicação FastAPI (`app/main.py`) deve expor:

### `GET /health`
Resposta `200`:
```json
{"status": "ok"}
```

### `POST /predict`
Entrada:
```json
{"text": "o produto chegou rápido e funciona muito bem"}
```
Resposta `200`:
```json
{"label": "positivo", "confidence": 0.97}
```
- `label`: a string `"positivo"` ou `"negativo"`.
- `confidence`: número **entre 0.0 e 1.0** (a probabilidade da classe prevista).

### `POST /predict` com corpo inválido
Uma requisição sem o campo `text` (ex.: `{}`) deve retornar **`422`**.
> Se você usar um modelo Pydantic para a entrada, isso acontece **automaticamente** — não
> precisa tratar na mão.

---

## Requisitos técnicos

1. **Serialize o pipeline inteiro.** Um único `Pipeline` do scikit-learn contendo o
   vetorizador **e** o classificador. O `pipeline.joblib` tem que aceitar **texto cru** e
   devolver a previsão. (Salvar só o classificador **reprova** este item.)
2. **Carregue o modelo uma vez, na inicialização** — use `lifespan` (não `@app.on_event`,
   que está deprecado). Não carregue o `.joblib` a cada requisição.
3. **`requirements.txt`** deve listar no mínimo: `fastapi`, `scikit-learn`, `joblib`
   (e o que mais você usar).
4. **`Dockerfile`** que faça o build da imagem da API.

---

## Avaliação (100 pontos, automatizada)

| Critério | O que é verificado | Pontos |
|---|---|---|
| **Estrutura** | Todos os arquivos obrigatórios nos caminhos corretos | 10 |
| **Modelo carrega e prediz** | `pipeline.joblib` carrega e prevê a partir de **texto cru** | 15 |
| **`/health`** | Retorna `200` com `{"status":"ok"}` | 10 |
| **Contrato do `/predict`** | `200` com `{label, confidence}`, `confidence` ∈ [0,1] | 25 |
| **Semântica do `/predict`** | Classifica corretamente casos óbvios (+ e −) | 15 |
| **Validação `422`** | Corpo inválido retorna `422` | 15 |
| **`requirements.txt`** | Lista as dependências essenciais | 10 |

**Peso maior no contrato do `/predict`:** é o coração de um microsserviço. Uma API que sobe
e responde no formato certo vale mais que qualquer outra parte isolada. Leia o contrato com
atenção — a maior fonte de perda de pontos é devolver o JSON num formato ligeiramente
diferente (ex.: `sentiment` em vez de `label`, ou `confidence` como string).

**Dica de ouro:** antes de entregar, teste sua própria API com o `TestClient`, como fizemos
na Parte 5 da aula. Se aqueles quatro testes passam, você já garantiu a maior parte da nota.

---

## Entrega

Compacte a pasta `entrega/` em um `.zip` (ou envie o link do repositório Git) até a data
combinada. Confira, antes de enviar, que o `models/pipeline.joblib` está incluído.
