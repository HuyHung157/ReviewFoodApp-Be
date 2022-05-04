import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enums/gender.enum';

export class CreateUserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}
