"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initiateApp = void 0;

var _db_Connection = _interopRequireDefault(require("../DB/db_Connection.js"));

var _globalResponseMiddleware = require("./middlewares/global-response.middleware.js");

var _rollbackSavedDocuments = require("./middlewares/rollback-saved-Documents.js");

var _rollbackUploadedFilesMiddleware = require("./middlewares/rollback-uploaded-files.middleware.js");

var routers = _interopRequireWildcard(require("./modules/index.routes.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initiateApp = function initiateApp(app, express) {
  var port = +process.env.PORT || 4000;
  app.use(express.json());
  app.use("/users", routers.userRouter);
  app.use("/categories", routers.categoryRouter);
  app.use("*", function (req, res, next) {
    res.status(404).json({
      message: "Not Found"
    });
  });
  app.use(_globalResponseMiddleware.globalResponse, _rollbackUploadedFilesMiddleware.rollbackUploadedFiles, _rollbackSavedDocuments.rollbackSavedDocuments);
  (0, _db_Connection["default"])();
  app.listen(port, function () {
    console.log("Server started on port ".concat(port));
  });
};

exports.initiateApp = initiateApp;