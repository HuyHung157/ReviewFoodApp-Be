import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty()
  foodName: string;

  @ApiProperty({ required: false })
  imgUrl?: string;

  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({ required: false })
  oldPrice: number;

  @ApiProperty({ required: false })
  discount: number;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  isActive: boolean;
}
