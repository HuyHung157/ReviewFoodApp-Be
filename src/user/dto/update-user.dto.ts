import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class UpdateUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}
