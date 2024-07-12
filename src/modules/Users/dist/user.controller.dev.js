"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.login = exports.signUp = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserModel = _interopRequireDefault(require("../../../DB/models/User.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//============================= Sign In =============================//

/**
 * * destructuring the data from the request body
 * * check if email already exist
 * * hash the password
 * * User object
 * * create new user
 * * response success
 */
var signUp = function signUp(req, res, next) {
  var _req$body, email, password, name, isEmailExist, hashedPassword, user, newUser;

  return regeneratorRuntime.async(function signUp$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // * destructuring the data from the request body
          _req$body = req.body, email = _req$body.email, password = _req$body.password, name = _req$body.name; // * check if email already exist

          _context.next = 3;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            email: email
          }));

        case 3:
          isEmailExist = _context.sent;

          if (!isEmailExist) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", next(new Error("Email already exists, Please try another email", {
            cause: 409
          })));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_bcryptjs["default"].hash(password, +process.env.SALT_ROUNDS));

        case 8:
          hashedPassword = _context.sent;

          if (hashedPassword) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", next(new Error("Error in hashing the password", {
            cause: 500
          })));

        case 11:
          // * User object
          user = {
            email: email,
            password: hashedPassword,
            name: name
          }; // * create new user

          _context.next = 14;
          return regeneratorRuntime.awrap(_UserModel["default"].create(user));

        case 14:
          newUser = _context.sent;
          req.savedDocuments = {
            model: _UserModel["default"],
            _id: newUser._id
          };

          if (newUser) {
            _context.next = 18;
            break;
          }

          return _context.abrupt("return", next(new Error("user not created", {
            cause: 404
          })));

        case 18:
          // * response success
          res.status(200).json({
            success: true,
            message: "User created successfully",
            data: newUser
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}; //============================= Sign In =============================//

/**
 * * destructure data from body
 * * check if email already exists
 * * check if password matched
 * * generate token for user
 * * response successfully
 */


exports.signUp = signUp;

var login = function login(req, res, next) {
  var _req$body2, email, password, user, passwordMatched, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // * destructure data from body
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // * check if email already exists

          _context2.next = 3;
          return regeneratorRuntime.awrap(_UserModel["default"].findOne({
            email: email
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new Error("Invalid login credentials", {
            cause: 404
          })));

        case 6:
          // * check if password matched
          passwordMatched = _bcryptjs["default"].compareSync(password, user.password);

          if (passwordMatched) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", next(new Error("Password mismatch, Please try again", {
            cause: 404
          })));

        case 9:
          // * generate token for user
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, process.env.JWT_SECRET_LOGIN, {
            expiresIn: process.env.JWT_EXPIRED_LOGIN
          }); // * save token

          user.token = token;
          _context2.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          // * response successfully
          res.status(200).json({
            message: "logged in successfully",
            data: {
              token: token
            }
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //============================= delete user =============================//

/**
 * * destructure the user data from request headers
 * * find the user and delete them from the database
 * * response successfully
 */


exports.login = login;

var deleteUser = function deleteUser(req, res, next) {
  var _id, user;

  return regeneratorRuntime.async(function deleteUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // * destructure the user data from request headers
          _id = req.authUser._id; // * find the user and delete them from the database

          _context3.next = 3;
          return regeneratorRuntime.awrap(_UserModel["default"].findByIdAndDelete(_id));

        case 3:
          user = _context3.sent;

          if (user) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new Error("User not found", {
            cause: 404
          })));

        case 6:
          // * delete subCategories and Brands
          // const categories = await Category.find({ addedBy: _id });
          // for (const category of categories) {
          //   await SubCategories.deleteMany({ categoryId: category._id });
          //   await Brand.deleteMany({ categoryId: category._id });
          // }
          // * delete the category's user deleted
          // const deleteCategory = await Category.deleteMany({ addedBy: _id });
          // if (!deleteCategory) {
          //   return next(new Error("Category not deleted", { cause: 409 }));
          // }
          // * response successfully
          res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: user
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.deleteUser = deleteUser;