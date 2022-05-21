import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { ShopOwnerEntity } from './shop-owner.entity';

@Injectable()
export class ShopOwnerService {
  constructor(
    @Inject('SHOP_OWNER_REPOSITORY')
    private readonly shopOwnerRepository: Repository<ShopOwnerEntity>,
    private readonly userService: UserService
  ) {}

  createShopOwner(userId: string, shopId: string) {
    return this.shopOwnerRepository.save({
      userId,
      shopId,
    });
  }

  async getListShopManagement(userId: string) {
    const user = await this.userService.getDetailUser(userId);
    if (!user) {
      return [];
    }

    const query = this.shopOwnerRepository
    .createQueryBuilder('shopOwner')
    .andWhere('shopOwner.userId = :userId', { userId: user.id })
    .andWhere('shopOwner.isActive = :isActive', { isActive: true })
    .innerJoinAndSelect('shopOwner.shop', 'shop');

    const items = await query.getMany();
    return items;
  }

}
