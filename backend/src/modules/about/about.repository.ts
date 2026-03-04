import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

const ABOUT_COLUMNS = [
  'About_Title_ar', 'About_Title_en', 'About_Subtitle_ar', 'About_Subtitle_en',
  'About_Summary_ar', 'About_Summary_en', 'About_Detail_ar', 'About_Detail_en',
  'About_Title1_ar', 'About_Title2_ar', 'About_Title3_ar', 'About_Title4_ar',
  'About_Title5_ar', 'About_Title6_ar', 'About_Title7_ar', 'About_Title8_ar',
  'About_Title1_en', 'About_Title2_en', 'About_Title3_en', 'About_Title4_en',
  'About_Title5_en', 'About_Title6_en', 'About_Title7_en', 'About_Title8_en',
  'About_Title1_Value_ar', 'About_Title2_Value_ar', 'About_Title3_Value_ar', 'About_Title4_Value_ar',
  'About_Title5_Value_ar', 'About_Title6_Value_ar', 'About_Title7_Value_ar', 'About_Title8_Value_ar',
  'About_Title1_Value_en', 'About_Title2_Value_en', 'About_Title3_Value_en', 'About_Title4_Value_en',
  'About_Title5_Value_en', 'About_Title6_Value_en', 'About_Title7_Value_en', 'About_Title8_Value_en',
  'About_Tags',
] as const;

export type AboutRow = Record<string, string | null>;

@Injectable()
export class AboutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByWebsiteId(websiteId: number): Promise<AboutRow | null> {
    const rows = await this.prisma.$queryRaw<Record<string, unknown>[]>`
      SELECT "ID", "Website_ID", "About_Title_ar", "About_Title_en", "About_Subtitle_ar", "About_Subtitle_en",
        "About_Summary_ar", "About_Summary_en", "About_Detail_ar", "About_Detail_en",
        "About_Title1_ar", "About_Title2_ar", "About_Title3_ar", "About_Title4_ar",
        "About_Title5_ar", "About_Title6_ar", "About_Title7_ar", "About_Title8_ar",
        "About_Title1_en", "About_Title2_en", "About_Title3_en", "About_Title4_en",
        "About_Title5_en", "About_Title6_en", "About_Title7_en", "About_Title8_en",
        "About_Title1_Value_ar", "About_Title2_Value_ar", "About_Title3_Value_ar", "About_Title4_Value_ar",
        "About_Title5_Value_ar", "About_Title6_Value_ar", "About_Title7_Value_ar", "About_Title8_Value_ar",
        "About_Title1_Value_en", "About_Title2_Value_en", "About_Title3_Value_en", "About_Title4_Value_en",
        "About_Title5_Value_en", "About_Title6_Value_en", "About_Title7_Value_en", "About_Title8_Value_en",
        "About_Tags"
      FROM about WHERE "Website_ID" = ${websiteId} LIMIT 1
    `;
    if (!rows[0]) return null;
    const row = rows[0];
    const out: AboutRow = {};
    const expectedKeys = [
      'ID', 'Website_ID', 'About_Title_ar', 'About_Title_en', 'About_Subtitle_ar', 'About_Subtitle_en',
      'About_Summary_ar', 'About_Summary_en', 'About_Detail_ar', 'About_Detail_en',
      'About_Title1_ar', 'About_Title2_ar', 'About_Title3_ar', 'About_Title4_ar',
      'About_Title5_ar', 'About_Title6_ar', 'About_Title7_ar', 'About_Title8_ar',
      'About_Title1_en', 'About_Title2_en', 'About_Title3_en', 'About_Title4_en',
      'About_Title5_en', 'About_Title6_en', 'About_Title7_en', 'About_Title8_en',
      'About_Title1_Value_ar', 'About_Title2_Value_ar', 'About_Title3_Value_ar', 'About_Title4_Value_ar',
      'About_Title5_Value_ar', 'About_Title6_Value_ar', 'About_Title7_Value_ar', 'About_Title8_Value_ar',
      'About_Title1_Value_en', 'About_Title2_Value_en', 'About_Title3_Value_en', 'About_Title4_Value_en',
      'About_Title5_Value_en', 'About_Title6_Value_en', 'About_Title7_Value_en', 'About_Title8_Value_en',
      'About_Tags',
    ];
    for (const key of expectedKeys) {
      const v = row[key] ?? row[key.toLowerCase()];
      out[key] = v == null ? null : String(v);
    }
    return out;
  }

  async findExistingId(websiteId: number): Promise<number | null> {
    const rows = await this.prisma.$queryRaw<{ ID: number }[]>`
      SELECT "ID" FROM about WHERE "Website_ID" = ${websiteId} LIMIT 1
    `;
    return rows[0]?.ID ?? null;
  }

  async update(id: number, columns: string[], values: string[]): Promise<void> {
    const setClause = columns.map((c, i) => `"${c}" = $${i + 1}`).join(', ');
    const sql = `UPDATE about SET ${setClause} WHERE "ID" = $${columns.length + 1}`;
    await this.prisma.$executeRawUnsafe(sql, ...values, id);
  }

  async insert(websiteId: number, columns: string[], values: string[]): Promise<number> {
    const placeholders = columns.map((_, i) => `$${i + 2}`).join(', ');
    const colsQuoted = columns.map((c) => `"${c}"`).join(', ');
    const sql = `INSERT INTO about ("Website_ID", ${colsQuoted}) VALUES ($1, ${placeholders}) RETURNING "ID"`;
    const rows = (await this.prisma.$queryRawUnsafe(sql, websiteId, ...values)) as { ID: number }[];
    return rows[0]?.ID ?? 0;
  }
}
