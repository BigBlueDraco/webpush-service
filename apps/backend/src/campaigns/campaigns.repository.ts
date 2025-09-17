import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from 'src/common/generic.repository';
import { Campaign } from './schemas/campaign.schema';

@Injectable()
export class CampaignRepository extends GenericRepository<Campaign> {
  constructor(
    @InjectModel(Campaign.name)
    subscriptionModel: Model<Campaign>,
  ) {
    super(subscriptionModel, new Logger(CampaignRepository.name));
  }
}
