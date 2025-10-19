<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

# Services — Monorepo

Microservices project using **Nx**, **Kafka**, and **gRPC**, managed via **Docker Compose**.

## Services

- **Zookeeper** – `2181`
- **Kafka** – `9092`
- **API Gateway** – `3000`
- **Payment** – `3001`
- **Products** – `3002`

## Run

```bash
docker compose build
docker compose up
docker compose up --build -d
```

## Structure

```
apps/ – microservices
proto/ – .proto files
grpc-types/ – generated types
```

## Communication

- **gRPC** – synchronous calls
- **Kafka** – event-based messaging

## Stop

```bash
docker compose down
```
