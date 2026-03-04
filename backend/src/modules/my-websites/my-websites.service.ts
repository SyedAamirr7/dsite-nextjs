import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export interface WebsiteItem {
  id: number;
  domain: string;
}

@Injectable()
export class MyWebsitesService {
  constructor(private readonly prisma: PrismaService) {}

  async getWebsitesForUser(userId: number): Promise<WebsiteItem[]> {
    const customerId = String(userId);
    const subs = await this.prisma.subscription.findMany({
      where: {
        Customer_ID: customerId,
        subStatus: { in: ['active', 'pending'] },
      },
      select: { Website_ID: true },
      distinct: ['Website_ID'],
    });
    if (subs.length === 0) return [];
    const ids = subs.map((s: { Website_ID: number }) => s.Website_ID);
    const websites = await this.prisma.websites.findMany({
      where: { ID: { in: ids }, Status: 1 },
      select: { ID: true, domain: true },
      orderBy: { domain: 'asc' },
    });
    return websites.map((w: { ID: number; domain: string }) => ({ id: w.ID, domain: w.domain }));
  }
}
