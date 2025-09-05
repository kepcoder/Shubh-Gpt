import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TrueFocus from "../../Reactbits/TrueFocus/TrueFocus";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function Register() {

  
    const MySwal = withReactContent(Swal);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        MySwal.fire({
         title: "Already Registered!",
         text: "Redirecting to Home...",
         icon: "success",
         timer: 3000,
         confirmButtonText: false
        });
        navigate("/");
      }
    },[]);

  const onSubmit = async (data) => {
    const MySwal = withReactContent(Swal);

    try{
      const res = await axios.post('https://shubh-gpt.onrender.com/user/register', data) 
      MySwal.fire({
       title: "User Registered!",
       text: "You can now login",
       icon: "success",
       confirmButtonText: "OK"
      });
    }catch(err){
      const status = err.response?.status;
      const msg = err.response?.data?.msg || "Something went wrong";
        if (status === 409) {
            MySwal.fire({
              title: "Already Registered",
              text: msg,
              icon: "warning",
              confirmButtonText: "Login Now",
            });
         } else {
           MySwal.fire({
             title: "Registration Failed!",
             text: msg,
             icon: "error",
             confirmButtonText: "Try Again",
           });
      }
    }
  reset()
  };

  const password = watch("password");

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-95 backdrop-blur-md px-4">
      {/* Stylish Heading */}
      <div className="mb-6 text-center">
        <h1>
          <TrueFocus 
            sentence="Shubh Gpt"
            manualMode={false}
            blurAmount={6}
            borderColor="red"
            animationDuration={1}
            pauseBetweenAnimations={.5}
           />
        </h1>
        <p className="text-gray-400 text-sm mt-1">AI Powered Registration</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/80 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-300">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-400 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="w-full px-3 py-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Must contain 8+ chars, 1 uppercase, 1 lowercase, 1 number & 1 special char",
                  },
                })}
                className="w-full px-3 py-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-3 py-2 mt-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              >
                {showConfirm ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <h4 className="text-white text-center font-semibold cursor-pointer hover:text-indigo-500 transition-all" onClick={() => navigate("/ai/login")}>Already have an account? Click here</h4>

      </div>
    </div>
  );
}
