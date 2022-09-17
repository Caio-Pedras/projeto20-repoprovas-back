import { prisma } from "../config/database";

export async function getTeacherByName(name: string) {
  return prisma.teacher.findUnique({ where: { name } });
}
