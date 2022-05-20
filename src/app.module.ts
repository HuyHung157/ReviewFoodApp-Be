import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { WinstonModule } from './common/modules/winston/winston.module';

@Module({
  imports: [
    WinstonModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    ShopModule,
    ReviewModule,
    FoodModule,
    BookmarkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
