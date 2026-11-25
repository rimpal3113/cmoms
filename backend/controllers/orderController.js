
import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

// 1. Place New Order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      tableNumber,
      items,
      specialInstructions,
    } = req.body;

    // Validate required fields
    if (!customerName || !phone || !tableNumber || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details",
      });
    }

    // Verify menu items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
        console.log("Received Menu ID:", item.menuItem);
      const menuItem = await Menu.findById(item.menuItem);

      if (!menuItem || !menuItem.available) {
        return res.status(400).json({
          success: false,
          message: "Menu item not found or unavailable",
          itemId: item.menuItem,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid item quantity",
        });
      }

      const itemTotal = menuItem.price * quantity;

      totalAmount += itemTotal;

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        quantity,
        price: menuItem.price,
      });
    }

    // Save Order
    const order = await Order.create({
      customerName,
      phone,
      tableNumber,
      items: orderItems,
      totalAmount,
      specialInstructions,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 2. Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 3. Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// 4. Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
