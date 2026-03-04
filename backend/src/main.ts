import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './all-exceptions.filter';

/** Catch body-parser errors (payload too large, invalid JSON) so the server does not crash. */
function bodyParserErrorHandler(err: Error & { status?: number; type?: string }, _req: Request, res: Response, next: NextFunction) {
  const status = err.status ?? 400;
  const isBodyError =
    err.type === 'entity.parse.failed' ||
    err.type === 'entity.too.large' ||
    /payload|entity|body|json|parse/i.test(err.message ?? '');
  if (isBodyError && status >= 400 && status < 500) {
    res.status(status).json({ success: false, error: err.message || 'Invalid or too large request body' });
    return;
  }
  next(err);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false, // we add json/urlencoded below with larger limits
  });
  const port = process.env.PORT || 4000;
  const corsOrigin = process.env.CORS_ORIGIN;
  const allowedOrigins = corsOrigin
    ? corsOrigin.split(',').map((o) => o.trim())
    : [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3006',
        'http://127.0.0.1:3006',
        'http://192.168.8.237:3000',
        'http://192.168.8.237:3006',
      ];

  // Increase body size limits to avoid "payload too large" / body-parser errors (e.g. profile photo upload)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(bodyParserErrorHandler);
  app.use(cookieParser());
  // Allow tunnel origins (ngrok, Cloudflare, loca.lt) so backend works with any tunnel URL without editing CORS_ORIGIN
  const isTunnelOrigin = (o: string) =>
    /\.ngrok|ngrok-free\.app|trycloudflare\.com|\.loca\.lt|cloudflare\.com/i.test(o);
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin) || isTunnelOrigin(origin)) return cb(null, true);
      cb(null, false);
    },
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });

  const host = process.env.HOST || '0.0.0.0';
  await app.listen(port, host);
  console.log(`Backend listening on http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
}

bootstrap().catch((err) => {
  console.error('Backend failed to start:', err?.message ?? err);
  process.exit(1);
});
