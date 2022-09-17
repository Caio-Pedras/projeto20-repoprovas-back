import { group } from "console";
import { getCategoryByName } from "../repositories/categoryRepository";
import { getDisciplineByName } from "../repositories/disciplineRepository";
import { getTeacherDisciplineByIds } from "../repositories/teacherDisciplineRepository";
import { getTeacherByName } from "../repositories/teacherRepository";
import {
  findAllTestsByDiscipline,
  findAllTestsByTeacher,
  insertTest,
} from "../repositories/testRepository";
import { badRequestError, notFoundError } from "../utils/errorUtils";

export interface TestInterface {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}
export async function createTestService(test: TestInterface) {
  const category = await getCategoryByName(test.category);
  if (!category) {
    throw notFoundError("Category not found");
  }
  const teacher = await getTeacherByName(test.teacher);
  if (!teacher) {
    throw notFoundError("teacher not found");
  }
  const discipline = await getDisciplineByName(test.discipline);
  if (!discipline) {
    throw notFoundError("discipline not found");
  }

  const teacherDiscipline = await getTeacherDisciplineByIds(
    teacher.id,
    discipline.id
  );
  if (!teacherDiscipline) {
    throw notFoundError("teacher with the informed discipline not found");
  }
  const insertData = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId: teacherDiscipline.id,
  };
  await insertTest(insertData);
}

export async function FindTestsByTagService(groupBy: string) {
  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    throw badRequestError("You must inform a valid group by clasule");
  }
  if (groupBy === "disciplines") {
    return await findAllTestsByDiscipline();
  }
  if (groupBy === "teachers") {
    return await findAllTestsByTeacher();
  }
}
