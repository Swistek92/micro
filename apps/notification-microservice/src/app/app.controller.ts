import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_SERVICE, KAFKA_TOPICS } from '@kafa-microservices/proto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(KAFKA_TOPICS.CREATED_ORDER)
  sendOrderCreatedNotification(@Payload() data: any) {
    console.log('send notification that order is created', data);
  }

  @MessagePattern(KAFKA_TOPICS.PAYMENT_SUCESS)
  sendPaymentSucessNotification(@Payload() data: any) {
    console.log('send notification that payment is sucess', data);
  }
}
