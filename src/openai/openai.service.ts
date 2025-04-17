import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { createReadStream, readFile } from 'fs';

import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';

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
        model: 'dall-e-2',
        prompt:
          "Generate images for a children's clothing catalog one item per image, with a professional look and feel. Include images of children wearing the clothes.",
        quality: 'standard',
        response_format: 'url',
        n: 3,
      });

      return response.data;
    } catch (error) {
      throw new Error(error || 'OpenAI API error');
    }
  }

  async generateCatalogImagesFromPhoto() {
    try {
      const imagePath = path.resolve(
        __dirname,
        '..',
        '..',
        'src/images/sample.png',
      );
      const imageStream = createReadStream(imagePath);
      (imageStream as any).path = imagePath; // 👈 important!

      const response = await this.openai.images.edit({
        image: imagePath as any,
        prompt:
          'genera 5 imagenes basado en esta para un catalogo infantil, asegurate de que se vean profesionales, ajusta iluminacion, angulos, zonas donde reposa la ropa. que haya una imagen con un/a nin@ llevandola puesta',
        model: 'dall-e-2',
        n: 5, // 5 variations
        size: '512x512', // or '1024x1024'
        response_format: 'url',
      });

      return response.data; // Contains array of image URLs
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to generate catalog images');
    }
  }
}
