import { Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { userProvider } from 'src/user/user.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  providers: [
    ...userProvider,
    AuthProvider, 
    AuthService,
    UserService,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
