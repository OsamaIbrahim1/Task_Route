"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "userRouter", {
  enumerable: true,
  get: function get() {
    return _userRoutes["default"];
  }
});
Object.defineProperty(exports, "categoryRouter", {
  enumerable: true,
  get: function get() {
    return _categoryRoutes["default"];
  }
});

var _userRoutes = _interopRequireDefault(require("./Users/user.routes.js"));

var _categoryRoutes = _interopRequireDefault(require("./Categories/category.routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }