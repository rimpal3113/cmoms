
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cafe Ordering API is running successfully",
  });
});

// API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Swagger Documentation
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Export Express app for Vercel
export default app;

// Local development server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
  });
}
