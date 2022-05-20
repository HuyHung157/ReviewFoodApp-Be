import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join, resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = +process.env.APP_PORT | 80;
  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Review Food API')
    .setDescription('This is the ReviewFoodApp API description')
    .setContact(
      'Trần Huy Hùng',
      'http://huyhung.online',
      'hhungtran157@gmail.com',
    )
    .setVersion('1.0')
    // .addTag('foods')
    // .addServer('http://localhost:3000', 'Localhost')
    // .addServer('huyhung.online/api', 'Production')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api`);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  console.log(join('dirname: ', __dirname));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(PORT);
}
bootstrap();
