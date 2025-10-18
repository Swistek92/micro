FROM node:22-alpine AS builder
WORKDIR /workspace
COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps
COPY proto ./proto
COPY grpc-types ./grpc-types
# COPY libs ./libs
RUN npm install --no-audit --no-fund
RUN npx nx build products-microservice --configuration=production

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/dist/apps/products-microservice ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
