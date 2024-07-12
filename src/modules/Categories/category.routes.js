import { Router } from "express";
import * as categoryController from "./category.controller.js";
import expressAsyncHandler from "express-async-handler";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import * as validators from "./category.validation.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js";
import { allowedExtensions } from "../../utils/allowedExtentions.js";

const router = Router();

router.post(
  "/addCategory",
  auth(),
  validationMiddleware(validators.addCategorySchema),
  multerMiddleHost({ extensions: allowedExtensions.images }).single("image"),
  expressAsyncHandler(categoryController.addCategory)
);

router.put(
  "/updateCategory/:categoryId",
  auth(),
  validationMiddleware(validators.updateCategorySchema),
  multerMiddleHost({ extensions: allowedExtensions.images }).single("image"),
  expressAsyncHandler(categoryController.updateCategory)
);

export default router;
