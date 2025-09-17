import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ISubscription {
  endpoint: string;
  keys: any;
  active: boolean;
}

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ required: true, unique: true })
  endpoint: string;

  @Prop({ type: Object, required: true })
  keys: any;

  @Prop({ default: true })
  active: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
