import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  createUser(createUserDTO: CreateUserDTO) {
    return this.userRepository.save(createUserDTO);
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
}