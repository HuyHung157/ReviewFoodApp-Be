import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const errors = await validate(createUserDTO);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }

    const { username, password } = createUserDTO;
    const isUserExisted = await this.findUserByUsername(username);
    if (isUserExisted) {
      return {
        statusCode: 400,
        message: 'Username already exist',
      };
    }

    const hashedPassword = await this.hashPassword(password);
    const user = {
      ...createUserDTO,
      password: hashedPassword,
    };
    await this.userRepository.save(user);
    return {
      statusCode: 200,
      message: 'Create User successfully',
    };
  }

  getUserList() {
    return this.userRepository.find({});
  }

  getDetailUser(id: string) {
    return this.userRepository.findOne(id);
  }

  updateUserById(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  removeUserById(id: string) {
    return this.userRepository.delete(id);
  }

  async hashPassword(passwordInput: string): Promise<string> {
    const password = await bcrypt.hash(passwordInput, 10);
    return password;
  }

  async comparePassword(
    passwordInput: string,
    passwordHash: string,
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(passwordInput, passwordHash);
    return isValid;
  }

  async findUserByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ username });
    return user;
  }
}
