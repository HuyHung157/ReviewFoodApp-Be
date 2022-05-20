import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create food in shop' })
  createFood(@Body() createFoodDTO: CreateFoodDTO) {
    return this.foodService.createFood(createFoodDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all list food' })
  @ApiOkResponse({ description: 'Get all list Food' })
  async getFoodList() {
    return await this.foodService.getFoodList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detail food' })
  getDetailFood(@Param('id') id: string) {
    return this.foodService.getDetailFood(id);
  }

  @Get('shop/:shopId')
  @ApiOperation({ summary: 'Get all list food in shop' })
  @ApiOkResponse({ description: 'Get list food in shop' })
  getListFoodByShopId(@Param('shopId') shopId: string) {
    try {
      return this.foodService.getListFoodByShopId(shopId);
    } catch (error) {
      return error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update food by id' })
  updateFoodById(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDTO,
  ) {
    return this.foodService.updateFoodById(id, updateFoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete food by id' })
  removeFoodById(@Param('id') id: string) {
    return this.foodService.removeFoodById(id);
  }
}
