"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategorySchema = exports.addCategorySchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _generalValidationRule = require("../../utils/general.validation.rule.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addCategorySchema = {
  body: _joi["default"].object({
    name: _joi["default"].string().trim().min(3).max(20)
  }).required(),
  headers: _generalValidationRule.generalRules.headersRules
};
exports.addCategorySchema = addCategorySchema;
var updateCategorySchema = {
  body: _joi["default"].object({
    name: _joi["default"].string().trim(),
    oldPublicId: _generalValidationRule.generalRules.dbId
  }),
  params: _joi["default"].object({
    categoryId: _generalValidationRule.generalRules.dbId
  }),
  headers: _generalValidationRule.generalRules.headersRules
};
exports.updateCategorySchema = updateCategorySchema;