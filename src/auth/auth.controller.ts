import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/signUp')
  @ApiOperation({ summary: 'Signup for user' })
  signUp(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO, false);
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Signin for user' })
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }
}
