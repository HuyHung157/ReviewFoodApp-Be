import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './review.entity';
import { ReviewProvider } from './review.provider';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), DatabaseModule],
  controllers: [ReviewController],
  providers: [...ReviewProvider, ReviewService]
})
export class ReviewModule {}
