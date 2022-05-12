import { ApiTags } from '@nestjs/swagger';
import { FoodService } from './food.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateFoodDTO } from './dto/create-food.dto';
import { UpdateFoodDTO } from './dto/update-food.dto';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post()
  createFood(@Body() createFoodDTO: CreateFoodDTO) {
    return this.foodService.createFood(createFoodDTO);
  }

  @Get()
  @ApiOkResponse({ description: 'Get all list Food' })
  async getFoodList() {
    return await this.foodService.getFoodList();
  }

  @Get(':id')
  getDetailFood(@Param('id') id: string) {
    return this.foodService.getDetailFood(id);
  }

  @Get('shop/:shopId')
  @ApiOkResponse({ description: 'Get list food in shop' })
  getListFoodByShopId(@Param('shopId') shopId: string) {
    try {
      return this.foodService.getListFoodByShopId(shopId);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  updateFoodById(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDTO,
  ) {
    return this.foodService.updateFoodById(id, updateFoodDto);
  }

  @Delete(':id')
  removeFoodById(@Param('id') id: string) {
    return this.foodService.removeFoodById(id);
  }
}
