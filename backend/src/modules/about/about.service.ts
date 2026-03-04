import { Injectable, BadRequestException } from '@nestjs/common';
import { AboutRepository } from './about.repository';

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

@Injectable()
export class AboutService {
  constructor(private readonly aboutRepo: AboutRepository) {}

  async saveAbout(body: Record<string, unknown>, websiteId: number): Promise<{ success: boolean; updated?: boolean; inserted?: boolean; id?: number }> {
    if (!body || typeof body !== 'object') throw new BadRequestException('Invalid request body');
    const row: Record<string, string> = {};
    for (const col of ABOUT_COLUMNS) {
      const val = body[col];
      if (val !== undefined && val !== null) row[col] = String(val);
    }
    if (body.About_Content_en !== undefined) row.About_Detail_en = String(body.About_Content_en);
    if (body.About_Content_ar !== undefined) row.About_Detail_ar = String(body.About_Content_ar);
    if (row.About_Detail_en === undefined) row.About_Detail_en = '';
    if (row.About_Detail_ar === undefined) row.About_Detail_ar = '';
    const columns = Object.keys(row);
    if (columns.length === 0) throw new BadRequestException('No valid fields to save');
    const values = columns.map((c) => row[c]);
    const existingId = await this.aboutRepo.findExistingId(websiteId);
    if (existingId != null) {
      await this.aboutRepo.update(existingId, columns, values);
      return { success: true, updated: true, id: existingId };
    }
    const id = await this.aboutRepo.insert(websiteId, columns, values);
    return { success: true, inserted: true, id };
  }

  async getAbout(websiteId: number): Promise<Record<string, string | null> | null> {
    return this.aboutRepo.findByWebsiteId(websiteId);
  }
}
