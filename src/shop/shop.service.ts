import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateShopDTO } from './dto/create-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopEntity } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private readonly userRepository: Repository<ShopEntity>,
  ) {}
  async createShop(createShopDTO: CreateShopDTO) {
    await this.userRepository.save(createShopDTO);
    return {
      statusCode: 200,
      message: 'Create Shop successfully',
    };;
  }

  getShopList() {
    return this.userRepository.find();
  }

  getDetailShop(id: string) {
    return this.userRepository.findOne(id);
  }

  updateShopById(id: string, updateShopDto: UpdateShopDTO) {
    return this.userRepository.update(id, updateShopDto);
  }

  removeShopById(id: string) {
    return this.userRepository.delete(id);
  }

  async findShopByShopName(shopName: string): Promise<ShopEntity> {  
    const user = await this.userRepository.findOne({ shopName });
    return user;
  }
}
