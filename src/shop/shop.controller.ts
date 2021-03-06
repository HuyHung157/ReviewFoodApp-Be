import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShopDTO } from './dto/create-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopService } from './shop.service';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Post()
  @ApiOperation({ summary: 'Create shop' })
  createShop(@Body() createShopDTO: CreateShopDTO) {
    return this.shopService.createShop(createShopDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiOkResponse({ description: 'List all shops' })
  async getShopList() {
    return await this.shopService.getShopList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shop detail' })
  getDetailShop(@Param('id') id: string) {
    return this.shopService.getDetailShop(id);
  }

  @Get('/name/:shopName')
  @ApiOperation({ summary: 'Get shop detail by shopName' })
  findShopByShopName(@Param('shopName') shopName: string) {
    return this.shopService.findShopByShopName(shopName);
  }

  @Get('/shop-owner/:shopOwnerId')
  @ApiOperation({ summary: 'Get all shop with owner management' })
  getListShopByShopOwnerId(@Param('shopOwnerId') shopOwnerId: string) {
    return this.shopService.getListShopByShopOwnerId(shopOwnerId);
  }

  @Put(':shopId')
  @ApiOperation({ summary: 'Update shop' })
  updateShopById(
    @Param('shopId') id: string,
    @Body() updateShopDto: UpdateShopDTO,
  ) {
    return this.shopService.updateShopById(id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete shop' })
  removeShopById(@Param('id') id: string) {
    return this.shopService.removeShopById(id);
  }
}
