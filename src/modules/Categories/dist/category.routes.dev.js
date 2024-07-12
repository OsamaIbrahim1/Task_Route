"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var categoryController = _interopRequireWildcard(require("./category.controller.js"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _validationMiddleware = _interopRequireDefault(require("../../middlewares/validation.middleware.js"));

var validators = _interopRequireWildcard(require("./category.validation.js"));

var _authMiddleware = require("../../middlewares/auth.middleware.js");

var _multerMiddleware = require("../../middlewares/multer.middleware.js");

var _allowedExtentions = require("../../utils/allowedExtentions.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/addCategory", (0, _authMiddleware.auth)(), (0, _validationMiddleware["default"])(validators.addCategorySchema), (0, _multerMiddleware.multerMiddleHost)({
  extensions: _allowedExtentions.allowedExtensions.images
}).single("image"), (0, _expressAsyncHandler["default"])(categoryController.addCategory));
router.put("/updateCategory/:categoryId", (0, _authMiddleware.auth)(), (0, _validationMiddleware["default"])(validators.updateCategorySchema), (0, _multerMiddleware.multerMiddleHost)({
  extensions: _allowedExtentions.allowedExtensions.images
}).single("image"), (0, _expressAsyncHandler["default"])(categoryController.updateCategory));
var _default = router;
exports["default"] = _default;