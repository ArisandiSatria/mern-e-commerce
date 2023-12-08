import Product from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({});
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
