import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanFights() {
  const result = await prisma.fight.deleteMany({});
  console.log(`Deleted ${result.count} fights from database.`);
}

cleanFights()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
