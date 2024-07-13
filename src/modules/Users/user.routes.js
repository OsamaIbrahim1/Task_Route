import { Router } from "express";
import * as controller from "./user.controller.js";
import expressAsyncHandler from "express-async-handler";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as validators from "./user.validation.js";

const router = Router();

router.post(
  "/signUp",
  validationMiddleware(validators.signUpSchema),
  expressAsyncHandler(controller.signUp)
);

router.post(
  "/signin",
  validationMiddleware(validators.signInSchema),
  expressAsyncHandler(controller.login)
);

router.delete(
  "/delete",
  //   auth(endPointsRoles.ALL_USERS),
  //   validationMiddleware(validators.deleteUserSchema),
  expressAsyncHandler(controller.deleteUser)
);

export default router;
