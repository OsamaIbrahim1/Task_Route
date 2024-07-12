"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserModel = _interopRequireDefault(require("../../DB/models/User.model.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = function auth() {
  return function _callee(req, res, next) {
    var accesstoken, token, decodedData, findUser, _findUser, userToken;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            accesstoken = req.headers.accesstoken;

            if (accesstoken) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next(new Error("please login first", {
              cause: 400
            })));

          case 4:
            if (accesstoken.startsWith(process.env.TOKEN_PREFIX)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", next(new Error("invalid token prefix", {
              cause: 400
            })));

          case 6:
            token = accesstoken.split(process.env.TOKEN_PREFIX)[1];
            _context.prev = 7;
            decodedData = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_LOGIN);

            if (!(!decodedData || !decodedData.id)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", next(new Error("invalid token payload", {
              cause: 400
            })));

          case 11:
            _context.next = 13;
            return regeneratorRuntime.awrap(_UserModel["default"].findById(decodedData.id, "name email"));

          case 13:
            findUser = _context.sent;

            if (findUser) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", next(new Error("please SignUp first", {
              cause: 404
            })));

          case 16:
            //authorization
            // if (!accessRole.includes(findUser.role))
            //   return next(new Error(`unauthorized`, { cause: 401 }));
            req.authUser = findUser;
            next();
            _context.next = 33;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](7);

            if (!(_context.t0 == "TokenExpiredError: jwt expired")) {
              _context.next = 33;
              break;
            }

            _context.next = 25;
            return regeneratorRuntime.awrap(_UserModel["default"].findOne({
              token: token
            }));

          case 25:
            _findUser = _context.sent;

            if (_findUser) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", next("wrong token", {
              cause: 400
            }));

          case 28:
            userToken = _jsonwebtoken["default"].sign({
              id: _findUser._id,
              isloggedIn: true
            }, process.env.JWT_SECRET_LOGIN, {
              expiresIn: "1m"
            }); // * update islogged in = true

            _findUser.token = userToken;
            _context.next = 32;
            return regeneratorRuntime.awrap(_findUser.save());

          case 32:
            res.status(200).json({
              message: "refershed token",
              userToken: userToken
            });

          case 33:
            _context.next = 38;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](0);
            next(new Error("catch error in auth middleware", {
              cause: 500
            }));

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 35], [7, 20]]);
  };
};

exports.auth = auth;