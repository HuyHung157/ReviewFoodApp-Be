import { Inject, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { BookmarkEntity } from './bookmark.entity';
import { CreateBookMarkDTO } from './dto/create-bookmark.dto';
import { UpdateBookMarkDTO } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARK_REPOSITORY')
    private readonly bookmarkRepository: Repository<BookmarkEntity>,
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  async createBookMark(input: CreateBookMarkDTO) {
    const errors = await validate(input);
    if (errors.length > 0) {
      throw new Error(`Validation failed!`);
    }
    const user = await this.userService.getDetailUser(input.userId);
    if (!user) {
      return {
        statusCode: 400,
        message: 'UserId is wrong ',
      };
    }

    const shop = await this.shopService.getDetailShop(input.shopId);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'ShopId is wrong',
      };
    }

    await this.bookmarkRepository.save(input);
    return {
      statusCode: 200,
      message: 'Create Bookmark successfully',
    };
  }

  getBookMarkList() {
    return this.bookmarkRepository.find();
  }

  async getListBookMarkByUserId(userId: string) {
    const user = await this.userService.getDetailUser(userId);
    if (!user) {
      return {
        statusCode: 400,
        message: 'User not found',
      };
    }

    const query = this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .where('bookmark.userId = :userId', { userId: user.id })
      .andWhere('bookmark.isActive = true')
      .orderBy('bookmark.createdAt', 'ASC')
      .leftJoinAndSelect('bookmark.shop', 'shop', 'shop.isActive = true');
    const [items, count] = await query.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }

  async updateBookMarkById(id: string, input: UpdateBookMarkDTO) {
    await this.bookmarkRepository.update(id, input);
    return {
      statusCode: 200,
      message: 'Update Bookmark successfully',
    }
  }

  async removeBookMarkById(id) {
    try {
      await this.bookmarkRepository.update({id}, {isActive: false});
      return {
        statusCode: 200,
        message: 'Remove bookmark successfully',
      };
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
  }
}
