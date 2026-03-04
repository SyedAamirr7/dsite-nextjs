import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface ProfileRow {
  User_ID: number;
  Username: string;
  Fullname: string | null;
  Phone: string | null;
  Address: string | null;
  Photo: string | null;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProfileByUserId(userId: number): Promise<ProfileRow | null> {
    const rows = await this.prisma.$queryRaw<(ProfileRow & { Picture: string | null })[]>`
      SELECT "User_ID", "Username", "Fullname", "Picture"
      FROM acp_users WHERE "User_ID" = ${userId} LIMIT 1
    `;
    const row = rows[0];
    if (!row) return null;
    return { User_ID: row.User_ID, Username: row.Username, Fullname: row.Fullname, Phone: null, Address: null, Photo: row.Picture };
  }

  async isEmailTaken(email: string, excludeUserId: number): Promise<boolean> {
    const rows = await this.prisma.$queryRaw<{ User_ID: number }[]>`
      SELECT "User_ID" FROM acp_users WHERE "Username" = ${email} AND "User_ID" != ${excludeUserId} LIMIT 1
    `;
    return rows.length > 0;
  }

  async updateProfile(
    userId: number,
    data: { Fullname: string; Username: string; Phone?: string | null; Address?: string | null; Photo?: string | null },
  ): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE acp_users SET
        "Fullname" = ${data.Fullname},
        "Username" = ${data.Username},
        "Picture" = ${data.Photo ?? null}
      WHERE "User_ID" = ${userId}
    `;
  }

  async getPhotoByUserId(userId: number): Promise<string | null> {
    const rows = await this.prisma.$queryRaw<{ Picture: string | null }[]>`
      SELECT "Picture" FROM acp_users WHERE "User_ID" = ${userId} LIMIT 1
    `;
    return rows[0]?.Picture ?? null;
  }

  async clearPhoto(userId: number): Promise<void> {
    await this.prisma.$executeRaw`
      UPDATE acp_users SET "Picture" = NULL WHERE "User_ID" = ${userId}
    `;
  }
}
