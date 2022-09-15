import { prisma } from "../config/database.js";

export async function getTeacherDisciplineByIds(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teacherDiscipline.findFirst({
    where: { teacherId, disciplineId },
  });
}
