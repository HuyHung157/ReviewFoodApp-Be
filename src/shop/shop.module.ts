import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopProvider } from './shop.provider';
import { ShopEntity } from './shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity]), DatabaseModule],
  controllers: [ShopController],
  providers: [...ShopProvider, ShopService],
  exports: [ShopService],
})
export class ShopModule {}
