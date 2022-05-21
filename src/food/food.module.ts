import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodProvider } from './food.provider';
import { FoodController } from './food.controller';
import { FoodEntity } from './food.entity';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity]), ShopModule, UserModule, DatabaseModule],
  controllers: [FoodController],
  providers: [...FoodProvider, FoodService],
})
export class FoodModule {}
