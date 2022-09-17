import { Router } from "express";
import { getTestsByTag, postTest } from "../controllers/testController";
import { schemaValidator } from "../middlewares/schemaValidator";
import { tokenValidator } from "../middlewares/tokenValidator";
import testSchema from "../schemas/testSchema";
const testRouter = Router();

testRouter.post(
  "/tests",
  tokenValidator,
  schemaValidator(testSchema),
  postTest
);
testRouter.get("/tests", tokenValidator, getTestsByTag);
export default testRouter;
