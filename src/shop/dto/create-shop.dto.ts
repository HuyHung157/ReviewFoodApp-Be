import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  shopName: string;

  @ApiProperty({ required: false })
  logoUrl?: string;

  @ApiProperty({ required: false })
  bannerUrl?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isDelivery: boolean;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  isActive: boolean;
}
