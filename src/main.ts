import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = +process.env.APP_PORT | 3000;
  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Review Food API')
    .setDescription('This is the ReviewFoodApp API description')
    .setVersion('1.0')
    .addTag('foods')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger running on http://localhost:${PORT}/api`);
  await app.listen(PORT);
}
bootstrap();
