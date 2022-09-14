import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref("password"),
});

export default signupSchema;
