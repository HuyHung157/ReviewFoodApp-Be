import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signIn(account: SignInDTO) {
    const { username, password } = account;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      return {
        statusCode: 400,
        message: 'Username not exist',
      };
    }
    const isValid = await this.comparePassword(password, user.password);
    if (!isValid) {
      return {
        statusCode: 400,
        message: 'Password is not correct',
      };
    }
    return {
      statusCode: 200,
      message: 'Sign in successfully',
      data: user,
    };
  }

  comparePassword(passwordInput: string, passwordHash: string): boolean {
    return bcrypt.compare(passwordInput, passwordHash);
  }
}
