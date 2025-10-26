const { getAllProducts } = require("../services/productCollectionService");

const handleProductCollectionRoutes = async (httpMethod, path, body) => {
  try {
    if (httpMethod === "GET" && path === "/product-collection") {
      return await getAllProducts();
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Route not found" }),
    };
  } catch (error) {
    console.error("Error handling product collection route", {
      error: error.message,
      stack: error.stack,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
    };
  }
};

module.exports = { handleProductCollectionRoutes };
