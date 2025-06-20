import  Joi  from "joi";

export const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
    role: Joi.string().valid("user", "admin").default("user"),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};

export const logInValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  next();
};
