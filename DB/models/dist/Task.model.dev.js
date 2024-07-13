"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import mongoose from "mongoose";
// const taskSchema = new mongoose.Schema({
//   nameTask: {
//     type: String,
//     required: [true, "Task name must be entered"],
//     minLength: [3, "Task name is too short"],
//     maxlength: [20, "Task name is too long"],
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: [true, "Task description is required"],
//     minLength: [20, "Task description is too short"],
//     maxlength: [100, "Task description is too long"],
//   },
//   state: {
//     type: String,
//     required: [true, "State must be entered"],
//     enum: ["shared", "private"],
//     default: "shared",
//   },
//   addedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   listId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "List",
//   },
//   categoryId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   },
// });
// export default mongoose.models.Task || mongoose.model("Task", taskSchema);
var taskSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, "Task name must be entered"],
    minLength: [3, "Task name is too short"],
    maxlength: [20, "Task name is too long"],
    trim: true
  },
  status: {
    type: String,
    required: [true, "Task status must be entered"],
    "enum": ["shared", "private"],
    "default": "shared"
  },
  addedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  categoryId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  description: {
    type: String,
    minLength: [20, "Task description is too short"],
    maxlength: [100, "Task description is too long"]
  },
  listTasks: [{
    name: {
      type: String,
      required: [true, "Task name must be entered"],
      minLength: [3, "Task name is too short"],
      maxlength: [20, "Task name is too long"],
      trim: true
    },
    status: {
      type: String,
      required: [true, "Task status must be entered"],
      "enum": ["shared", "private"],
      "default": "shared"
    },
    categoryId: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    description: {
      type: String,
      minLength: [20, "Task description is too short"],
      maxlength: [100, "Task description is too long"]
    }
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].models.Task || _mongoose["default"].model("Task", taskSchema);

exports["default"] = _default;