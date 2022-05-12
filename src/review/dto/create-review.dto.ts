import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewShopDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  imgUrl: string;

  @ApiProperty()
  isActive: boolean;
}
