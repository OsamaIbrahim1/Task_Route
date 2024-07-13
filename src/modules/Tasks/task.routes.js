import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as controller from "./task.controller.js";
import { auth } from "../../middlewares/auth.middleware.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as validators from "./task.validation.js";

const router = Router();

router.post(
  "/addTask",
  auth(),
  validationMiddleware(validators.addTaskSchema),
  expressAsyncHandler(controller.addTask)
);

router.delete(
  "/deleteTask/:taskId",
  auth(),
  validationMiddleware(validators.deleteTaskSchema),
  expressAsyncHandler(controller.deleteTask)
);
router.put(
  "/updateTask/:taskId",
  auth(),
  validationMiddleware(validators.updateTaskSchema),
  expressAsyncHandler(controller.updateTask)
);

router.get("/getAllTasks", expressAsyncHandler(controller.getAllTasks));

router.get(
  "/getTaskById/:taskId",
  validationMiddleware(validators.getTaskByIdSchema),
  expressAsyncHandler(controller.getTaskById)
);

export default router;
