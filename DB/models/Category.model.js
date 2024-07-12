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
    Image: {
      secure_url: { type: String, required: true },

      public_id: { type: String, required: true, unique: true },
    },
    folderId: { type: String, required: true, unique: true },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
