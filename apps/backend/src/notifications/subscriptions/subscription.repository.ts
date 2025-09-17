import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from 'src/common/generic.repository';
import { Subscription } from '../schemas/subscription.schema';

@Injectable()
export class SubscriptionRepository extends GenericRepository<Subscription> {
  constructor(
    @InjectModel(Subscription.name)
    subscriptionModel: Model<Subscription>,
  ) {
    super(subscriptionModel, new Logger(SubscriptionRepository.name));
  }
}
