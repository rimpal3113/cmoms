
import swaggerJsdoc from "swagger-jsdoc";

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

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
