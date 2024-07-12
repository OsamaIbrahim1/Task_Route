"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerMiddleHost = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _allowedExtentions = require("../utils/allowedExtentions.js");

var _generateUniqueString = _interopRequireDefault(require("../utils/generate-Unique-String.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var multerMiddleHost = function multerMiddleHost(_ref) {
  var _ref$extensions = _ref.extensions,
      extensions = _ref$extensions === void 0 ? _allowedExtentions.allowedExtensions.images : _ref$extensions;

  // diskStorage
  var storage = _multer["default"].diskStorage({
    filename: function filename(req, file, cb) {
      var uniqueFilename = (0, _generateUniqueString["default"])(5) + "_" + file.originalname;
      cb(null, uniqueFilename);
    }
  }); // fileFilters


  var fileFilters = function fileFilters(req, file, cb) {
    if (extensions.includes(file.mimetype.splite("/")[1])) {
      return cb(null, true);
    }

    cb(new Error("Image format is not allowed!", false));
  };

  var file = (0, _multer["default"])({
    fileFilters: fileFilters,
    storage: storage
  });
  return file;
};

exports.multerMiddleHost = multerMiddleHost;