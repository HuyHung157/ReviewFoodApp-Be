import { Connection } from 'typeorm';
import { ShopEntity } from './shop.entity';

export const ShopProvider = [
  {
    provide: 'SHOP_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ShopEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
