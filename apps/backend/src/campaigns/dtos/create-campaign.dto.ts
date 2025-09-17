import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive } from 'class-validator';
import { CampaignStatus, ICampaign } from '../schemas/campaign.schema';

export class CreateCampaignDto
  implements Omit<ICampaign, 'delivered' | 'status'>
{
  @ApiProperty({
    description: 'Delay between posts in the campaign, in milliseconds',
    example: 5000,
  })
  @IsInt({ message: 'Delay must be an integer' })
  @IsPositive({ message: 'Delay must be positive' })
  delay: number;

  @ApiProperty({
    description: 'Number of items/messages to send in the campaign',
    example: 100,
  })
  @IsInt({ message: 'Amount must be an integer' })
  @IsPositive({ message: 'Amount must be positive' })
  amount: number;
}
