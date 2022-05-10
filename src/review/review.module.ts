import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './review.entity';
import { ReviewProvider } from './review.provider';
import { ReviewService } from './review.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    DatabaseModule,
    UserModule,
    ShopModule,
  ],
  controllers: [ReviewController],
  providers: [...ReviewProvider, ReviewService],
})
export class ReviewModule {}
