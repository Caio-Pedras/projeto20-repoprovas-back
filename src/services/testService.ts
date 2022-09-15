import { getCategoryByName } from "../repositories/categoryRepository";
import { getDisciplineByName } from "../repositories/disciplineRepository";
import { getTeacherDisciplineByIds } from "../repositories/teacherDisciplineRepository";
import { getTeacherByName } from "../repositories/teacherRepository";
import { insertTest } from "../repositories/testRepository";
import { notFoundError } from "../utils/errorUtils";

interface TestInterface {
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

  const { id: teacherDisciplineId } = await getTeacherDisciplineByIds(
    teacher.id,
    discipline.id
  );
  const insertData = {
    name: test.name,
    pdfUrl: test.pdfUrl,
    categoryId: category.id,
    teacherDisciplineId,
  };
  await insertTest(insertData);
}
