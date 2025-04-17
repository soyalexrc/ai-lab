import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [OpenaiController],
  providers: [OpenAiService],
})
export class OpenaiModule {}
