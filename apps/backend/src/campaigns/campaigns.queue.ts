import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { CAMPAIGN_QUEUE_JOB_NAMES, CAMPAIGN_QUEUE_NAME } from './constants';
import { ICampaign } from './schemas/campaign.schema';

@Injectable()
export class CampaignQueue {
  constructor(@InjectQueue(CAMPAIGN_QUEUE_NAME) private readonly mq: Queue) {}

  async finishCampaign(campaign: ICampaign) {
    await this.mq.add(CAMPAIGN_QUEUE_JOB_NAMES.FINISH_CAMPAIGN, campaign, {
      delay: campaign.delay,
      attempts: 3,
      removeOnComplete: true,
    });
  }
  async nextCampaign(campaign: ICampaign) {
    await this.mq.add(CAMPAIGN_QUEUE_JOB_NAMES.NEXT_CAMPAIGN, campaign, {
      delay: campaign.delay,
      attempts: 3,
      removeOnComplete: true,
    });
  }
  async startCampaign(campaign: ICampaign) {
    await this.mq.add(CAMPAIGN_QUEUE_JOB_NAMES.START_CAMPAIGN, campaign, {
      attempts: 3,
      removeOnComplete: true,
    });
  }
}
