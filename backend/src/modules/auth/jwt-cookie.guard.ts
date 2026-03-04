import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verifySessionToken, ACP_SESSION_COOKIE } from './auth-cookie';

@Injectable()
export class JwtCookieGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.[ACP_SESSION_COOKIE];
    if (!token) throw new UnauthorizedException();
    const session = await verifySessionToken(token);
    if (!session) throw new UnauthorizedException();
    (request as Request & { user: { userId: number; email: string; fullname: string } }).user = {
      userId: session.userId,
      email: session.email,
      fullname: session.fullname,
    };
    return true;
  }
}
