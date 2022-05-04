import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDTO {
  @ApiProperty()
  shopName: string;

  @ApiProperty()
  logoUrl: string;

  @ApiProperty()
  bannerUrl: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isDelivery: boolean;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}
