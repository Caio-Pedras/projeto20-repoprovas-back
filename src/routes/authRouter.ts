import { Router } from "express";
// import { postSignin, postSignup } from "../controllers/authController.js";
// import { schemaValidator } from "../middlewares/validateSchema.js";
// import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

// authRouter.post("/signup", schemaValidator(authSchema), postSignup);
// authRouter.post("/signin", schemaValidator(authSchema), postSignin);

export default authRouter;
