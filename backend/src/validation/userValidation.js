import joi from "joi";

export const registerUserValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(data);
};
export const loginUserValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(data);
};
