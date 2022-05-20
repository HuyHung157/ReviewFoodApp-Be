import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { userProvider } from './user.provider';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DatabaseModule, MailModule],
  controllers: [UserController],
  providers: [...userProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
