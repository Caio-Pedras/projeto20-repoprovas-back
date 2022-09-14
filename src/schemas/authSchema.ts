import joi from "joi";

export const authSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export default authSchema;
