import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { apiResponseHandler } from "../utils/apiResponseHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    //get user data from frontend
    const { username, email, password } = req.body;

    //validation non-empty
    if ([username, email, password].some((field) => field?.trim === "")) {
      const payload = apiResponseHandler("Failed", "All field are required");
      return res.status(400).json({
        data: payload,
      });
    }

    // if (password != confirmPassword) {
    //   throw new ApiError(400, "Password is not matching");
    // }

    //Check if the user is already exist
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      const payload = apiResponseHandler(
        "Failed",
        "Username or email is already exists"
      );
      return res.status(409).json({
        data: payload,
      });
    }

    console.log("Req", req.files);
    //Check for images, Check for avatar
    const avatarLocalPath = req.files?.avatar[0].path;

    if (!avatarLocalPath) {
      const payload = apiResponseHandler("Failed", "Avatar File is required");
      return res.status(400).json({
        data: payload,
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      const payload = apiResponseHandler("Failed", "Avatar File is required");
      return res.status(400).json({
        data: payload,
      });
    }

    //create user object - create entry in DB
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password: await bcrypt.hash(password, 10),
      avatar: avatar.url,
    });

    //remove the password and refresh token from response field
    const createUser = await User.findById(user._id).select("-password ");

    //check the user Creation
    if (!createUser) {
      const payload = apiResponseHandler(
        "Failed",
        "Somthing went wrong, While registering the user"
      );
      return res.status(500).json({
        data: payload,
      });
    }
    console.log("User Created Successfully");

    const payload = await apiResponseHandler(
      "Success",
      "User registered Successfully",
      createUser
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    const payload = apiResponseHandler(
      "Failed",
      "An error occurred during registration."
    );
    return res.status(500).json({ data: payload });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const payload = apiResponseHandler("Failed", "Fields are required");
      return res.status(400).json({
        data: payload,
      });
    }

    const existingUser = User.findOne({ email });

    console.log("existngUser", existingUser);

    if (!existingUser) {
      const payload = apiResponseHandler("Failed", "User not exist");

      return res.status(404).json({
        data: payload,
      });
    }

    // verify the password
    const isPasswordValid = await bcrypt.cpmpare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      const payload = await apiResponseHandler("Failed", "Invalid Password.");

      return res.status(401).json({
        data: payload,
      });
    }

    //Generate JWT Token
    const options = {
      id: existingUser._id,
      email: existingUser.email,
    };
    const token = jwt.sign(options, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //set token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS in production
      sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
      maxAge: 3600000, // Cookie expiry in milliseconds (1 hour in this case)
    });

    const payload = await apiResponseHandler(
      "Sucess",
      "User logged in Successfully"
      // { token }
    );

    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    console.log("Error logging in user:", error);
    const payload = await apiResponseHandler(
      "Failed",
      "An error occurred during login."
    );
    return res.status(500).json({
      data: payload,
    });
  }
};

export { registerUser, loginUser };
