import { Injectable, Logger } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions/subscriptions.servicer';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    private readonly subscriptionService: SubscriptionsService,
    private readonly config: ConfigService,
  ) {
    webpush.setVapidDetails(
      config.get<string>('VAPID_SUBJECT'),
      config.get<string>('VAPID_PUBLIC_KEY'),
      config.get<string>('VAPID_PRIVATE_KEY'),
    );
  }

  subscribe(data: CreateSubscriptionDto) {
    this.subscriptionService.create(data);
  }
  async batchSendPush<T>(payload: T) {
    const subs = await this.subscriptionService.findAll();
    if (Array.isArray(subs)) {
      await Promise.allSettled(
        subs.map((elem) => {
          this.sendPush(elem, payload);
        }),
      );
    }
  }
  async sendPush(sub: any, payload: any) {
    try {
      await webpush.sendNotification(sub, JSON.stringify(payload));
    } catch (err) {
      this.logger.warn(`Failed push to ${sub.endpoint}: ${err.message}`);
      const status = err.statusCode;
      if (status === 410 || status === 404) {
        this.subscriptionService.update(sub._id, { active: false });
      }
    }
  }
}
