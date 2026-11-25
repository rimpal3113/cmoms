
import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new customer order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phone
 *               - tableNumber
 *               - items
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Rimpal
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               tableNumber:
 *                 type: integer
 *                 example: 5
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItem:
 *                       type: string
 *                       example: 674abc123456789012345678
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               specialInstructions:
 *                 type: string
 *                 example: Less sugar
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all customer orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Preparing, Ready, Completed, Cancelled]
 *                 example: Preparing
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.patch("/:id/status", updateOrderStatus);

export default router;
