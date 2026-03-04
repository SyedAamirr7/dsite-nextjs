import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export type AcpListEntity =
  | 'projects'
  | 'products'
  | 'partners'
  | 'services'
  | 'clients'
  | 'teams'
  | 'workers'
  | 'news'
  | 'gallery'
  | 'branchs'
  | 'jobs'
  | 'pages'
  | 'ads';

export interface AcpListItem {
  id: number;
  title: string;
  imageSrc?: string;
  status: boolean;
  /** Optional: e.g. totalApplications for projects */
  totalApplications?: number;
}

/** Generic row shape from Prisma select (avoids implicit any in map callbacks) */
type SelectRow = { ID: number; [k: string]: string | number | null | undefined };

@Injectable()
export class AcpListService {
  constructor(private readonly prisma: PrismaService) {}

  private parseWebsiteId(websiteId: string | undefined): number {
    const n = websiteId ? parseInt(websiteId, 10) : NaN;
    if (!Number.isInteger(n) || n < 1) {
      throw new BadRequestException('Valid websiteId (positive integer) is required');
    }
    return n;
  }

  async getList(entity: AcpListEntity, websiteIdParam: string | undefined): Promise<AcpListItem[]> {
    const websiteId = this.parseWebsiteId(websiteIdParam);

    switch (entity) {
      case 'projects':
        return this.getProjects(websiteId);
      case 'products':
        return this.getProducts(websiteId);
      case 'partners':
        return this.getPartners(websiteId);
      case 'services':
        return this.getServices(websiteId);
      case 'clients':
        return this.getClients(websiteId);
      case 'teams':
        return this.getTeams(websiteId);
      case 'workers':
        return this.getWorkers(websiteId);
      case 'news':
        return this.getNews(websiteId);
      case 'gallery':
        return this.getGallery(websiteId);
      case 'branchs':
        return this.getBranchs(websiteId);
      case 'jobs':
        return this.getJobs(websiteId);
      case 'pages':
        return this.getPages(websiteId);
      case 'ads':
        return this.getAds(websiteId);
      default:
        throw new BadRequestException(`Unknown entity: ${entity}`);
    }
  }

  private toStatus(v: number | null | undefined): boolean {
    return v === 1;
  }

  private imagePath(path: string | null | undefined): string {
    if (!path) return '';
    return path.startsWith('/') ? path : `/${path}`;
  }

  private async getProjects(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.project.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Project_Title_en: true,
        Project_Title_ar: true,
        Project_Image: true,
        Status: true,
      },
    });
    const withCount = await Promise.all(
      rows.map(async (r: { ID: number; Project_Title_en: string | null; Project_Title_ar: string | null; Project_Image: string; Status: number | null }) => {
        const count = await this.prisma.project_orders.count({ where: { Project_ID: r.ID } });
        return {
          id: r.ID,
          title: r.Project_Title_en ?? r.Project_Title_ar ?? '',
          imageSrc: this.imagePath(r.Project_Image),
          status: this.toStatus(r.Status),
          totalApplications: count,
        };
      }),
    );
    return withCount;
  }

  private async getProducts(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.product.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Product_Title_en: true,
        Product_Title_ar: true,
        Product_Image: true,
        Status: true,
        requests: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Product_Title_en ?? r.Product_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Product_Image as string),
      status: this.toStatus(r.Status as number),
      totalApplications: (r.requests as number) ?? 0,
    }));
  }

  private async getPartners(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.partner.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Partner_Title_en: true,
        Partner_Title_ar: true,
        Partner_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Partner_Title_en ?? r.Partner_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Partner_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getServices(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.service.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Service_Title_en: true,
        Service_Title_ar: true,
        Service_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Service_Title_en ?? r.Service_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Service_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getClients(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.client.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Client_Title_en: true,
        Client_Title_ar: true,
        Client_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Client_Title_en ?? r.Client_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Client_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getTeams(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.team.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        name_en: true,
        name_ar: true,
        Team_Photo: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.name_en ?? r.name_ar ?? '') as string,
      imageSrc: this.imagePath(r.Team_Photo as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getWorkers(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.portfolio.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Portfolio_Title_en: true,
        Portfolio_Title_ar: true,
        Portfolio_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Portfolio_Title_en ?? r.Portfolio_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Portfolio_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getNews(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.news.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        News_Title_en: true,
        News_Title_ar: true,
        News_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.News_Title_en ?? r.News_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.News_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getGallery(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.gallery.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Gallery_Title_en: true,
        Gallery_Title_ar: true,
        Gallery_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Gallery_Title_en ?? r.Gallery_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Gallery_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getBranchs(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.branch.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Branch_Title_en: true,
        Branch_Title_ar: true,
        Branch_Image: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Branch_Title_en ?? r.Branch_Title_ar ?? '') as string,
      imageSrc: this.imagePath(r.Branch_Image as string),
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getJobs(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.career.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Job_Title_en: true,
        Job_Title_ar: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Job_Title_en ?? r.Job_Title_ar ?? '') as string,
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getPages(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.pages.findMany({
      where: { Website_ID: websiteId, Is_Deleted: 0 },
      orderBy: { Order_No: 'asc' },
      select: {
        ID: true,
        Page_Title_en: true,
        Page_Title_ar: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Page_Title_en ?? r.Page_Title_ar ?? '') as string,
      status: this.toStatus(r.Status as number),
    }));
  }

  private async getAds(websiteId: number): Promise<AcpListItem[]> {
    const rows = await this.prisma.ads.findMany({
      where: { Website_ID: websiteId, Deleted: 0 },
      orderBy: { Timestamp: 'desc' },
      select: {
        ID: true,
        Ad_Title_en: true,
        Ad_Title_ar: true,
        Status: true,
      },
    });
    return rows.map((r: SelectRow) => ({
      id: r.ID,
      title: (r.Ad_Title_en ?? r.Ad_Title_ar ?? '') as string,
      status: this.toStatus(r.Status as number),
    }));
  }
}
