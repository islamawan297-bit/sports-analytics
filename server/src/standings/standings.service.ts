import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StandingsService {
  constructor(private prisma: PrismaService) {}

  async getStandingsBySport(sportId: string) {
    const teams = await this.prisma.team.findMany({
      where: { sportId },
      orderBy: { rank: 'asc' },
    });

    return teams.map((t, idx) => ({
      rank: t.rank || idx + 1,
      teamId: t.id,
      teamName: t.name,
      teamCode: t.code,
      teamLogo: t.logo,
      wins: t.wins,
      losses: t.losses,
      draws: t.draws,
      pct: t.pct,
      diff: t.wins > t.losses ? `+${(t.wins - t.losses) * 2.5}` : `-${(t.losses - t.wins) * 2.5}`,
      streak: t.streak,
      last10: '8-2',
    }));
  }
}
