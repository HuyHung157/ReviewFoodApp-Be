import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Review Food API')
    .setDescription('This is the ReviewFoodApp API description')
    .setVersion('1.0')
    .addTag('food')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
