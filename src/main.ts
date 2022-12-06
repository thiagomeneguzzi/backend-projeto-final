import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Final Project')
        .setDescription('The final Project API documentation')
        .setVersion('1.0')
        .addTag('User')
        .addTag('Client')
        .addTag('Debit')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());
    app.use(morgan('tiny'));

    await app.listen(3000);
}

bootstrap();
