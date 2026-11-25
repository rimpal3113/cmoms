
import express from "express";

import {
  addMenu,
  getMenus,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

const router = express.Router();
/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add new menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cold Coffee
 *               category:
 *                 type: string
 *                 example: Coffee
 *               description:
 *                 type: string
 *                 example: Chilled creamy coffee
 *               price:
 *                 type: number
 *                 example: 150
 *               image:
 *                 type: string
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Menu item added successfully
 */
router.post("/", addMenu);

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully
 */
router.get("/", getMenus);

/**
 * @swagger
 * /api/menu/{id}:
 *   put:
 *     summary: Update menu item
 *     tags: [Menu]
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 */
router.put("/:id", updateMenu);

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 */

// Delete Menu
router.delete("/:id", deleteMenu);




export default router;




