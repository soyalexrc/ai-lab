import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;
  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async callOpenAI(model: string, prompt: string) {
    try {
      const response = await this.openai.responses.create({
        model,
        input: prompt,
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data || 'OpenAI API error');
    }
  }

  async callDalle() {
    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: 'Generate a "Ghibli" style image of a family',
        quality: 'standard',
        response_format: 'url',
        n: 1,
      });

      return response.data;
    } catch (error) {
      throw new Error(error || 'OpenAI API error');
    }
  }
}
