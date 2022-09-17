import { prisma } from "./../config/database";

export async function getCategoryByName(name: string) {
  return prisma.category.findUnique({ where: { name } });
}
