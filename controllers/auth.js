const { validationResult } = require("express-validator");
const User = require("../model/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const name = req.body.name;
  const email = req.body.email;
  let password = req.body.password.toString();

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      const error = new Error("Email already Exist!");
      error.statusCode = 409;
      return next(error);
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPw,
    });
    console.log(user);

    user.save();
    return res.status(201).json({ message: "User Created " });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: "Saving user failed." });
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A User With This Email Could Not Found");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password.toString(), user.password.toString());
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    return res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
