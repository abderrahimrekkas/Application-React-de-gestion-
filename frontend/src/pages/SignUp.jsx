import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import { userAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignUp = () => {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const {signup, error, isLoading}=userAuthStore();
    const navigate=useNavigate();

    const handleSubmit=async (e)=> {
        e.preventDefault();

        try{
            await signup(name, email, password);
            toast.success("User registered successfully");
            navigate("/verify-email");
        }catch(error){
            console.log(error.message);
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
                    Create Account
                </h2>
                <p className="bg-gray-800 invisible">Enter your email and we will send a link to reset your</p>

                <form onSubmit={handleSubmit}>
                    <Input
                      icon={User}
                      type="text"
                      placeholder="Enter your full name..."
                      value={name}
                      onChange={(e)=> setName(e.target.value)}
                    />
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

                    {/* Password strength check */}
                    <PasswordStrength password={password}/>

                    {error && <p className="mt-3 text-red-500 font-semibold text-xs">{error}</p>}

                    <motion.button 
                      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      type="submit"
                      disabled={isLoading}
                    >
                        {isLoading ? <Loader size={24} className="animate-spin mx-auto"/> : "Sign Up"}
                    </motion.button>
                </form>
            </div>

            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-green-400 hover:underline">
                      Login
                    </Link>
                </p>
            </div>
        </motion.div>
    )
}

export default SignUp;