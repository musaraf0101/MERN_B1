import joi from "joi";

export const createBlogsValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
  });
  return schema.validate(data);
};
export const updateBlogsValidation = (data) => {
  const schema = joi.object({
    title: joi.string().optional(),
    description: joi.string().optional(),
  });
  return schema.validate(data);
};
