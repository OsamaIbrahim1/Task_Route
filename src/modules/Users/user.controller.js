import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../DB/models/User.model.js";
import Task from "../../../DB/models/Task.model.js";
import Category from "../../../DB/models/Category.model.js";

//============================= Sign Up =============================//
/**
 * * destructuring the data from the request body
 * * check if email already exist
 * * hash the password
 * * User object
 * * create new user
 * * response success
 */
export const signUp = async (req, res, next) => {
  // * destructuring the data from the request body
  const { email, password, name } = req.body;

  // * check if email already exist
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    return next(
      new Error(`Email already exists, Please try another email`, {
        cause: 409,
      })
    );
  }

  // * hash the password
  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  if (!hashedPassword) {
    return next(new Error("Error in hashing the password", { cause: 500 }));
  }

  // * User object
  const user = {
    email,
    password: hashedPassword,
    name,
  };

  // * create new user
  const newUser = await User.create(user);

  req.savedDocuments = { model: User, _id: newUser._id };
  if (!newUser) return next(new Error(`user not created`, { cause: 404 }));

  // * response success
  res.status(200).json({
    success: true,
    message: "User created successfully",
    data: newUser,
  });
};

//============================= Sign In =============================//
/**
 * * destructure data from body
 * * check if email already exists
 * * check if password matched
 * * generate token for user
 * * response successfully
 */
export const login = async (req, res, next) => {
  // * destructure data from body
  const { email, password } = req.body;

  // * check if email already exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error(`Invalid login credentials`, { cause: 404 }));
  }

  // * check if password matched
  const passwordMatched = bcrypt.compareSync(password, user.password);
  if (!passwordMatched) {
    return next(
      new Error(`Password mismatch, Please try again`, { cause: 404 })
    );
  }

  // * generate token for user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_LOGIN, {
    expiresIn: process.env.JWT_EXPIRED_LOGIN,
  });

  // * save token
  user.token = token;
  await user.save();

  // * response successfully
  res.status(200).json({ message: "logged in successfully", token });
};

//============================= delete user =============================//
/**
 * * destructure the user data from request headers
 * * find the user and delete them from the database
 * * response successfully
 */
export const deleteUser = async (req, res, next) => {
  // * destructure the user data from request headers
  const { _id } = req.authUser;

  // * find the user and delete them from the database
  const user = await User.findByIdAndDelete(_id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  await Category.deleteMany({ addedBy: _id });

  await Task.deleteMany({ addedBy: _id });

  // * response successfully
  res
    .status(200)
    .json({ success: true, message: "Successfully deleted", data: user });
};

//========================= update user profile =========================//
/**
 * * destructure the user data from request body
 * * destructure the user data from request headers
 * * check if user is found
 * * check if user wants to update name
 * * check if user wants to update email
 * * save values
 * * success response
 */
export const updateProfile = async (req, res, next) => {
  // * destructure the user data from request body
  const { name, email } = req.body;
  // * destructure the user data from request headers
  const { _id } = req.authUser;

  // * check if user is found
  const user = await User.findById(_id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  // * check if user wants to update name
  if (name) {
    if (user.name === name) {
      return next(
        new Error("please enter different name from the existing one.", {
          cause: 404,
        })
      );
    }
    user.name = name;
  }

  // * check if user wants to update email
  if (email) {
    if (user.email === email) {
      return next(
        new Error("please enter different email from the existing one.", {
          cause: 404,
        })
      );
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return next(
        new Error("Email already exists, Please try another email", {
          cause: 409,
        })
      );
    }
    user.email = email;
  }

  // * save values
  await user.save();

  // * success response
  res.status(200).json({ message: "Successfully updated", data: user });
};

//========================= change password =========================//
/**
 * * destructure the user data from request body
 * * destructure the user data from request headers
 * * check if user is found
 * * check if password matched
 * * new password match with old password
 * * hash new password
 * * update password
 * * save values
 * * success response
 */
export const changePassword = async (req, res, next) => {
  // * destructure the user data from request body
  const { oldPassword, newPassword } = req.body;
  // * destructure the user data from request headers
  const { _id } = req.authUser;

  // * check if user is found
  const user = await User.findById(_id);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  // * check if password matched
  const passwordMatched = bcrypt.compareSync(oldPassword, user.password);
  if (!passwordMatched) {
    return next(
      new Error("Password mismatch, Please try again", { cause: 404 })
    );
  }

  // * new password match with old password
  if (oldPassword === newPassword) {
    return next(
      new Error("New password should be different from the old password", {
        cause: 404,
      })
    );
  }
  // * hash new password
  const hashedPassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS);
  if (!hashedPassword) {
    return next(new Error("Error in hashing the password", { cause: 500 }));
  }

  // * update password
  user.password = hashedPassword;

  // * save values
  await user.save();

  // * success response
  res
    .status(200)
    .json({ message: "Password changed successfully", data: user });
};
