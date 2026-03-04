import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface SectionRow {
  ID: number;
  Website_ID: number;
  Section_Title_ar: string;
  Section_Title_en: string;
  Custom_Section_Title_ar: string | null;
  Custom_Section_Title_en: string | null;
  Section_Content_Table: string;
  Order_No: number;
  Status: number;
}

const DEFAULT_SECTION_IMAGE = '';

/** Default section content tables and titles. All of these are ensured for each website so toggles work. */
const DEFAULT_SECTION_TABLES: Array<{ table: string; titleEn: string; titleAr: string }> = [
  { table: 'slider', titleEn: 'Slider', titleAr: 'السلايدر' },
  { table: 'about', titleEn: 'About us', titleAr: 'من نحن' },
  { table: 'service', titleEn: 'Services', titleAr: 'الخدمات' },
  { table: 'project', titleEn: 'Projects', titleAr: 'المشاريع' },
  { table: 'product', titleEn: 'Products', titleAr: 'المنتجات' },
  { table: 'portfolio', titleEn: 'Portfolio', titleAr: 'معرض الأعمال' },
  { table: 'why_choose', titleEn: 'Why choose us', titleAr: 'لماذا نحن' },
  { table: 'news', titleEn: 'News', titleAr: 'الأخبار' },
  { table: 'branch', titleEn: 'Branches', titleAr: 'الفروع' },
  { table: 'showreel', titleEn: 'Showreel', titleAr: 'العرض' },
  { table: 'gallery', titleEn: 'Gallery', titleAr: 'المعرض' },
  { table: 'client', titleEn: 'Clients', titleAr: 'العملاء' },
  { table: 'app', titleEn: 'Download app', titleAr: 'تحميل التطبيق' },
  { table: 'team', titleEn: 'Team', titleAr: 'الفريق' },
  { table: 'career', titleEn: 'Career', titleAr: 'الوظائف' },
  { table: 'partner', titleEn: 'Partners', titleAr: 'الشركاء' },
  { table: 'plans', titleEn: 'Plans', titleAr: 'الباقات' },
  { table: 'contact', titleEn: 'Contact Us', titleAr: 'اتصل بنا' },
  { table: 'restaurant', titleEn: 'Restaurant', titleAr: 'المطعم' },
  { table: 'find_restaurant', titleEn: 'Find Restaurant', titleAr: 'البحث عن مطعم' },
  { table: 'content-marketing', titleEn: 'Content Marketing', titleAr: 'التسويق بالمحتوى' },
  { table: 'inbox', titleEn: 'Inbox', titleAr: 'صندوق الوارد' },
  { table: 'scene-visual', titleEn: 'Scene Visual', titleAr: 'المشهد المرئي' },
  { table: 'page', titleEn: 'Pages', titleAr: 'الصفحات' },
  { table: 'ads', titleEn: 'Ads', titleAr: 'الإعلانات' },
  { table: 'restaurant_orders', titleEn: 'Restaurant Orders', titleAr: 'طلبات المطعم' },
];

@Injectable()
export class SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByWebsiteId(websiteId: number): Promise<SectionRow[]> {
    const rows = await this.prisma.sections.findMany({
      where: { Website_ID: websiteId },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Website_ID: true,
        Section_Title_ar: true,
        Section_Title_en: true,
        Custom_Section_Title_ar: true,
        Custom_Section_Title_en: true,
        Section_Content_Table: true,
        Order_No: true,
        Status: true,
      },
    });
    return rows as SectionRow[];
  }

  async hasSectionByContentTable(websiteId: number, sectionContentTable: string): Promise<boolean> {
    const count = await this.prisma.sections.count({
      where: {
        Website_ID: websiteId,
        Section_Content_Table: sectionContentTable,
      },
    });
    return count > 0;
  }

  async ensurePlansSection(websiteId: number): Promise<void> {
    const exists = await this.hasSectionByContentTable(websiteId, 'plans');
    if (exists) return;

    const maxOrder = await this.prisma.sections.aggregate({
      where: { Website_ID: websiteId },
      _max: { Order_No: true },
    });
    const nextOrder = (maxOrder._max.Order_No ?? -1) + 1;

    await this.prisma.sections.create({
      data: {
        Website_ID: websiteId,
        Section_Title_ar: 'الخطط',
        Section_Title_en: 'Plans',
        Section_Content_Table: 'plans',
        Section_Image: DEFAULT_SECTION_IMAGE,
        Order_No: nextOrder,
        Status: 1,
        Page_ID: 0,
      },
    });
  }

  /** Ensure all default section types exist for the website so every content item can be toggled. */
  async ensureDefaultSections(websiteId: number): Promise<void> {
    const maxOrder = await this.prisma.sections.aggregate({
      where: { Website_ID: websiteId },
      _max: { Order_No: true },
    });
    let nextOrder = (maxOrder._max.Order_No ?? -1) + 1;

    for (const { table, titleEn, titleAr } of DEFAULT_SECTION_TABLES) {
      const exists = await this.hasSectionByContentTable(websiteId, table);
      if (exists) continue;

      await this.prisma.sections.create({
        data: {
          Website_ID: websiteId,
          Section_Title_ar: titleAr,
          Section_Title_en: titleEn,
          Section_Content_Table: table,
          Section_Image: DEFAULT_SECTION_IMAGE,
          Order_No: nextOrder,
          Status: 1,
          Page_ID: 0,
        },
      });
      nextOrder += 1;
    }
  }

  async updateStatus(websiteId: number, sectionId: number, status: number): Promise<boolean> {
    const result = await this.prisma.sections.updateMany({
      where: {
        ID: sectionId,
        Website_ID: websiteId,
      },
      data: { Status: status },
    });
    return result.count > 0;
  }
}
