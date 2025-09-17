import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString, IsUrl } from 'class-validator';
import { ISubscription } from '../schemas/subscription.schema';

export class CreateSubscriptionDto implements ISubscription {
  @ApiProperty({
    description: 'Push notification endpoint provided by the browser',
    example: 'https://fcm.googleapis.com/fcm/send/e9jJ5n2...',
  })
  @IsString()
  @IsUrl()
  endpoint: string;

  @ApiProperty({
    description: 'Encryption keys for push subscription',
    example: {
      p256dh: 'BOD7hU9j5Xz1KoPnMxYQ0hjHZ4hTQIlZ9...',
      auth: 'X2iUgxzzJ9A...',
    },
  })
  @IsObject()
  keys: {
    p256dh: string;
    auth: string;
  };

  @ApiProperty({
    description: 'Whether subscription is currently active',
    example: true,
    default: true,
  })
  @IsBoolean()
  active: boolean;
}
