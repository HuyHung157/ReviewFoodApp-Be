import { Connection } from 'typeorm';
import { BookmarkEntity } from './bookmark.entity';

export const BookmarkProvider = [
  {
    provide: 'BOOKMARK_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(BookmarkEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
