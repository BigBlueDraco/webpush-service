import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { Subscription } from '../schemas/subscription.schema';
import { CreateSubscriptionDto } from '../dtos/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async create(sub: CreateSubscriptionDto): Promise<Subscription> {
    const exSub = await this.subscriptionRepository.getOneWhere({
      endpoint: sub.endpoint,
    });

    if (exSub) {
      return exSub;
    }
    return this.subscriptionRepository.create(sub);
  }

  async findAll(): Promise<Subscription[] | unknown> {
    return this.subscriptionRepository.getAll();
  }

  async findById(id: string): Promise<Subscription | unknown> {
    return this.subscriptionRepository.getOneById(id);
  }

  async update(
    id: string,
    update: Partial<Subscription>,
  ): Promise<Subscription> {
    return this.subscriptionRepository.updateOneById(id, update);
  }

  async delete(id: string): Promise<boolean> {
    return this.subscriptionRepository.removeOneById(id);
  }
}
