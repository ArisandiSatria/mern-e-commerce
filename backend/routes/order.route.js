import express from 'express'
import { verifyToken } from '../utils/verifyToken'
import { verifyAdmin } from '../utils/verifyAdmin'
import { addOrder, editOrder, getOrder, getOrders } from '../controllers/order.controller'

const router = express.Router()

router.post('/add-order', verifyToken, addOrder)
router.post('/edit-order', verifyToken, editOrder)
router.get('/get-orders', verifyToken, verifyAdmin, getOrders)
router.get('/get-order/:id', verifyToken, verifyAdmin, getOrder)

export default router