import { Request, Response } from "express";
import { createUser, login } from "../services/authService";

export async function postSignup(req: Request, res: Response) {
  const user = { email: req.body.email, password: req.body.password };
  await createUser(user);
  return res.sendStatus(201);
}

export async function postSignin(req: Request, res: Response) {
  const user = req.body;
  const token = await login(user);
  return res.status(200).send({ token });
}
