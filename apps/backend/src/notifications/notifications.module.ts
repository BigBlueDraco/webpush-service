import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Subscription,
  SubscriptionSchema,
} from './schemas/subscription.schema';
import { SubscriptionRepository } from './subscriptions/subscription.repository';
import { SubscriptionsService } from './subscriptions/subscriptions.servicer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    SubscriptionRepository,
    SubscriptionsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
