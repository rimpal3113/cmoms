
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Cafe Ordering API",
      version: "1.0.0",
      description: "API documentation for Cafe Ordering Application",
    },

    servers: [
      {
        url: "https://cmoms-alpha.vercel.app",
        description: "Production Server",
      },
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Menu",
        description: "Cafe Menu Management APIs",
      },
      {
        name: "Orders",
        description: "Customer Order Management APIs",
      },
    ],
  },

  apis: [
    path.join(__dirname, "../routes/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
