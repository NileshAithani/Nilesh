const {
  handleProductCollectionRoutes,
} = require("./routes/productCollectionRoutes");
const connectDB = require("/opt/nodejs/db/mongoConnection.js");

exports.handler = async (event) => {
  await connectDB();

  try {
    const httpMethod = event.httpMethod;
    const path = event.path;

    console.log(`Received request: ${httpMethod} ${path}`);

    return await handleProductCollectionRoutes(httpMethod, path, event.body);
  } catch (error) {
    console.error("Error handling request:", {
      error: error.message,
      stack: error.stack,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
