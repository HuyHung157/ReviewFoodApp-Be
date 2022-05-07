import { ApiProperty } from '@nestjs/swagger';

export class PostReviewShopDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  imgUrl: string;

  @ApiProperty()
  isActive: boolean;
}
