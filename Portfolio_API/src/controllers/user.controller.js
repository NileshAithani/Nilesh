import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { apiResponseHandler } from "../utils/apiResponseHandler.js";

const registerUser = async (req, res) => {
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

  //Check if the user is already exist or not
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
    password,
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
};

//password chacker
//sent otp
//otp,email,password

//validation
//User exists or not by email
//validate the password
//create JWT token (req.data, cookie)
//response

const loginUser = async (req, res) => {
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

    return res.status(400).json({
      data: payload,
    });
  }
};

export { registerUser };
