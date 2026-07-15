# ---- Build stage: install deps and bundle with webpack via Bun ----
FROM oven/bun:1-alpine AS build

WORKDIR /app

# Dependency layer first for maximum layer-cache reuse
COPY package.json package-lock.json ./
RUN bun install

# Build config and sources
COPY tsconfig.json webpack.prod.js ./
COPY src ./src

RUN bun run build

# ---- Runtime stage: static files served by unprivileged Nginx ----
FROM nginxinc/nginx-unprivileged:alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html favicon.ico /usr/share/nginx/html/
COPY resources /usr/share/nginx/html/resources
COPY --from=build /app/dist /usr/share/nginx/html/dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
