"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.addCategory = void 0;

var _slugify = _interopRequireDefault(require("slugify"));

var _CategoryModel = _interopRequireDefault(require("../../../DB/models/Category.model.js"));

var _cloudinary = _interopRequireDefault(require("../../utils/cloudinary.js"));

var _generateUniqueString = _interopRequireDefault(require("../../utils/generate-Unique-String.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//================================ add category ================================//

/**
 * * detructure the required data from request body and request headers
 * * check in name is duplicated
 * * generate the slug
 * * upload image category
 * * generate the category object
 * * create the category document
 * * response successfully created
 */
var addCategory = function addCategory(req, res, next) {
  var name, _id, isNameDuplicated, slug, folderId, _ref, secure_url, public_id, category, categoryDocument;

  return regeneratorRuntime.async(function addCategory$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // * destructuring the data from the request body and authUser
          name = req.body.name;
          _id = req.authUser._id; // * check in name is duplicated

          _context.next = 4;
          return regeneratorRuntime.awrap(_CategoryModel["default"].findOne({
            name: name
          }));

        case 4:
          isNameDuplicated = _context.sent;

          if (!isNameDuplicated) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", next(new Error("name category is duplicated", {
            cause: 400
          })));

        case 7:
          // * generate the slug
          slug = (0, _slugify["default"])(name, "-");

          if (slug) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", next(new Error("slug not created", {
            cause: 400
          })));

        case 10:
          if (req.file) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", next({
            cause: 400,
            message: "Image is required"
          }));

        case 12:
          folderId = (0, _generateUniqueString["default"])(4);
          _context.next = 15;
          return regeneratorRuntime.awrap((0, _cloudinary["default"])().uploader.upload(req.file.path, {
            folder: "".concat(process.env.MAIN_FOLDER, "/Categories/").concat(folderId)
          }));

        case 15:
          _ref = _context.sent;
          secure_url = _ref.secure_url;
          public_id = _ref.public_id;
          // * rollback if event any error
          req.folder = "".concat(process.env.MAIN_FOLDER, "/Categories/").concat(folderId); // * generate the category object

          category = {
            name: name,
            slug: slug,
            Image: {
              secure_url: secure_url,
              public_id: public_id
            },
            folderId: folderId,
            addedBy: _id
          }; // * create the category document

          _context.next = 22;
          return regeneratorRuntime.awrap(_CategoryModel["default"].create(category));

        case 22:
          categoryDocument = _context.sent;
          req.savedDocuments = {
            model: _CategoryModel["default"],
            _id: categoryDocument._id
          }; // * response successfully created

          res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: categoryDocument
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  });
}; //================================ update category ================================//

/**
 * * destructure name and oldPublicId from the request body
 * * destructure category id from the request params
 * * destructure _id from the request authUser
 * * check if category exists
 * * check is user wants to update name category
 * * check if new name === old name
 * * check if new name not already existing
 * * update name and slug category
 * * check if user wants to update image
 * * update image and use same public id  and folder id
 * * set value for the updatedBy
 * * save values
 * * success response
 */


exports.addCategory = addCategory;

var updateCategory = function updateCategory(req, res, next) {
  var _req$body, name, oldPublicId, categoryId, _id, category, isNameDuplicated, newPublicId, _ref2, secure_url, public_id;

  return regeneratorRuntime.async(function updateCategory$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // * destructure name and oldPublicId from the request body
          _req$body = req.body, name = _req$body.name, oldPublicId = _req$body.oldPublicId; // * destructure category id from the request params

          categoryId = req.params.categoryId; // * destructure _id from the request authUser

          _id = req.authUser._id; // * check if category exists

          _context2.next = 5;
          return regeneratorRuntime.awrap(_CategoryModel["default"].findById(categoryId));

        case 5:
          category = _context2.sent;

          if (category) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", next(new Error("Category not found", {
            cause: 404
          })));

        case 8:
          if (!(_id.toString() !== category.addedBy.toString())) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", next(new Error("You are not authorized to update this category", {
            cause: 401
          })));

        case 10:
          if (!name) {
            _context2.next = 20;
            break;
          }

          if (!(category.name === name)) {
            _context2.next = 13;
            break;
          }

          return _context2.abrupt("return", next(new Error("please enter different name from the existing one.", {
            cause: 404
          })));

        case 13:
          _context2.next = 15;
          return regeneratorRuntime.awrap(_CategoryModel["default"].findOne({
            name: name
          }));

        case 15:
          isNameDuplicated = _context2.sent;

          if (!isNameDuplicated) {
            _context2.next = 18;
            break;
          }

          return _context2.abrupt("return", next(new Error("please enter different name.", {
            cause: 400
          })));

        case 18:
          // * update name and slug category
          category.name = name;
          category.slug = (0, _slugify["default"])(name, "-");

        case 20:
          if (!oldPublicId) {
            _context2.next = 30;
            break;
          }

          if (req.file) {
            _context2.next = 23;
            break;
          }

          return _context2.abrupt("return", next(new Error("please enter new image", {
            cause: 400
          })));

        case 23:
          newPublicId = oldPublicId.split("".concat(category.folderId, "/"))[1]; // * update image and use same public id  and folder id

          _context2.next = 26;
          return regeneratorRuntime.awrap((0, _cloudinary["default"])().uploader.upload(req.file.path, {
            folder: "".concat(process.env.MAIN_FOLDER, "/Categories/").concat(category.folderId),
            public_id: newPublicId
          }));

        case 26:
          _ref2 = _context2.sent;
          secure_url = _ref2.secure_url;
          public_id = _ref2.public_id;
          category.Image.secure_url = secure_url;

        case 30:
          // * set value for the updatedBy
          category.updatedBy = _id; // * save values

          _context2.next = 33;
          return regeneratorRuntime.awrap(category.save());

        case 33:
          // * success response
          res.status(200).json({
            success: true,
            message: "Successfully updated",
            category: category
          });

        case 34:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.updateCategory = updateCategory;