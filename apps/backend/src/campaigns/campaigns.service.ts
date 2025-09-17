import { Injectable } from '@nestjs/common';
import { CampaignRepository } from './campaigns.repository';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { CampaignQueue } from './campaigns.queue';
import { CampaignStatus } from './schemas/campaign.schema';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly campaignsRepo: CampaignRepository,
    private readonly queue: CampaignQueue,
  ) {}
  async create(createData: CreateCampaignDto) {
    const res = await this.campaignsRepo.create(createData);
    this.queue.startCampaign(res);
    return res;
  }

  async increaseDeliveredCount(id: string) {
    const campaign = await this.campaignsRepo.getOneById(id);
    if (!campaign) {
      throw new Error(`Campaign with id: ${id} not found`);
    }
    campaign.delivered += 1;
    if (campaign.delivered >= campaign.amount) {
      campaign.status = CampaignStatus.DELIVERED;
    }
    return await this.campaignsRepo.updateOneById(id, {
      ...campaign,
      delivered: campaign.delivered,
    });
  }
}
