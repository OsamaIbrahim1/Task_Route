"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var controller = _interopRequireWildcard(require("./user.controller.js"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _validationMiddleware = _interopRequireDefault(require("../../middlewares/validation.middleware.js"));

var validators = _interopRequireWildcard(require("./user.validation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/signUp", (0, _validationMiddleware["default"])(validators.signUpSchema), (0, _expressAsyncHandler["default"])(controller.signUp));
router.post("/signin", (0, _validationMiddleware["default"])(validators.signInSchema), (0, _expressAsyncHandler["default"])(controller.login));
router["delete"]("/delete", //   auth(endPointsRoles.ALL_USERS),
//   validationMiddleware(validators.deleteUserSchema),
(0, _expressAsyncHandler["default"])(controller.deleteUser));
var _default = router;
exports["default"] = _default;