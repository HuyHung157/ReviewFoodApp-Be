import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateShopDTO } from './dto/create-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopEntity } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async createShop(createShopDTO: CreateShopDTO) {
    await this.shopRepository.save(createShopDTO);
    return {
      statusCode: 200,
      message: 'Create Shop successfully',
    };
  }

  getShopList() {
    return this.shopRepository.find();
  }

  getDetailShop(id: string) {
    return this.shopRepository.findOne(id);
  }

  updateShopById(id: string, updateShopDto: UpdateShopDTO) {
    return this.shopRepository.update(id, updateShopDto);
  }

  removeShopById(id: string) {
    return this.shopRepository.delete(id);
  }

  async findShopByShopName(shopName: string): Promise<ShopEntity> {
    const user = await this.shopRepository.findOne({ shopName });
    return user;
  }
}
