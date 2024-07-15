import { Router } from "express";
import * as controller from "./user.controller.js";
import expressAsyncHandler from "express-async-handler";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as validators from "./user.validation.js";
import { auth } from "../../middlewares/auth.middleware.js";

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
  "/deleteUser",
  auth(),
  validationMiddleware(validators.deleteUserSchema),
  expressAsyncHandler(controller.deleteUser)
);

router.put(
  "/updateUser",
  auth(),
  validationMiddleware(validators.updateProfileSchema),
  expressAsyncHandler(controller.updateProfile)
);

router.patch(
  "/changePassword",
  auth(),
  validationMiddleware(validators.changePasswordSchema),
  expressAsyncHandler(controller.changePassword)
);

export default router;
