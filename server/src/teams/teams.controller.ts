import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findAll(
    @Query('sport') sport?: string,
    @Query('conference') conference?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.teamsService.findAll({
      sport,
      conference,
      search,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.teamsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.teamsService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
