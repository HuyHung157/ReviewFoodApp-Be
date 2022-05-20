const DBConfig = {
  type: process.env.DATABASE_TYPE || 'postgres',
  host: process.env.POSTGRES_HOST || 'food_db',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: { migrationsDir: 'src/database/migrations' },
  synchronize: true,
};

module.exports = DBConfig;
