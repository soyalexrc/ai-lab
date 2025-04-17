import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenAiService) {}

  @Post('callOpenApi')
  async callOpenAI(@Body() data: { model: string; prompt: string }) {
    return this.openaiService.callOpenAI(data.model, data.prompt);
  }

  @Post('callDalle')
  async callDalle() {
    return this.openaiService.callDalle();
  }

  @Post('multiImages')
  async generateModernImagesBasedOnPhoto() {
    return this.openaiService.generateCatalogImagesFromPhoto();
  }
}
