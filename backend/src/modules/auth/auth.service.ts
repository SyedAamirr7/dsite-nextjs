import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createSessionToken, buildSessionCookieHeader, buildClearSessionCookieHeader, verifySessionToken, ACP_SESSION_COOKIE } from './auth-cookie';
import { AuthRepository } from './auth.repository';

export interface LoginDto {
  email: string;
  password: string;
}

export interface CookieOptions {
  requestHost?: string;
  secure?: boolean;
}

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async login(
    dto: LoginDto,
    cookieOptions?: CookieOptions,
  ): Promise<{ cookieHeader: string; user: { id: number; email: string; fullname: string } }> {
    const email = typeof dto?.email === 'string' ? dto.email.trim() : '';
    const password = typeof dto?.password === 'string' ? dto.password : '';
    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required.');
    }
    const user = await this.authRepo.findAcpUserByEmail(email);
    if (!user || !user.Password) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    const valid = await bcrypt.compare(password, user.Password);
    if (!valid) {
      throw new UnauthorizedException('Incorrect email or password.');
    }
    const fullname = user.Fullname ?? user.Username;
    const token = await createSessionToken({
      userId: user.User_ID,
      email: user.Username,
      fullname,
    });
    const cookieHeader = buildSessionCookieHeader(token, undefined, cookieOptions);
    return {
      cookieHeader,
      user: { id: user.User_ID, email: user.Username, fullname },
    };
  }

  getClearCookieHeader(cookieOptions?: CookieOptions): string {
    return buildClearSessionCookieHeader(cookieOptions);
  }

  async getSessionFromCookie(cookieValue: string | undefined): Promise<{ userId: number; email: string; fullname: string } | null> {
    if (!cookieValue) return null;
    const session = await verifySessionToken(cookieValue);
    return session ? { userId: session.userId, email: session.email, fullname: session.fullname } : null;
  }
}
