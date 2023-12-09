import express from "express";
import { addProduct, getAllProducts } from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/add-product", verifyToken, verifyAdmin, addProduct);
router.get("/all-products", getAllProducts);

export default router;
