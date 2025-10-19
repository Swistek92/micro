import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_PACKAGE_NAME } from '@kafa-microservices/proto';
import { join } from 'path';
import { AddController } from './add/add.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/products.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController, AddController, ProductController],
  providers: [AppService],
})
export class AppModule {}
