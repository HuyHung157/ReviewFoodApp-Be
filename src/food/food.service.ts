import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
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
    private readonly userService: UserService,
  ) {}

  async createFood(input: CreateFoodDTO) {
    const isShopOwner = await this.shopService.isOwnerShop(input.userId, input.shopId);
    if(!isShopOwner){
      return {
        statusCode: 400,
        message: 'You do not have permission to create food',
      };
    }
    delete input.userId;

    const shop = await this.shopService.getDetailShop(input.shopId);
    if (!shop) {
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }

    await this.foodRepository.save(input);
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

  async updateFoodById(id: string, input: UpdateFoodDTO) {
    const food = await this.foodRepository.findOne(id);
    if(!food){
      return{
        statusCode: 400,
        message: 'Food not found',
      }
    }
    const isShopOwner = await this.userService.isShopOwnerRole(input.userId);
    if(!isShopOwner){
      return {
        statusCode: 400,
        message: 'You do not have permission to update this food',
      };
    }
    delete input.userId;
    await this.foodRepository.update(id, input);

    return {
      statusCode: 200,
      message: 'Update Food successfully',
    }
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
