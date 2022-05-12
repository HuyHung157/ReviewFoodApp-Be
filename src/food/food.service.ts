import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { Repository } from 'typeorm';
import { CreateFoodDTO } from './dto/create-food.dto';
import { UpdateFoodDTO } from './dto/update-food.dto';
import { FoodEntity } from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @Inject('FOOD_REPOSITORY')
    private readonly foodRepository: Repository<FoodEntity>,
    private readonly shopService: ShopService,
  ) {}

  async createFood(res: CreateFoodDTO) {
    const shop = await this.shopService.getDetailShop(res.shopId);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    await this.foodRepository.save(res);
    return {
      statusCode: 200,
      message: 'Create Food successfully',
    };
  }

  getFoodList() {
    return this.foodRepository.find({});
  }

  getDetailFood(id: string) {
    return this.foodRepository.findOne(id);
  }

  async getListFoodByShopId(shopId: string) {
    const shop = await this.shopService.getDetailShop(shopId);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    return this.foodRepository.find({ shopId });
  }

  updateFoodById(id: string, updateFoodDto: UpdateFoodDTO) {
    return this.foodRepository.update(id, updateFoodDto);
  }

  removeFoodById(id: string) {
    try {
      return this.foodRepository.delete(id);
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
  }
}
