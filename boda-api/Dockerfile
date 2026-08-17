# syntax=docker/dockerfile:1
# El contexto de build es la raíz del repo, ver docker-compose.yml.

# ---- Etapa 1: compilar el frontend (boda-panel, Vite + React) ----
FROM node:22-alpine AS frontend
WORKDIR /build
RUN corepack enable
COPY boda-panel/package.json boda-panel/pnpm-lock.yaml boda-panel/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY boda-panel/ ./
RUN pnpm build

# ---- Etapa 2: backend + frontend ya compilado en public/ ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY boda-api/package.json boda-api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY boda-api/server.js ./
COPY --from=frontend /build/dist ./public
EXPOSE 3000
CMD ["node", "server.js"]
