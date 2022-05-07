import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostReviewShopDTO } from './dto/post-review-shop.dto';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async postReviewShop(data: PostReviewShopDTO) {
    const {userId, shopId, content} = data;

    const user = await this.reviewRepository.findOne({ userId });
    if(!user) {
      return {
        statusCode: 400,
        message: 'User not found',
      }
    }
    const shop = await this.reviewRepository.findOne({ shopId });
    if(!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      }
    }

    const review = {
      ...data,
      isActive: true,
    }
    await this.reviewRepository.save(review);
    return {
      statusCode: 200,
      message: 'Create Review successfully',
    }
  }

}
