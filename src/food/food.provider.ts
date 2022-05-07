import { Connection } from 'typeorm';
import { FoodEntity } from './food.entity';

export const FoodProvider = [
  {
    provide: 'FOOD_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(FoodEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
