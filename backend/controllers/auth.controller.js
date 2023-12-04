import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/errorHandler.js";

export const register = async (req, res, next) => {
  const {username, email, password, confirmPassword} = req.body

  if (password != confirmPassword) {
    return next(errorHandler(401, "Password not match"))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({username, email, password: hashedPassword})

  try {
    await newUser.save()
    res.status(201).json("User created succesfully!")
  } catch (error) {
    next(error)
  }
}