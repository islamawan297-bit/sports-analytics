import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  async findAll(
    @Query('sport') sport?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.gamesService.findAll({
      sport,
      status,
      search,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get('live')
  async findLive() {
    return this.gamesService.findLive();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.gamesService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.gamesService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
