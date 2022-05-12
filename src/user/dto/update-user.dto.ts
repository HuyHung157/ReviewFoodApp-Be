import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty({ required: false })
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  isActive: boolean;
}
