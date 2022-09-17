import { Router } from "express";
import { postSignin, postSignup } from "../controllers/authController";
import { schemaValidator } from "../middlewares/schemaValidator";
import authSchema from "../schemas/authSchema";
import signupSchema from "../schemas/signupSchema";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(signupSchema), postSignup);
authRouter.post("/signin", schemaValidator(authSchema), postSignin);

export default authRouter;
