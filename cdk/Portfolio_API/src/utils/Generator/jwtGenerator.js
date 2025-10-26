import jwt from "jsonwebtoken";

const jwtGenerator = async (user) => {
  try {
    //user object as parameter
    const option = {
      id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(option, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });
    if (!token) {
      return res.status(201).json({
        success: true,
        message: "unable to generate JWT token",
      });
    }
    return token;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server internal error, Unable to generate JWT",
      error: error,
    });
  }
};

export { jwtGenerator };
