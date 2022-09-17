import { prisma } from "../../src/config/database";
import jwt from "jsonwebtoken";
import userFactory from "./userFactory";
import bcrypt from "bcrypt";

export default async function tokenFactory() {
  const user = userFactory();
  const createdUser = await prisma.user.create({
    data: { ...user, password: bcrypt.hashSync(user.password, 10) },
  });
  return jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET as string);
}
