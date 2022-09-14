import { Router } from "express";
import { postSignin, postSignup } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import authSchema from "../schemas/authSchema.js";
import signupSchema from "../schemas/signupSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(signupSchema), postSignup);
authRouter.post("/signin", schemaValidator(authSchema), postSignin);

export default authRouter;
