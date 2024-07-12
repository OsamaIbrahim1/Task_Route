"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name must be entered"],
    minLength: [3, "name is too short"],
    maxlength: [20, "name is too long"],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Image: {
    secure_url: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true,
      unique: true
    }
  },
  folderId: {
    type: String,
    required: true,
    unique: true
  },
  addedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  updatedBy: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].models.Category || _mongoose["default"].model("Category", categorySchema);

exports["default"] = _default;