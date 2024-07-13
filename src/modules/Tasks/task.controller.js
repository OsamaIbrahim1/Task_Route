import Category from "../../../DB/models/Category.model.js";
import Task from "../../../DB/models/Task.model.js";
import { APIFeature } from "../../utils/api-features.js";

//=========================== add Task ===========================//
/**
 * * destructuring the request body
 * * destructuring the authUser
 * * check if category exists
 * * object task
 * * create a new task
 * * success response
 */
export const addTask = async (req, res, next) => {
  // * destructuring the request body
  const { name, description, listTasks, status, categoryId } = req.body;
  // * destructuring the authUser
  const { _id } = req.authUser;

  // * check if category exists
  const category = await Category.findOne({ _id: categoryId, addedBy: _id });
  if (!category) return next(new Error(`Category not found`, { cause: 404 }));

  // * object task
  const objTask = {
    name,
    description,
    listTasks,
    status,
    categoryId,
    addedBy: _id,
  };
  // * create a new task
  const task = await Task.create(objTask);
  if (!task) return next(new Error(`Task not created`, { cause: 404 }));

  if (description) {
    await Task.updateOne({ _id: task._id }, { $unset: { listTasks: "" } });
  }

  // * success response
  res.status(201).json({ message: "Task added successfully", task });
};

//=============================== delete Task ===============================//
/**
 * * destructuring the request params
 * * destructuring the authUser
 * * check if task exists and delete it
 * * success response
 */
export const deleteTask = async (req, res, next) => {
  // * destructuring the request params
  const { taskId } = req.params;
  // * destructuring the authUser
  const { _id } = req.authUser;

  // * check if task exists and delete it
  const task = await Task.findOneAndDelete({ _id: taskId, addedBy: _id });
  if (!task) return next(new Error(`Task not found`, { cause: 404 }));

  // * success response
  res.status(200).json({ message: "Task deleted successfully", task });
};

//=========================== update Task ==========================//
/**
 * * destructuring the request body
 * * destructuring the request params
 * * destructuring the authUser
 * * check if task exists
 * * if user want to update the name
 * * if user want to update the description
 * * if user want to update the status
 * * if user want to update the listTasks
 * * save the updated task
 * * success response
 */
export const updateTask = async (req, res, next) => {
  // * destructuring the request body
  const { name, description, listTasks, status } = req.body;
  // * destructuring the request params
  const { taskId } = req.params;
  // * destructuring the authUser
  const { _id } = req.authUser;

  // * check if task exists
  const task = await Task.findOne({ _id: taskId, addedBy: _id });
  if (!task) return next(new Error(`Task not found`, { cause: 404 }));

  // * if user want to update the name
  if (name) task.name = name;

  // * if user want to update the status
  if (status) task.status = status;

  // * if user want to update the description
  if (task.description) {
    if (description) task.description = description;
  }

  // * if user want to update the listTasks
  if (task.listTasks) {
    if (listTasks) task.listTasks = listTasks;
  }

  // * save the updated task
  task.save();

  // * success response
  res.status(200).json({ message: "Task updated successfully", task });
};

//================================= get All Category with pagination =================================//
/**
 * * destructure data from query
 * * find data and paginate it
 * * response successfully
 */
export const getAllCategoryWithPagination = async (req, res, next) => {
  //  * destructure data from query
  const { page, size, sort, ...search } = req.query;

  // * find data and paginate it
  const features = new APIFeature(req.query, Category.find())
    .pagination({
      page,
      size,
    })
    .sort(sort);

  const categories = await features.mongooseQuery;

  // * response successfully
  res
    .status(200)
    .json({ success: true, message: "get all categories", data: categories });
};

//=========================== get all Tasks with pagination ==========================//
/**
 * * destructuring the request query
 * * get all tasks
 * * success response
 */
export const getAllTasks = async (req, res, next) => {
  // * destructuring the request query
  const { page, size, sort, ...search } = req.query;

  // * get all tasks
  const features = new APIFeature(req.query, Task.find({ status: "shared" }))
    .pagination({
      page,
      size,
    })
    .sort(sort);

  const tasks = await features.mongooseQuery;

  // * success response
  res.status(200).json({ tasks });
};

//============================ get Task by ID =============================//
/**
 * * destructuring the request params
 * * get the task by id
 * * success response
 */
export const getTaskById = async (req, res, next) => {
  // * destructuring the request params
  const { taskId } = req.params;

  // * get the task by id
  const task = await Task.findOne({ _id: taskId, status: "shared" });
  if (task.length === 0) {
    return next(new Error(`Task not found`, { cause: 404 }));
  }

  // * success response
  res.status(200).json({ task });
};
