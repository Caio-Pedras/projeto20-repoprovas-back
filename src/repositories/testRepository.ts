import { prisma } from "../config/database.js";
import { Test } from "@prisma/client";
export type CreateTestData = Omit<Test, "id">;
export async function insertTest(test: CreateTestData) {
  return prisma.test.create({ data: test });
}
