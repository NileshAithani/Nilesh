import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const API_URL = "/api/v1/users";

const LoginUser = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, loginFormData);
      const message = response?.data?.data?.message || "Login successful!";
      toast.success(message);
      navigate("/admin/dashboard");
      setLoginFormData({ email: "", password: "" });
    } catch (error) {
      const errorMessage =
        error.response?.data?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decodedToken = jwtDecode(credentialResponse.credential);
      toast.success("Logged in successfully");
      navigate("/experience");
    } catch (error) {
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <div className="text-center mb-4">
          <span className="font-semibold">or</span>
          <a href="/register" className="text-orange-600 font-bold mx-1">
            Create an account
          </a>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">
              Email:
            </label>
            <input
              name="email"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-400 transition"
              type="email"
              placeholder="Enter your email"
              value={loginFormData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold mb-1">
              Password:
            </label>
            <input
              name="password"
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-400 transition"
              type="password"
              placeholder="Enter your password"
              value={loginFormData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            className="bg-orange-500 text-white p-2 rounded-md font-bold hover:bg-orange-600 transition"
            type="submit"
          >
            Login
          </button>

          <div className="text-center text-gray-600 my-2">- OR -</div>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => toast.error("Google login failed!")}
            useOneTap
          />

          {/* <p className="text-xs text-center mt-4">
            By clicking on Login, I accept the Terms & Conditions & Privacy Policy
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
