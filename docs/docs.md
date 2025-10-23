npx create-nx-workspace@latest --preset nest --namenestjs-microservices --appName api-gateway
nx g @nx/nest:app apps/products
npx protoc --ts_proto_out=./types/ ./proto/\*.proto --ts_proto_opt=nestJs=true

nx run many -t serve --all
npx nx run-many -t serve --all
nx g @nx/nest:controller apps/products-microservice/app/product

docker stop $(docker ps -q)

docker kill $(docker ps -q)
docker rm -f $(docker ps -aq)
docker compose up --build -d
docker exec -it api-gateway sh

pkill node

npx protoc --ts_proto_out=./types/ ./proto/\*.proto --ts_proto_opt=nestJs=true
