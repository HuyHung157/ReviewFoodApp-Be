import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/user/enums/role.enum';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateShopDTO } from './dto/create-shop.dto';
import { UpdateShopDTO } from './dto/update-shop.dto';
import { ShopOwnerService } from './shop-owner.service';
import { ShopEntity } from './shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_REPOSITORY')
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly userService: UserService,
    private readonly shopOwnerService: ShopOwnerService,
  ) {}

  async createShop(input: CreateShopDTO) {
    const isShopOwner = await this.userService.isShopOwnerRole(input.userId);
    if(!isShopOwner){
      return {
        statusCode: 400,
        message: 'You do not have permission to create shop',
      };
    }
    const userId = input.userId;
    delete input.userId;
    const shop = await this.shopRepository.save(input);
    if(!shop){
      return {
        statusCode: 400,
        message: 'Create shop failed',
      };
    }
    await this.shopOwnerService.createShopOwner(userId, shop.id);
    return {
      statusCode: 200,
      message: 'Create Shop successfully',
    };
  }

  async getShopList() {
    const query = this.shopRepository
    .createQueryBuilder('shop')
    .where('shop.isActive = :isActive', { isActive: true })
    .leftJoinAndSelect('shop.owner', 'shopOwner', 'shopOwner.isActive = :isActive', { isActive: true })
    .leftJoinAndSelect('shopOwner.user', 'user', 'user.isActive = :isActive', { isActive: true });
    const [items, totalItems] =  await query.getManyAndCount();
    return {items, totalItems};
  }

  getDetailShop(id: string) {
    return this.shopRepository.findOne({id, isActive: true});
  }

  async updateShopById(shopId: string, input: UpdateShopDTO) {
    const isShopOwner = await this.userService.isShopOwnerRole(input.userId);
    if(!isShopOwner){
      return {
        statusCode: 400,
        message: 'You do not have permission to update this shop',
      };
    }
    const shop = await this.shopRepository.findOne({id: shopId, isActive: true});
    if(!shop){
      return {
        statusCode: 400,
        message: 'Shop not found',
      };
    }
    // List shop current user is owner this shop
    const user = await this.userService.getDetailUser(input.userId);
    const items = await this.shopOwnerService.getListShopManagement(user.id);
    const isExist = items.some(item => item.shop.id === shop.id);
    if(!isExist){
      return {
        statusCode: 400,
        message: 'You do not have permission to update this shop',
      };
    }
    delete input.userId;
    await this.shopRepository.update(shopId, input);
    return {
      statusCode: 200,
      message: 'Update Shop successfully',
    }
  }

  async removeShopById(id: string) {
    try {
      await this.shopRepository.update(id, { isActive: false });
      return {
        statusCode: 200,
        message: 'Remove Shop successfully',
      }
    } catch (err) {
      return {
        statusCode: 400,
        message: err.message,
      };
    }
  }

  async findShopByShopName(shopName: string): Promise<ShopEntity> {
    const user = await this.shopRepository.findOne({ shopName, isActive: true });
    return user;
  }

  // get list shop by shop owner id
  async getListShopByShopOwnerId (shopOwnerId: string){
    return this.shopOwnerService.getListShopManagement(shopOwnerId);
  }

  public async isOwnerShop(userId: string, shopId): Promise<boolean | {statusCode: number, message: string}> {
    const user = await this.userService.getDetailUser( userId );
    if (!user || user.role !== Role.SHOP_OWNER) {
      return false;
    }
    const items = await this.shopOwnerService.getListShopManagement(user.id);
    const isExist = items.some(item => item.shop.id === shopId);
    return isExist;
  }
}
