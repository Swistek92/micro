import { Controller, Get } from '@nestjs/common';

@Controller('add')
export class AddController {
  @Get()
  get(): { message: string } {
    return { message: 'Hello from add controller' };
  }
}
