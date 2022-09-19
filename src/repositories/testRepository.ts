import { prisma } from "../config/database";
import { Test } from "@prisma/client";
export type CreateTestData = Omit<Test, "id">;
export async function insertTest(test: CreateTestData) {
  return prisma.test.create({ data: test });
}
export async function findAllTestsByDiscipline() {
  return prisma.term.findMany({
    orderBy: [{ number: "asc" }],
    include: {
      disciplines: {
        include: {
          teachersDisciplines: {
            select: {
              teacher: true,
              tests: {
                select: {
                  id: true,
                  name: true,
                  pdfUrl: true,
                  category: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
                orderBy: [{ categoryId: "asc" }],
              },
            },
          },
        },
      },
    },
  });
}
export async function findAllTestsByTeacher() {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: { select: { name: true } },
      discipline: { select: { name: true } },
      tests: {
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: [{ teacherId: "asc" }, { disciplineId: "asc" }],
  });
}
