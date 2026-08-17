# boda-web-ruben-judith

Invitación web de la boda de Rubén & Judith — 20 de septiembre de 2026.

- `boda-panel/` — frontend (Vite + React): invitación, `/results` (confirmaciones, con código) y `/eventsfotos` (fotos de invitados).
- `boda-api/` — backend (Express + MySQL): API de confirmaciones y fotos.
- `docker-compose.yml` — despliegue completo (app + MySQL) para Dokploy.

## Desarrollo

```bash
cd boda-api && pnpm install && pnpm dev     # API en :3000 (requiere MySQL)
cd boda-panel && pnpm install && pnpm dev   # web con proxy a la API
```

## Producción (Dokploy)

```bash
cp .env.example .env   # define DB_PASSWORD
docker compose up --build -d
```
