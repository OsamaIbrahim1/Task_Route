import slugify from "slugify";
import Category from "../../../DB/models/Category.model.js";
import { APIFeature } from "../../utils/api-features.js";
import Task from "../../../DB/models/Task.model.js";

//================================ add category ================================//
/**
 * * detructure the required data from request body and request headers
 * * check in name is duplicated
 * * generate the slug
 * * generate the category object
 * * create the category document
 * * response successfully created
 */
export const addCategory = async (req, res, next) => {
  // * destructuring the data from the request body and authUser
  const { name } = req.body;
  const { _id } = req.authUser;

  // * check in name is duplicated
  const isNameDuplicated = await Category.findOne({ name });
  if (isNameDuplicated)
    return next(new Error("name category is duplicated", { cause: 400 }));

  // * generate the slug
  const slug = slugify(name, "-");
  if (!slug) return next(new Error("slug not created", { cause: 400 }));

  // * generate the category object
  const category = {
    name,
    slug,
    addedBy: _id,
  };

  // * create the category document
  const categoryDocument = await Category.create(category);
  req.savedDocuments = { model: Category, _id: categoryDocument._id };

  // * response successfully created
  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: categoryDocument,
  });
};

//================================ update category ================================//
/**
 * * destructure name from the request body
 * * destructure category id from the request params
 * * destructure _id from the request authUser
 * * check if category exists
 * * check is user wants to update name category
 * * check if new name === old name
 * * check if new name not already existing
 * * update name and slug category
 * * set value for the updatedBy
 * * save values
 * * success response
 */
export const updateCategory = async (req, res, next) => {
  // * destructure name from the request body
  const { name } = req.body;
  // * destructure category id from the request params
  const { categoryId } = req.params;
  // * destructure _id from the request authUser
  const { _id } = req.authUser;

  // * check if category exists
  const category = await Category.findById(categoryId);
  if (!category) return next(new Error(`Category not found`, { cause: 404 }));

  if (_id.toString() !== category.addedBy.toString())
    return next(
      new Error(`You are not authorized to update this category`, {
        cause: 401,
      })
    );

  // * check is user wants to update name category
  if (name) {
    // * check if new name === old name
    if (category.name === name) {
      return next(
        new Error(`please enter different name from the existing one.`, {
          cause: 404,
        })
      );
    }

    // * check if new name not already existing
    const isNameDuplicated = await Category.findOne({ name });
    if (isNameDuplicated) {
      return next(new Error(`please enter different name.`, { cause: 400 }));
    }

    // * update name and slug category
    category.name = name;
    category.slug = slugify(name, "-");
  }

  // * save values
  await category.save();

  // * success response
  res
    .status(200)
    .json({ success: true, message: "Successfully updated", category });
};

//==================================== delete category ================================//
/**
 * * destructuring the data from the request body and authUser
 * * check if category exists and delete it
 * * success response
 */
export const deleteCategory = async (req, res, next) => {
  // * destructuring the data from the request body and authUser
  const { _id } = req.authUser;
  const { categoryId } = req.params;

  // * check if category exists and delete it
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    addedBy: _id,
  });
  if (!category) {
    return next(new Error(`Category not found`, { cause: 404 }));
  }

  await Task.deleteMany({ categoryId });

  // * success response
  res.status(200).json({ message: "Category deleted successfully", category });
};

// ===================================== get all categories With Pagination And Sort By Category Name ================================//
/**
 * * get all categories
 * * get all categories
 * * success response
 */
export const getAllCategories= async (req, res, next) => {
  // * destructuring data from query
  const { page, size, sort, ...search } = req.query;

  // * get all categories
  const features = new APIFeature(req.query, Category.find())
    .pagination({
      page,
      size,
    })
    .sort(sort);

  const categories = await features.mongooseQuery;

  // * success response
  res.status(200).json({ success: true, data: categories });
};
