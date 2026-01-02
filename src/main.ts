import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cineverse API')
    .setDescription('Cineverse API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('movies')
    .addTag('actors')
    .addTag('genres')
    .addTag('reviews')
    .addBearerAuth()  // Add JWT Bearer token support for Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
