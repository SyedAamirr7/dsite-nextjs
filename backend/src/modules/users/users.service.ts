import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { UsersRepository } from './users.repository';

const UPLOADS_DIR = join(process.cwd(), 'uploads', 'customers');

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getProfile(userId: number) {
    const user = await this.usersRepo.findProfileByUserId(userId);
    if (!user) throw new NotFoundException('User not found');
    return {
      fullname: user.Fullname || '',
      email: user.Username || '',
      phone: user.Phone || '',
      address: user.Address || '',
      photo: user.Photo ? `/uploads/customers/${user.Photo}` : null,
    };
  }

  async updateProfile(
    userId: number,
    dto: { fullname: string; email: string; current_email: string; phone?: string; address?: string },
    file?: Express.Multer.File,
  ) {
    if (!dto.fullname || !dto.email) throw new BadRequestException('Full name and email are required');
    if (dto.email !== dto.current_email) {
      const taken = await this.usersRepo.isEmailTaken(dto.email, userId);
      if (taken) throw new BadRequestException('Email already in use');
    }
    let photoFilename: string | null = null;
    if (file && file.size > 0) {
      if (!existsSync(UPLOADS_DIR)) await mkdir(UPLOADS_DIR, { recursive: true });
      const ext = file.originalname.split('.').pop() || 'jpg';
      photoFilename = `user_${userId}_${Date.now()}.${ext}`;
      const filePath = join(UPLOADS_DIR, photoFilename);
      await writeFile(filePath, file.buffer);
      const oldPhoto = await this.usersRepo.getPhotoByUserId(userId);
      if (oldPhoto) {
        const oldPath = join(UPLOADS_DIR, oldPhoto);
        if (existsSync(oldPath)) try { await unlink(oldPath); } catch {}
      }
    }
    await this.usersRepo.updateProfile(userId, {
      Fullname: dto.fullname,
      Username: dto.email,
      Phone: dto.phone ?? null,
      Address: dto.address ?? null,
      Photo: photoFilename,
    });
    return {
      success: true,
      message: 'Profile updated successfully',
      photo: photoFilename ? `/uploads/customers/${photoFilename}` : null,
    };
  }

  async deletePhoto(userId: number) {
    const photo = await this.usersRepo.getPhotoByUserId(userId);
    if (photo) {
      const filePath = join(UPLOADS_DIR, photo);
      if (existsSync(filePath)) try { await unlink(filePath); } catch {}
    }
    await this.usersRepo.clearPhoto(userId);
    return { success: true, message: 'Photo deleted successfully' };
  }
}
