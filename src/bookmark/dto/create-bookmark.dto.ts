import { ApiProperty } from '@nestjs/swagger';

export class CreateBookMarkDTO {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  shopId: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  content?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  isActive: boolean;
}
