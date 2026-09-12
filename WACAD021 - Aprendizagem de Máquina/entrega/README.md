# Atividade de Deploy

Atividade de deploy da disciplina de Aprendizagem de Máquina.

## Aluno: Aldemir Rodrigues da Silva

## Escolhas

A versão do `Python` utilizada foi a `3.12.14`.

As versões do `requirements.txt` foram fixadas conforme a seguir para manter as versões usadas no treinamento do modelo:

```text
fastapi==0.141.1
uvicorn[standard]==0.52.4
scikit-learn==1.9.0
joblib==1.6.0
pandas==3.0.5
requests==2.34.2
```

O código de `train.py` foi modificado conforme solicitado para utilizar o `lifespan` em vez de `@app.on_event`.

## Estrutura do Repositório

Foi utilizada a estrutura abaixo, conforme requerido na atividade.

```shell
entrega/
├── app
│   ├── __init__.py
│   └── main.py
├── Dockerfile
├── models
│   └── pipeline.joblib
├── README.md
├── requirements.txt
└── train.py
```
