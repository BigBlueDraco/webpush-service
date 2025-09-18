import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { CAMPAIGN_QUEUE_JOB_NAMES, CAMPAIGN_QUEUE_NAME } from './constants';
import { CampaignQueue } from './campaigns.queue';
import { CampaignsService } from './campaigns.service';
import { CampaignStatus } from './schemas/campaign.schema';
import { NotificationsService } from 'src/notifications/notifications.service';

interface ICampaignProcessor {
  processStartCampaign(job: Job);
  processNextCampaign(job: Job);
  processFinishCampaign(job: Job);
  processDefault(job: Job);
}

const JOB_NAME_TO_METHOD: Record<
  CAMPAIGN_QUEUE_JOB_NAMES,
  keyof ICampaignProcessor
> = {
  [CAMPAIGN_QUEUE_JOB_NAMES.START_CAMPAIGN]: 'processStartCampaign',
  [CAMPAIGN_QUEUE_JOB_NAMES.NEXT_CAMPAIGN]: 'processNextCampaign',
  [CAMPAIGN_QUEUE_JOB_NAMES.FINISH_CAMPAIGN]: 'processFinishCampaign',
};

@Processor(CAMPAIGN_QUEUE_NAME, { concurrency: 5 })
export class CampaignProcessor
  extends WorkerHost
  implements ICampaignProcessor
{
  private readonly logger = new Logger(CampaignProcessor.name);
  constructor(
    private readonly queue: CampaignQueue,
    private readonly service: CampaignsService,
    private readonly notificationsService: NotificationsService,
  ) {
    super();
  }
  async process(job: Job) {
    this.logger.log(`Start handling job: ${job.name}`);
    const methodName = JOB_NAME_TO_METHOD[job.name as CAMPAIGN_QUEUE_JOB_NAMES];

    if (methodName && typeof (this as any)[methodName] === 'function') {
      return (this as any)[methodName](job);
    }

    this.processDefault(job);
  }

  async processStartCampaign(job: Job) {
    try {
      const updateData = this.service.increaseDeliveredCount(job.data._id);
      this.notificationsService.batchSendPush(job.data);
      this.queue.nextCampaign(await updateData);

      this.logger.log(`➡️ Start campaign: ${JSON.stringify(job.data)}`);
    } catch (err) {
      this.logger.error(
        `➡️ Start campaign: ${JSON.stringify(job.data)} error: ${err}`,
      );
      this.queue.finishCampaign(job.data);
    }
  }

  async processNextCampaign(job: Job) {
    try {
      const updateData = await this.service.increaseDeliveredCount(
        job.data._id,
      );
      this.notificationsService.batchSendPush(job.data);
      if (updateData.status === CampaignStatus.DELIVERED) {
        this.queue.finishCampaign(job.data);
        return;
      }
      this.queue.nextCampaign(await updateData);
      this.logger.log(`➡️ Next campaign: ${JSON.stringify(job.data)}`);
    } catch (err) {
      this.logger.error(
        `➡️ Next campaign: ${JSON.stringify(job.data)}; error: ${err}`,
      );
      this.queue.finishCampaign(job.data);
    }
  }

  async processFinishCampaign(job: Job) {
    this.logger.log(`➡️ Finish campaign: ${JSON.stringify(job.data)}`);
    this.logger.debug('All message delivered');
  }

  processDefault(job: Job) {
    this.logger.warn(`⚠️ No handler for job: ${job.name}`);
  }
}
