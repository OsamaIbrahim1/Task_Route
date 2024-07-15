import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name must be entered"],
      minLength: [3, "Task name is too short"],
      maxlength: [20, "Task name is too long"],
      trim: true,
    },
    status: {
      type: String,
      required: [true, "Task status must be entered"],
      enum: ["shared", "private"],
      default: "shared",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      minLength: [20, "Task description is too short"],
      maxlength: [100, "Task description is too long"],
    },
    listTasks: [
      {
          name: {
          type: String,
          required: [true, "Task name must be entered"],
          minLength: [3, "Task name is too short"],
          maxlength: [20, "Task name is too long"],
          trim: true,
        },
        status: {
          type: String,
          required: [true, "Task status must be entered"],
          enum: ["shared", "private"],
          default: "shared",
        },
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        description: {
          type: String,
          minLength: [20, "Task description is too short"],
          maxlength: [100, "Task description is too long"],
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", taskSchema);
