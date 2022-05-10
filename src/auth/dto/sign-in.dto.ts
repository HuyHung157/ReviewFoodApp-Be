import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { CommonConstants } from 'src/contants/common.contants';

export class SignInDTO {
  @ApiProperty()
  @Matches(CommonConstants.EMAIL_REGEX)
  username: string;

  @ApiProperty()
  password: string;
}
