import { Injectable, BadRequestException } from '@nestjs/common';
import { SectionsRepository } from './sections.repository';

@Injectable()
export class SectionsService {
  constructor(private readonly repo: SectionsRepository) {}

  async getSections(websiteId: number) {
    await this.repo.ensureDefaultSections(websiteId);
    const sections = await this.repo.findAllByWebsiteId(websiteId);
    return sections;
  }

  async updateSectionStatus(
    websiteId: number,
    sectionId: number,
    status: number,
  ): Promise<{ success: boolean }> {
    if (status !== 0 && status !== 1) {
      throw new BadRequestException('status must be 0 or 1');
    }
    const updated = await this.repo.updateStatus(websiteId, sectionId, status);
    return { success: updated };
  }
}
