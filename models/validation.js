const joi = require("joi");

const userSchema = joi.object({
  name: joi.string()
    .alphanum().min(3).max(30)
    .required()
    .messages({
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must be at most 30 characters long.",
      "string.empty": "Name can't be empty.",
      "any.required": "A name is required.",
    }),
  email: joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{4,8}$'))
    .messages({
      "string.pattern.base": "Password must contain majuscules, minuscules and digits"
    }),
})

// const name = "hello";
// const email = "hello@mail.com";
// const password = "ABCxyz12";

// const { error } = userSchema.validate({ name, email, password });

// console.log(error);


module.exports = { userSchema };
