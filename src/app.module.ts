import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { GenaiModule } from './genai/genai.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenaiModule,
    GenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
