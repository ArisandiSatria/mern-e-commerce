import express from "express";
import { addProduct, getProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/all-products", getProduct);

export default router;
