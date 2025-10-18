# --- build ---
FROM node:22-alpine AS builder
WORKDIR /workspace
# szybki cache: najpierw pliki konfigów i package*
COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps
COPY proto ./proto
RUN npm install --no-audit --no-fund
RUN npx nx build api-geteway --configuration=production

# --- runtime ---
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/dist/apps/api-geteway ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
