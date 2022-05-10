import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateShopDTO } from './dto/create-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopService } from './shop.service';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post()
  createShop(@Body() createShopDTO: CreateShopDTO) {
    return this.shopService.createShop(createShopDTO);
  }

  @Get()
  @ApiOkResponse({ description: 'List all shops' })
  async getShopList() {
    return await this.shopService.getShopList();
  }

  @Get(':id')
  getDetailShop(@Param('id') id: string) {
    return this.shopService.getDetailShop(id);
  }

  @Get('/name=:shopName')
  findShopByShopName(@Param('shopName') shopName: string) {
    return this.shopService.findShopByShopName(shopName);
  }

  @Put(':id')
  updateShopById(
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDTO,
  ) {
    return this.shopService.updateShopById(id, updateShopDto);
  }

  @Delete(':id')
  removeShopById(@Param('id') id: string) {
    return this.shopService.removeShopById(id);
  }
}
