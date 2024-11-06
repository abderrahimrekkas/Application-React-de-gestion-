import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const navigate=useNavigate();
  const {login, isLoading, error}=userAuthStore();

  const handleSubmit=async (e)=> {
    e.preventDefault();
    try{
      await login(email, password);
      toast.success("User logged in successfully");
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>
        <p className="bg-gray-800 invisible">Enter your email and we will send a link to reset your</p>

        <form onSubmit={handleSubmit}>

          <Input
            icon={Mail}
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />

          <div className="flex items-center mb-2">
            <Link to={"/forgot-password"} className="text-sm text-green-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="mt-3 text-red-500 font-semibold text-xs">{error}</p>}

          <motion.button 
              className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{scale: 1.02}}
              whileTap={{scale: 0.98}}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader size={24} className="animate-spin mx-auto"/> : "Login"}
            </motion.button>
          </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          New to Authify?{" "}
          <Link to={"/signup"} className="text-green-400 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default Login;