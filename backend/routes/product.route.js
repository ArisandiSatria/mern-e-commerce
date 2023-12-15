import express from "express";
import { addProduct, getAllProducts, deleteProduct, editProduct, getProductDetail } from "../controllers/product.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/add-product", verifyToken, verifyAdmin, addProduct);
router.post("/edit-product/:id", verifyToken, verifyAdmin, editProduct);
router.delete("/delete-product/:id", verifyToken, verifyAdmin, deleteProduct);
router.get("/all-products", getAllProducts);
router.get("/product-detail/:id", getProductDetail);

export default router;
