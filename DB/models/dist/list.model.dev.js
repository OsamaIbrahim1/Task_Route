// import mongoose from "mongoose";
// const listSchema = new mongoose.Schema(
//   {
//     listName: {
//       type: String,
//       required: [true, "List name must be entered"],
//       minLength: [3, "List name is too short"],
//       maxlength: [20, "List name is too long"],
//       trim: true,
//     },
//     tasks: [],
//     addedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "AddedBy is required"],
//     },
//     categoryId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: [true, "Category is required"],
//     },
//   },
//   { timestamps: true }
// );
// export default mongoose.models.List || mongoose.model("List", listSchema);
"use strict";