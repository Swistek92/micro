/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PRODUCTS_PACKAGE_NAME } from '@kafa-microservices/proto';
import { join } from 'path';
async function bootstrap() {
  // HTTP
  const app_http = await NestFactory.create(AppModule);
  app_http.setGlobalPrefix('api');
  const port = Number(process.env.PORT ?? 3000);

  // gRPC
  const app_grpc = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: PRODUCTS_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/products.proto'),
      },
    }
  );

  // Kafka
  const app_kafka = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: { brokers: [process.env.KAFKA_BROKER ?? 'kafka:9092'] },
        consumer: { groupId: 'geteway-consumer-group' },
      },
    }
  );

  await Promise.all([
    app_http.listen(port),
    app_grpc.listen(),
    app_kafka.listen(),
  ]);

  Logger.log(`HTTP: http://localhost:${port}/api`);
  Logger.log(`gRPC: 0.0.0.0:50051`);
  Logger.log(`Kafka: ${process.env.KAFKA_BROKER ?? 'kafka:9092'}`);
}
bootstrap();
