import { prisma } from "./../config/database";

export async function getDisciplineByName(name: string) {
  return prisma.discipline.findUnique({ where: { name } });
}
