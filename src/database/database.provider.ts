import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'food_db',
        port: +process.env.POSTGRES_PORT || 5432,
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        dropSchema: false,
        logging: true,
        synchronize: true,
      }),
  },
];
