import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { ShopProvider } from './shop.provider';
import { ShopEntity } from './shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ShopOwnerEntity } from './shop-owner.entity';
import { UserModule } from 'src/user/user.module';
import { ShopOwnerService } from './shop-owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity, ShopOwnerEntity]), DatabaseModule, UserModule],
  controllers: [ShopController],
  providers: [...ShopProvider, ShopService, ShopOwnerService],
  exports: [ShopService, ShopOwnerService],
})
export class ShopModule {}
