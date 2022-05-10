import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostReviewShopDTO } from './dto/post-review-shop.dto';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  createUser(@Body() postReviewShopDTO: PostReviewShopDTO) {
    return this.reviewService.postReviewShop(postReviewShopDTO);
  }

  @Get(':shopId')
  getListReviewByShopId(@Param('id') id: string) {
    return this.reviewService.getListReviewByShopId(id);
  }
}
