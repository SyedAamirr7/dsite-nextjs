import { Controller, Get, Post, Delete, Body, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtCookieGuard } from '../auth/jwt-cookie.guard';
import { UsersService } from './users.service';

@Controller('api/acp/profile')
@UseGuards(JwtCookieGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(@Req() req: Request & { user: { userId: number } }) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  updateProfile(
    @Req() req: Request & { user: { userId: number } },
    @Body() body: { fullname?: string; email?: string; current_email?: string; phone?: string; address?: string },
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(req.user.userId, {
      fullname: body.fullname ?? '',
      email: body.email ?? '',
      current_email: body.current_email ?? '',
      phone: body.phone,
      address: body.address,
    }, file);
  }

  @Delete('photo')
  deletePhoto(@Req() req: Request & { user: { userId: number } }) {
    return this.usersService.deletePhoto(req.user.userId);
  }
}
