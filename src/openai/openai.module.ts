import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { OpenaiController } from './openai.controller';

@Module({
  controllers: [OpenaiController],
  providers: [OpenAiService],
})
export class OpenaiModule {}
