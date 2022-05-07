import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodProvider } from './food.provider';
import { FoodController } from './food.controller';
import { FoodEntity } from './food.entity';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity]), DatabaseModule],
  controllers: [FoodController],
  providers: [...FoodProvider, FoodService],
})
export class FoodModule {}