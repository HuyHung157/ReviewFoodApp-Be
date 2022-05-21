import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import { UpdateUserDTO } from './dto/update-user.dto';
import { MailData } from 'src/mail/interfaces/mail-data.interface';
import { MailTemplateService } from 'src/mail/services/mail-template.service';
import { MailService } from 'src/mail/services/mail.service';
import moment from 'moment-timezone';
import { Role } from './enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly mailTemplateService: MailTemplateService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO, isShopOwner: boolean) {
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
    const userData = {
      ...createUserDTO,
      role: isShopOwner ? Role.SHOP_OWNER : Role.USER,
      password: hashedPassword,
    };

    const user = await this.userRepository.save(userData);

    if (user) {
      this.sendSignUpEmail(user, 'en');
    }

    return {
      statusCode: 200,
      message: 'Create User successfully',
    };
  }

  getUserList() {
    return this.userRepository.find({});
  }

  async getAllShopOwner() {
    const query = this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: Role.SHOP_OWNER })
      .andWhere('user.isActive = :isActive', { isActive: true });

    const [items, totalItems] = await query.getManyAndCount();
    return { items, totalItems };
  }

  getDetailUser(id: string) {
    return this.userRepository.findOne({ id, isActive: true });
  }

  updateUserById(id: string, updateUserDto: UpdateUserDTO) {
    return this.userRepository.update(id, updateUserDto);
  }

  async removeUserById(id: string) {
    try {
      await this.userRepository.update(id, { isActive: false });
      return {
        statusCode: 200,
        message: 'Remove user successfully',
      };
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
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
    const user = await this.userRepository.findOne({
      username,
      isActive: true,
    });
    return user;
  }

  private async sendSignUpEmail(user: UserEntity, language: string) {
    const templateName = 'sign-up';
    const currentYear = moment().year();
    const templateData = {
      firstName: user.firstName,
      currentYear,
    };
    const template = await this.mailTemplateService.fetchTemplate(
      templateName,
      templateData,
      language,
    );
    const data: MailData = {
      ...template,
      to: user.username,
    };
    await this.mailService.sendMail(data);
  }

  public async isShopOwnerRole(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      id: userId,
      isActive: true,
    });
    if (user && user.role === Role.SHOP_OWNER) {
      return true;
    }
    return false;
  }
}
