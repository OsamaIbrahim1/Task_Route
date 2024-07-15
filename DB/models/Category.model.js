import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name must be entered"],
      minLength: [3, "name is too short"],
      maxlength: [20, "name is too long"],
      trim: true,
    },
    slug: { type: String, required: true, unique: true, trim: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
