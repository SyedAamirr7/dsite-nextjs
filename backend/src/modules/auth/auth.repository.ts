import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface AcpUserRow {
  User_ID: number;
  Username: string;
  Password: string;
  Fullname: string | null;
}

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Allow login for super_admin (Role_ID 1) and admin (Role_ID 2) from users_roles. */
  async findAcpUserByEmail(email: string): Promise<AcpUserRow | null> {
    const rows = await this.prisma.$queryRaw<AcpUserRow[]>`
      SELECT "User_ID", "Username", "Password", "Fullname"
      FROM users
      WHERE "Username" = ${email} AND "Role_ID" IN (1, 2)
      LIMIT 1
    `;
    return rows[0] ?? null;
  }
}
