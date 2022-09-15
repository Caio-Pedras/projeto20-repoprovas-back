import { prisma } from "./../config/database.js";

export async function getCategoryByName(name: string) {
  return prisma.category.findUnique({ where: { name } });
}
