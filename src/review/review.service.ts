import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateReviewShopDTO } from './dto/create-review.dto';
import { UpdateReviewShopDTO } from './dto/update-review.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  async postReviewShop(data: CreateReviewShopDTO) {
    const { userId, shopId } = data;

    const user = await this.userService.getDetailUser(userId);
    if (!user) {
      return {
        statusCode: 400,
        message: 'User not found',
      };
    }
    const shop = await this.shopService.getDetailShop(shopId);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    const review = {
      ...data,
      isActive: true,
    };
    try {
      await this.reviewRepository.save(review);
      return {
        statusCode: 200,
        message: 'Create Review successfully',
      };
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
  }

  async getListReviewByShopId(id) {
    const shop = await this.shopService.getDetailShop(id);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    const query = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.shopId = :shopId', { shopId: shop.id })
      .andWhere('review.isActive = true')
      .orderBy('review.createdAt', 'ASC')
      .leftJoinAndSelect('review.user', 'user', 'user.isActive = true');

    const [items, count] = await query.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }

  updateReviewShopById(id: string, updateReviewShopDto: UpdateReviewShopDTO) {
    return this.reviewRepository.update(id, updateReviewShopDto);
  }

  async removeReviewById(id: string) {
    try {
      await this.reviewRepository.update({ id }, { isActive: false });
      return {
        statusCode: 200,
        message: 'Remove review successfully',
      };
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
  }
}
