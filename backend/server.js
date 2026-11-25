
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
app.use(cors({
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Menu Routes
app.use("/api/menu", menuRoutes);
// Order Routes
app.use("/api/orders", orderRoutes);
// Swagger Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);
// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cafe Ordering API is running successfully",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
