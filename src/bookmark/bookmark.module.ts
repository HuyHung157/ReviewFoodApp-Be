import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ShopModule } from 'src/shop/shop.module';
import { UserModule } from 'src/user/user.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkEntity } from './bookmark.entity';
import { BookmarkProvider } from './bookmark.provider';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookmarkEntity]),
    DatabaseModule,
    UserModule,
    ShopModule,
  ],
  controllers: [BookmarkController],
  providers: [...BookmarkProvider, BookmarkService],
})
export class BookmarkModule {}
