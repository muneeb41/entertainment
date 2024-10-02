// swaggerOptions.js
module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Entertainment API",
      version: "1.0.0",
      description: "API for managing users, movie bookmarks, and TV shows",
    },
    servers: [
      {
        url: "http://localhost:8000", // Replace with your actual server URL
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Format for JWT token
          description: "Enter your JWT Bearer token in the format **Bearer {token}**",
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Apply Bearer authentication globally
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};
