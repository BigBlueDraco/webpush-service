import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ICampaign {
  delay: number;
  amount: number;
  delivered: number;
  status: CampaignStatus;
}
export type CampaignDocument = Campaign & Document;
export enum CampaignStatus {
  'DELIVERED' = 'DELIVERED',
  'IN_PROGRESS' = 'IN_PROGRESS',
}
@Schema({ timestamps: true })
export class Campaign extends Document implements ICampaign {
  @Prop({ default: 5000 })
  delay: number;
  @Prop({ default: 1 })
  amount: number;
  @Prop({ default: 0 })
  delivered: number;
  @Prop({
    enum: CampaignStatus,
    type: String,
    default: CampaignStatus.IN_PROGRESS,
  })
  status: CampaignStatus;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
