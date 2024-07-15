import Joi from "joi";
import { generalRules } from "../../utils/general.validation.rule.js";

export const signUpSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(3).max(20),
    email: Joi.string()
      .email()
      .pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
    password: Joi.string().pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  }).required(),
};

export const signInSchema = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
    password: Joi.string().pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  }).required(),
};

export const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(3).max(20),
    email: Joi.string()
      .email()
      .pattern(/[A-Za-z0-9]{3,50}@(gmail|yahoo).com$/),
  }),
  headers: generalRules.headersRules,
};

export const deleteUserSchema = {
  headers: generalRules.headersRules,
};

export const changePasswordSchema = {
  body: Joi.object({
    oldPassword: Joi.string().pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
    newPassword: Joi.string().pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  }).required(),
  headers: generalRules.headersRules,
};
