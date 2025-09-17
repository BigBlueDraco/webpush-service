import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions/subscriptions.servicer';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import * as webpush from 'web-push';
@Injectable()
export class NotificationsService {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

  subscribe(data: CreateSubscriptionDto) {
    this.subscriptionService.create(data);
  }
  async sendPush(sub: unknown, payload: any) {
    await webpush.sendNotification(sub, JSON.stringify(payload));
  }
}
