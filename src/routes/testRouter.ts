import { Router } from "express";
import { postTest } from "../controllers/testController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import testSchema from "../schemas/testSchema.js";
const testRouter = Router();

testRouter.post("/tests", schemaValidator(testSchema), postTest);

export default testRouter;
