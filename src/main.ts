// It is crucial that the following global variables are set BEFORE anything
// else is imported!
// Normally it would not matter to the TypeScript compiler but node-ts and
// Webpack are having difficulties when globals are not defined first.
import path from 'path';
import { ConfigService } from './config.service';

global.ROOT_DIR = path.join(__dirname, '..');
global.CONFIG = new ConfigService();
CONFIG.load();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const port = 3000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
