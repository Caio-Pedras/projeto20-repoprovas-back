import { prisma } from "./../config/database.js";
import { CreateUserData } from "../services/authService.js";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function insertUser(user: CreateUserData) {
  return prisma.user.create({ data: user });
}
