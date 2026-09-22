import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Put('users/:id/role')
  async updateUserRole(
    @Param('id') userId: string,
    @Body('role') role: 'USER' | 'ADMIN',
  ) {
    return this.adminService.updateUserRole(userId, role);
  }

  @Get('provider-status')
  async getProviderStatus() {
    return this.adminService.getProviderStatus();
  }

  @Post('sync-trigger')
  async triggerSync() {
    return this.adminService.triggerSync();
  }

  @Get('logs')
  async getSystemLogs() {
    return this.adminService.getSystemLogs();
  }

  @Get('stats')
  async getApiStats() {
    return this.adminService.getApiStats();
  }

  @Post('cache/flush')
  async flushCache() {
    return this.adminService.flushCache();
  }
}
