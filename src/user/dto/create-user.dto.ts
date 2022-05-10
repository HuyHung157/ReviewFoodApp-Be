import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';
import { CommonConstants } from 'src/contants/common.contants';
import { Gender } from '../enums/gender.enum';

export class CreateUserDTO {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  @Matches(CommonConstants.EMAIL_REGEX)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;
}
