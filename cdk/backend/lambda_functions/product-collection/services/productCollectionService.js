const mongoose = require("mongoose");

const ProductCollection = require("/opt/nodejs/models/productCollection.model.js");
const { buildResponse } = require("/opt/nodejs/config/buildResponse.js");

const getAllProducts = async () => {
  try {
    // Fetch all products
    const products = await ProductCollection.find({}).lean();

    console.log("Products retrieved successfully", {
      total: products.length,
    });

    return buildResponse(200, {
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error retrieving products", {
      error: error.message,
      stack: error.stack,
    });

    return buildResponse(500, {
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
};
