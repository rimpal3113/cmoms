
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import swaggerSpec from "./swagger/swagger.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Cafe Ordering API is running successfully",
  });
});

// Swagger JSON
app.get("/api/docs.json", (req, res) => {
  res.json(swaggerSpec);
});

// Swagger UI
app.get("/api/docs", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Cafe Ordering API Documentation</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
        />
      </head>

      <body>
        <div id="swagger-ui"></div>

        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>

        <script>
          SwaggerUIBundle({
            url: "/api/docs.json",
            dom_id: "#swagger-ui"
          });
        </script>
      </body>
    </html>
  `);
});

// MongoDB Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

// Menu Routes
app.use("/api/menu", menuRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Export app for Vercel
export default app;

// Local Development Server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API URL: http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/api/docs`);
  });
}
