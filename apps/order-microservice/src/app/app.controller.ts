import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_SERVICE, KAFKA_TOPICS } from '@kafa-microservices/proto';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(KAFKA_TOPICS.CREATED_ORDER)
  handlerOrderCreated(@Payload() order: any) {
    console.log('order service revcive order', order);
    // simulate process the order

    this.kafkaClient.emit(KAFKA_TOPICS.PROCESS_PAYMENT, order);
  }
}
