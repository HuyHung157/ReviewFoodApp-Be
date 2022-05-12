import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = +process.env.APP_PORT | 80;
  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Review Food API')
    .setDescription('This is the ReviewFoodApp API description')
    .setVersion('1.0')
    // .addTag('foods')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api`);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('ejs');
  await app.listen(PORT);
}
bootstrap();
