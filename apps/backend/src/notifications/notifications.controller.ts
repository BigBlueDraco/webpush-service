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
  pushSubscribe(@Body() body: CreateSubscriptionDto) {
    this.notificationsService.subscribe(body);
    throw new NotImplementedException();
  }
}
