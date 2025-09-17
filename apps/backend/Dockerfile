# --------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN npm ci

COPY . .

RUN npx turbo run build --filter=backend...

# --------- Production stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копіюємо тільки потрібне
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY apps/backend/package.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
