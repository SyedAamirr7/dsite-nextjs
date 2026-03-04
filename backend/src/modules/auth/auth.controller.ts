import { Controller, Post, Get, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtCookieGuard } from './jwt-cookie.guard';
import { ACP_SESSION_COOKIE } from './auth-cookie';

@Controller('api/acp/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: { email?: string; password?: string; _cookieOrigin?: string },
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // When request is proxied (e.g. Next.js rewrite), req.get('host') is backend host. Use client-sent origin for cookie so it works on tunnel.
    const originFromClient = dto._cookieOrigin?.trim();
    let host = req.get('host') ?? '';
    let isTunnel = /\.loca\.lt$|\.ngrok|\.trycloudflare\.com|cloudflare\.com/i.test(host);
    if (originFromClient) {
      try {
        const u = new URL(originFromClient);
        host = u.host;
        isTunnel = /\.loca\.lt$|\.ngrok|\.trycloudflare\.com|cloudflare\.com/i.test(host) || u.protocol === 'https:';
      } catch {
        /* keep host/isTunnel from req */
      }
    }
    const result = await this.authService.login(
      { email: dto.email ?? '', password: dto.password ?? '' },
      { requestHost: host, secure: req.secure || isTunnel },
    );
    res.setHeader('Set-Cookie', result.cookieHeader);
    return { success: true, user: result.user };
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const host = req.get('host') ?? '';
    const isTunnel = /\.loca\.lt$|\.ngrok|\.trycloudflare\.com|cloudflare\.com/i.test(host);
    res.setHeader(
      'Set-Cookie',
      this.authService.getClearCookieHeader({ requestHost: host, secure: req.secure || isTunnel }),
    );
    return { success: true };
  }

  @Get('session')
  async session(@Req() req: Request) {
    const token = req.cookies?.[ACP_SESSION_COOKIE];
    const session = await this.authService.getSessionFromCookie(token);
    if (!session) return { authenticated: false };
    return {
      authenticated: true,
      user: { id: session.userId, email: session.email, fullname: session.fullname },
    };
  }
}
