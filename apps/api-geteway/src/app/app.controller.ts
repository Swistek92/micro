import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { KAFKA_SERVICE, KAFKA_TOPICS } from '@kafa-microservices/proto';
import { ClientKafka } from '@nestjs/microservices';

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
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Post('order')
  createOrder(@Body() order: any) {
    this.kafkaClient.emit(KAFKA_TOPICS.CREATED_ORDER, order);
    return { message: 'have fun guys', order, status: 200 };
  }
}
