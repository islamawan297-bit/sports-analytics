import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { SportsService } from './sports.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get()
  async findAll() {
    return this.sportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sportsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.sportsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.sportsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.sportsService.remove(id);
  }
}
