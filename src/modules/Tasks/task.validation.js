import Joi from "joi";
import { generalRules } from "../../utils/general.validation.rule.js";

const taskSchema = Joi.object({
  name: Joi.string().trim().min(3).max(20).required(),
  status: Joi.string().valid("shared", "private").default("shared").required(),
  categoryId: generalRules.dbId,
  description: Joi.string().min(20).max(100).required(),
});

export const addTaskSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(3).max(20).required(),
    status: Joi.string().valid("shared", "private"),
    categoryId: generalRules.dbId,
    description: Joi.string().min(20).max(100),
    listTasks: Joi.array().items(taskSchema),
  }),
  headers: generalRules.headersRules,
};

export const deleteTaskSchema = {
  params: Joi.object({
    taskId: generalRules.dbId,
  }),
  headers: generalRules.headersRules,
};

export const updateTaskSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(3).max(20),
    status: Joi.string().valid("shared", "private"),
    description: Joi.string().min(20).max(100),
    listTasks: Joi.array().items(taskSchema),
  }),
  params: Joi.object({
    taskId: generalRules.dbId,
  }),
  headers: generalRules.headersRules,
};

export const getTaskByIdSchema = {
  params: Joi.object({
    taskId: generalRules.dbId,
  }),
};
