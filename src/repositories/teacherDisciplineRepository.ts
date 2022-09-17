import { prisma } from "../config/database";

export async function getTeacherDisciplineByIds(
  teacherId: number,
  disciplineId: number
) {
  return prisma.teacherDiscipline.findFirst({
    where: { teacherId, disciplineId },
  });
}
