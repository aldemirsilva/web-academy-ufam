# Instruções para rodar o projeto

## Subir todos os serviços

Na raiz do projeto (onde está o `docker-compose.yaml`), execute:

```bash
docker compose up --build -d
```

O flag `--build` reconstrói as imagens antes de subir. O flag `-d` roda em background.

---

## Reconstruir apenas um serviço

```bash
# Apenas o back-end
docker compose up --build -d back

# Apenas o front-end
docker compose up --build -d front
```

---

## Parar os serviços

```bash
docker compose down
```

Para parar e remover também os volumes (apaga os dados do banco):

```bash
docker compose down -v
```

---

## Acessar os serviços

| Serviço      | URL                   |
| ------------ | --------------------- |
| Front-end    | http://localhost:8000 |
| Back-end API | http://localhost:4444 |
| phpMyAdmin   | http://localhost:8080 |

---

## Ver logs

```bash
# Todos os serviços
docker compose logs -f

# Apenas o back-end
docker compose logs -f back

# Apenas o front-end
docker compose logs -f front
```
