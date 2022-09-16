import { Request, Response } from "express";
import {
  createTestService,
  FindTestsByTagService,
} from "../services/testService.js";

export async function postTest(req: Request, res: Response) {
  const test = req.body;
  await createTestService(test);
  return res.sendStatus(201);
}
export async function getTestsByTag(req: Request, res: Response) {
  const { groupBy } = req.query;
  const tests = await FindTestsByTagService(groupBy as string);
  res.status(200).send(tests);
}
