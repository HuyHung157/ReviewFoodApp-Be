import { Connection } from 'typeorm';
import { ShopOwnerEntity } from './shop-owner.entity';
import { ShopEntity } from './shop.entity';

export const ShopProvider = [
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ShopEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SHOP_OWNER_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ShopOwnerEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
