import { Connection } from 'typeorm';
import { ReviewEntity } from './review.entity';

export const ReviewProvider = [
  {
    provide: 'REVIEW_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(ReviewEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
