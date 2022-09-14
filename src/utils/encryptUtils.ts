import bcrypt from "bcrypt";
// import Cryptr from "cryptr";
import { unauthorizedError } from "./errorUtils.js";

// const cryptr = new Cryptr(process.env.CRYPTR_SECRET as string);

export function bcryptString(string: string) {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(string, SALT);
  return hashedPassword;
}

export async function bcryptCompare(string: string, hashedString: string) {
  const validatePassword = bcrypt.compareSync(string, hashedString);
  if (!validatePassword) {
    throw unauthorizedError("Invalid credentials");
  }
}
// export function cryptrEncryptString(string: string) {
//   return cryptr.encrypt(string);
// }
// export function cryptrDecryptString(string: string) {
//   return cryptr.decrypt(string);
// }
