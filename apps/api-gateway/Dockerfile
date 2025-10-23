# --- build ---
FROM node:22-alpine AS builder
WORKDIR /workspace

# szybki cache: najpierw pliki konfigów i package*
COPY package*.json nx.json tsconfig.base.json ./

# skopiuj resztę kodu
COPY apps ./apps
COPY proto ./proto        
COPY types ./types

# instalacja i build
RUN npm install --no-audit --no-fund
RUN npx nx build api-gateway --configuration=production

# --- runtime ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# kopiujemy node_modules z buildera
COPY --from=builder /workspace/node_modules ./node_modules

# kopiujemy zbudowany kod aplikacji
COPY --from=builder /workspace/dist/apps/api-gateway ./dist

COPY --from=builder /workspace/proto ./proto
COPY --from=builder /workspace/types ./proto

EXPOSE 3000
CMD ["node", "dist/main.js"]
