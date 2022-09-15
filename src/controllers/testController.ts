import { Request, Response } from "express";
import { createTestService } from "../services/testService";

export async function postTest(req: Request, res: Response) {
  const test = req.body;
  await createTestService(test);
  return res.sendStatus(201);
}
