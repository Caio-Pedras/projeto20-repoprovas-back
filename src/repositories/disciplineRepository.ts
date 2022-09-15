import { prisma } from "./../config/database.js";

export async function getDisciplineByName(name: string) {
  return prisma.discipline.findUnique({ where: { name } });
}
