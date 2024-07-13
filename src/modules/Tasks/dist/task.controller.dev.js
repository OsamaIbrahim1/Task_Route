"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTaskById = exports.getAllTasks = exports.getAllCategoryWithPagination = exports.updateTask = exports.deleteTask = exports.addTask = void 0;

var _CategoryModel = _interopRequireDefault(require("../../../DB/models/Category.model.js"));

var _TaskModel = _interopRequireDefault(require("../../../DB/models/Task.model.js"));

var _apiFeatures = require("../../utils/api-features.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//=========================== add Task ===========================//

/**
 * * destructuring the request body
 * * destructuring the authUser
 * * check if category exists
 * * object task
 * * create a new task
 * * success response
 */
var addTask = function addTask(req, res, next) {
  var _req$body, name, description, listTasks, status, categoryId, _id, category, objTask, task;

  return regeneratorRuntime.async(function addTask$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // * destructuring the request body
          _req$body = req.body, name = _req$body.name, description = _req$body.description, listTasks = _req$body.listTasks, status = _req$body.status, categoryId = _req$body.categoryId; // * destructuring the authUser

          _id = req.authUser._id; // * check if category exists

          _context.next = 4;
          return regeneratorRuntime.awrap(_CategoryModel["default"].findOne({
            _id: categoryId,
            addedBy: _id
          }));

        case 4:
          category = _context.sent;

          if (category) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", next(new Error("Category not found", {
            cause: 404
          })));

        case 7:
          // * object task
          objTask = {
            name: name,
            description: description,
            listTasks: listTasks,
            status: status,
            categoryId: categoryId,
            addedBy: _id
          }; // * create a new task

          _context.next = 10;
          return regeneratorRuntime.awrap(_TaskModel["default"].create(objTask));

        case 10:
          task = _context.sent;

          if (task) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", next(new Error("Task not created", {
            cause: 404
          })));

        case 13:
          if (!description) {
            _context.next = 16;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(_TaskModel["default"].updateOne({
            _id: task._id
          }, {
            $unset: {
              listTasks: ""
            }
          }));

        case 16:
          // * success response
          res.status(201).json({
            message: "Task added successfully",
            task: task
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
}; //=============================== delete Task ===============================//

/**
 * * destructuring the request params
 * * destructuring the authUser
 * * check if task exists and delete it
 * * success response
 */


exports.addTask = addTask;

var deleteTask = function deleteTask(req, res, next) {
  var taskId, _id, task;

  return regeneratorRuntime.async(function deleteTask$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // * destructuring the request params
          taskId = req.params.taskId; // * destructuring the authUser

          _id = req.authUser._id; // * check if task exists and delete it

          _context2.next = 4;
          return regeneratorRuntime.awrap(_TaskModel["default"].findOneAndDelete({
            _id: taskId,
            addedBy: _id
          }));

        case 4:
          task = _context2.sent;

          if (task) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next(new Error("Task not found", {
            cause: 404
          })));

        case 7:
          // * success response
          res.status(200).json({
            message: "Task deleted successfully",
            task: task
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //=========================== update Task ==========================//

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


exports.deleteTask = deleteTask;

var updateTask = function updateTask(req, res, next) {
  var _req$body2, name, description, listTasks, status, taskId, _id, task;

  return regeneratorRuntime.async(function updateTask$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // * destructuring the request body
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, listTasks = _req$body2.listTasks, status = _req$body2.status; // * destructuring the request params

          taskId = req.params.taskId; // * destructuring the authUser

          _id = req.authUser._id; // * check if task exists

          _context3.next = 5;
          return regeneratorRuntime.awrap(_TaskModel["default"].findOne({
            _id: taskId,
            addedBy: _id
          }));

        case 5:
          task = _context3.sent;

          if (task) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", next(new Error("Task not found", {
            cause: 404
          })));

        case 8:
          // * if user want to update the name
          if (name) task.name = name; // * if user want to update the status

          if (status) task.status = status; // * if user want to update the description

          if (task.description) {
            if (description) task.description = description;
          } // * if user want to update the listTasks


          if (task.listTasks) {
            if (listTasks) task.listTasks = listTasks;
          } // * save the updated task


          task.save(); // * success response

          res.status(200).json({
            message: "Task updated successfully",
            task: task
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //================================= get All Category with pagination =================================//

/**
 * * destructure data from query
 * * find data and paginate it
 * * response successfully
 */


exports.updateTask = updateTask;

var getAllCategoryWithPagination = function getAllCategoryWithPagination(req, res, next) {
  var _req$query, page, size, sort, search, features, categories;

  return regeneratorRuntime.async(function getAllCategoryWithPagination$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          //  * destructure data from query
          _req$query = req.query, page = _req$query.page, size = _req$query.size, sort = _req$query.sort, search = _objectWithoutProperties(_req$query, ["page", "size", "sort"]); // * find data and paginate it

          features = new _apiFeatures.APIFeature(req.query, _CategoryModel["default"].find()).pagination({
            page: page,
            size: size
          }).sort(sort);
          _context4.next = 4;
          return regeneratorRuntime.awrap(features.mongooseQuery);

        case 4:
          categories = _context4.sent;
          // * response successfully
          res.status(200).json({
            success: true,
            message: "get all categories",
            data: categories
          });

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //=========================== get all Tasks with pagination ==========================//

/**
 * * destructuring the request query
 * * get all tasks
 * * success response
 */


exports.getAllCategoryWithPagination = getAllCategoryWithPagination;

var getAllTasks = function getAllTasks(req, res, next) {
  var _req$query2, page, size, sort, search, features, tasks;

  return regeneratorRuntime.async(function getAllTasks$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // * destructuring the request query
          _req$query2 = req.query, page = _req$query2.page, size = _req$query2.size, sort = _req$query2.sort, search = _objectWithoutProperties(_req$query2, ["page", "size", "sort"]); // * get all tasks

          features = new _apiFeatures.APIFeature(req.query, _TaskModel["default"].find({
            status: "shared"
          })).pagination({
            page: page,
            size: size
          }).sort(sort);
          _context5.next = 4;
          return regeneratorRuntime.awrap(features.mongooseQuery);

        case 4:
          tasks = _context5.sent;
          // * success response
          res.status(200).json({
            tasks: tasks
          });

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //============================ get Task by ID =============================//

/**
 * * destructuring the request params
 * * get the task by id
 * * success response
 */


exports.getAllTasks = getAllTasks;

var getTaskById = function getTaskById(req, res, next) {
  var taskId, task;
  return regeneratorRuntime.async(function getTaskById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // * destructuring the request params
          taskId = req.params.taskId; // * get the task by id

          _context6.next = 3;
          return regeneratorRuntime.awrap(_TaskModel["default"].findOne({
            _id: taskId,
            status: "shared"
          }));

        case 3:
          task = _context6.sent;

          if (!(task.length === 0)) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", next(new Error("Task not found", {
            cause: 404
          })));

        case 6:
          // * success response
          res.status(200).json({
            task: task
          });

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.getTaskById = getTaskById;