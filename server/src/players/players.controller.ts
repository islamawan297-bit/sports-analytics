import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { PlayersService } from './players.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(
    @Query('sport') sport?: string,
    @Query('teamId') teamId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.playersService.findAll({
      sport,
      teamId,
      search,
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.playersService.create(body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.playersService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
