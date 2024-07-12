import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../DB/models/User.model.js";

//============================= Sign In =============================//
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
  res.status(200).json({ message: "logged in successfully", data: { token } });
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
    res
      .status(200)
      .json({ success: true, message: "Successfully deleted", data: user });
  };