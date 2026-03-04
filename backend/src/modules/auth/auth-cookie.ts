import { SignJWT, jwtVerify } from 'jose';

export const ACP_SESSION_COOKIE = 'acp_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export interface AcpSessionPayload {
  userId: number;
  email: string;
  fullname: string;
  iat: number;
  exp: number;
}

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set and at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: Omit<AcpSessionPayload, 'iat' | 'exp'>): Promise<string> {
  const secret = getSecret();
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    fullname: payload.fullname,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<AcpSessionPayload | null> {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      fullname: payload.fullname as string,
      iat: (payload.iat ?? 0) as number,
      exp: (payload.exp ?? 0) as number,
    };
  } catch {
    return null;
  }
}

export function buildSessionCookieHeader(
  token: string,
  maxAge: number = SESSION_MAX_AGE,
  options?: { requestHost?: string; secure?: boolean },
): string {
  const host = options?.requestHost ?? '';
  const isSecure = options?.secure ?? false;
  const isLocalhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);

  const parts = [
    `${ACP_SESSION_COOKIE}=${token}`,
    'Path=/',
    `Max-Age=${maxAge}`,
    'HttpOnly',
  ];
  if (isLocalhost && !isSecure) {
    parts.push('SameSite=Lax', 'Domain=localhost');
  } else {
    // Tunnel (e.g. loca.lt) or production: cookie for current host, HTTPS
    parts.push('SameSite=None', 'Secure');
    if (isLocalhost) parts.push('Domain=localhost');
  }
  return parts.join('; ');
}

export function buildClearSessionCookieHeader(options?: { requestHost?: string; secure?: boolean }): string {
  const host = options?.requestHost ?? '';
  const isSecure = options?.secure ?? false;
  const isLocalhost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host);

  const sameSite = isLocalhost && !isSecure ? 'SameSite=Lax' : 'SameSite=None';
  const secure = isLocalhost && !isSecure ? '' : '; Secure';
  const domain = isLocalhost && !isSecure ? '; Domain=localhost' : '';
  return `${ACP_SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; ${sameSite}${secure}${domain}`;
}
