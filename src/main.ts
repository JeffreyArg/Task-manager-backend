import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para la gestión de tareas con usuarios y estados')
    .setVersion('1.0')
    .addTag('Tasks', 'Operaciones relacionadas con tareas')
    .addTag('Users', 'Operaciones relacionadas con usuarios')
    .addTag('TaskStatuses', 'Operaciones relacionadas con estados de tareas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
