import {
  Body,
  Controller,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Post('/push/subscribe')
  async pushSubscribe(@Body() body: CreateSubscriptionDto) {
    return await this.notificationsService.subscribe(body);
  }
}
