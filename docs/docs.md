npx create-nx-workspace@latest --preset nest --namenestjs-microservices --appName api-geteway
nx g @nx/nest:app apps/products
npx protoc --ts_proto_out=./types/ ./proto/\*.proto --ts_proto_opt=nestJs=true

nx run many -t serve --all
npx nx run-many -t serve --all
