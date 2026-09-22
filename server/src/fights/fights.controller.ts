import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { FightsService } from './fights.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('fights')
export class FightsController {
  constructor(private readonly fightsService: FightsService) {}

  @Get()
  async findAll(
    @Query('sport') sport?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.fightsService.findAll({
      sport,
      search,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fightsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.fightsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.fightsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fightsService.remove(id);
  }
}
