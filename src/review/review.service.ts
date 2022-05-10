import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { PostReviewShopDTO } from './dto/post-review-shop.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly userService: UserService,
    private readonly shopService: ShopService,
  ) {}

  async postReviewShop(data: PostReviewShopDTO) {
    const { userId, shopId, content } = data;

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
    await this.reviewRepository.save(review);
    return {
      statusCode: 200,
      message: 'Create Review successfully',
    };
  }

  async getListReviewByShopId(id) {
    const shop = await this.shopService.getDetailShop(id);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    const queryCategoryHome = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.shopId = :shopId', { shopId: shop.id })
      .andWhere('review.isActive = true')
      .orderBy('review.createdAt', 'ASC')
      .leftJoinAndSelect('review.user', 'user', 'user.isActive = true');

    const [items, count] = await queryCategoryHome.getManyAndCount();
    return {
      totalItems: count,
      items,
    };
  }
}
