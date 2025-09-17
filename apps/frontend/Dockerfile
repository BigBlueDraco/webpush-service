# --------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN npm ci
COPY . .
RUN npx turbo run build --filter=frontend...

# --------- Production stage ----------
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Видаляємо дефолтну конфігурацію nginx
RUN rm -rf ./*

# Копіюємо зібраний фронтенд
COPY --from=builder /app/apps/frontend/dist ./

# Кастомний nginx.conf (опціонально)
# COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
