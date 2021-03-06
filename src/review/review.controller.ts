import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReviewShopDTO } from './dto/create-review.dto';
import { UpdateReviewShopDTO } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create review shop' })
  createUser(@Body() postReviewShopDTO: CreateReviewShopDTO) {
    return this.reviewService.postReviewShop(postReviewShopDTO);
  }

  @Get(':shopId')
  @ApiOperation({ summary: 'Get review detail by shopId' })
  getListReviewByShopId(@Param('shopId') id: string) {
    return this.reviewService.getListReviewByShopId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update review' })
  updateFoodById(
    @Param('id') id: string,
    @Body() updateReviewShopDto: UpdateReviewShopDTO,
  ) {
    return this.reviewService.updateReviewShopById(id, updateReviewShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete review' })
  removeFoodById(@Param('id') id: string) {
    return this.reviewService.removeReviewById(id);
  }
}
