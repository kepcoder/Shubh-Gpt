import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TrueFocus from "../../Reactbits/TrueFocus/TrueFocus";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import Cookies from "js-cookie";



export default function LoginPage() {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      MySwal.fire({
       title: "Already Login!",
       text: "Redirecting to Home...",
       icon: "success",
       timer: 3000,
       confirmButtonText: false
      });
      navigate("/");
    }
  },[]);


  const onSubmit = async (data) => {
    try{
      const res = await axios.post('http://localhost:3000/user/login', data , { withCredentials: true })
      console.log(res.data.msg)
      MySwal.fire({
       title: "Login Successfull!",
       text: "Redirecting to chat...",
       icon: "success",
       confirmButtonText: "OK"
      });
        setTimeout(() => {
          navigate("/")
        },2000)
    }catch(err){
      const status = err.response?.status;
      const msg = err.response?.data?.msg || "Something went wrong";
        if (status === 400) {
            MySwal.fire({
              title: "Login Failed!",
              text: msg,
              icon: "error",
              confirmButtonText: "Try Again",
            });
         }
    }
    
  };
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
        <p className="text-gray-400 text-sm mt-1">AI Powered Login</p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/80 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {...register("password", { required: "Password is required" })}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <h4 className="text-white text-center font-semibold cursor-pointer hover:text-indigo-500 transition-all" onClick={() => navigate("/ai/register")}>Don't have an account? Click Here</h4>
      </div>
    </div>
  );
}
