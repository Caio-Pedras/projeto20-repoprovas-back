import { prisma } from "../config/database.js";

export async function getTeacherByName(name: string) {
  return prisma.teacher.findUnique({ where: { name } });
}
