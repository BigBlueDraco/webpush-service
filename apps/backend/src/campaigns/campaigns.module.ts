import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignQueue } from './campaigns.queue';
import { CampaignProcessor } from './campaigns.processor';
import { CAMPAIGN_QUEUE_NAME } from './constants';
import { BullModule } from '@nestjs/bullmq';
import { CampaignRepository } from './campaigns.repository';
import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: CAMPAIGN_QUEUE_NAME }),
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [CampaignsController],
  providers: [
    CampaignsService,
    CampaignQueue,
    CampaignProcessor,
    CampaignRepository,
  ],
})
export class CampaignsModule {}
