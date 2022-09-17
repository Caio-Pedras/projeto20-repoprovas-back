import { prisma } from "./../config/database";
import { CreateUserData } from "../services/authService";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function insertUser(user: CreateUserData) {
  return prisma.user.create({ data: user });
}
