import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { conflictError, unauthorizedError } from "../utils/errorUtils.js";
import { findUserByEmail, insertUser } from "../repositories/authRepository.js";
import { bcryptCompare, bcryptString } from "../utils/encryptUtils.js";

export type CreateUserData = Omit<User, "id">;
export async function createUser(user: CreateUserData) {
  const validateUser = await findUserByEmail(user.email);
  if (validateUser) {
    throw conflictError("email not available");
  }
  const hashedPassword = bcryptString(user.password);
  await insertUser({ email: user.email, password: hashedPassword });
}

export async function login(user: CreateUserData) {
  const validateUser = await findUserByEmail(user.email);
  if (!validateUser) {
    throw unauthorizedError("email not registered");
  }
  await bcryptCompare(user.password, validateUser.password);
  const token = jwt.sign(
    { userId: validateUser.id },
    process.env.JWT_SECRET as string
  );
  return token;
}
