const DBConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'review-food',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: { migrationsDir: 'src/database/migrations' },
  synchronize: true,
}

module.exports = DBConfig;