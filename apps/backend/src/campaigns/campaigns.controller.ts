import { Body, Controller, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignQueue } from './campaigns.queue';
import { CreateCampaignDto } from './dtos/create-campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly queue: CampaignQueue,
  ) {}

  @Post()
  async startCampaign(@Body() body: CreateCampaignDto) {
    return await this.campaignsService.create(body);
  }
}
