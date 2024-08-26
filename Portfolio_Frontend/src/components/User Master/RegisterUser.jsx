import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
    avatarPreview: null,
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    setFormData((preData) => ({
      ...preData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    setFormData({
      ...formData,
      avatar: file,
      avatarPreview: URL.createObjectURL(file),
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }
    console.log(formData);
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response : ", response);

      console.log("Response=====>", response?.data?.data?.messageCode);

      toast.success(response?.data?.data?.messageCode);

      navigate("/login");
    } catch (error) { 
      setIsLoading(true);
      toast.error(error.response?.data?.data?.messageCode);
    }

    setFormData({
      username: "",
      email: "",
      password: "",
      avatar: null,
      avatarPreview: null,
    });
    setIsLoading(false);
  };

  return (
    <div className="w-full m-20 flex justify-center items-center">
      <div className="w-3/12 m-2 flex flex-col gap-8">
        <div className="flex flex-col gap-2 ">
          <h1 className=" font-bold text-3xl">Sign up</h1>
          <div className="flex gap-1">
            <h3 className=" font-bold">or</h3>
            <a href="/login" className=" text-orange-600 font-bold">
              login to your account
            </a>
          </div>
          <div className="p-1 bg-black w-9 rounded-sm"></div>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-bold">
                Username:
              </label>
              <input
                name="username"
                className="border border-black rounded px-2 py-1"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold">
                Email:
              </label>
              <input
                name="email"
                className="border border-black rounded px-2 py-1"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold">
                Password:
              </label>
              <input
                name="password"
                className="border border-black rounded px-2 py-1"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </div>

            {/* <div className="flex flex-col">
              <label htmlFor="confirm-password" className="font-bold">
                Confirm Password:
              </label>
              <input
                name="confirmPassword"
                className="border border-black rounded px-2 py-1"
                type="text"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={changeHandler}
                required
              />
            </div> */}

            <div className="mb-4">
              <label htmlFor="avatar" className="font-bold    ">
                Avatar:
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {formData.avatarPreview && (
                <div className="mt-3">
                  <img
                    src={formData.avatarPreview}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <button
              type="submit"
              className={`bg-orange-400 text-white p-2 rounded-md font-bold ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-orange-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "CONTINUE"}
            </button>
            <h5 className="text-[10px]">
              By creating an account, I accept the Terms & Conditions & Privacy
              Policy
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
