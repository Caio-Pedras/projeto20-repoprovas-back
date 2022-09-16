import { Router } from "express";
import { getTestsByTag, postTest } from "../controllers/testController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { tokenValidator } from "../middlewares/tokenValidator.js";
import testSchema from "../schemas/testSchema.js";
const testRouter = Router();

testRouter.post(
  "/tests",
  tokenValidator,
  schemaValidator(testSchema),
  postTest
);
testRouter.get("/tests", tokenValidator, getTestsByTag);
export default testRouter;
