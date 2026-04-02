FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.29-alpine

ARG GIT_SHA=unknown

USER root
RUN sed -i '/}/i\    text/markdown md;' /etc/nginx/mime.types
USER 101
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER root
RUN sed -i "s/__GIT_SHA__/${GIT_SHA}/g" /etc/nginx/conf.d/default.conf
USER 101
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
