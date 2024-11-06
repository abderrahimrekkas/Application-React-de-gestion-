import { useState } from "react";
import { userAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const [newPassword, setNewPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const {resetPassword, error, isLoading}=userAuthStore();
    const {token}=useParams();
    const navigate=useNavigate();

    const handleSubmit=async (e)=> {
        e.preventDefault();
        if(newPassword!==confirmPassword){
            toast.error("Confirm your password correctly");
            return;
        }
        try{
            await resetPassword(token, newPassword);
            toast.success("Password reset successfull");
            setTimeout(()=> {
                navigate("/login");
            }, 500);
        }catch(error){
            console.log(error);
            toast.error("Password reset failed");
        }
    }

    return (
        <motion.div 
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Reset Password
                </h2>
                <p className="invisible">Enter your email and we will send a link to reset your</p>

                {error && <p className="text-xs font-semibold text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <Input
                      icon={Lock}
                      type="password"
                      placeholder="Enter your new password..."
                      value={newPassword}
                      onChange={(e)=> setNewPassword(e.target.value)}
                      required
                    />

                    <Input
                      icon={Lock}
                      type="password"
                      placeholder="Confirm your new password..."
                      value={confirmPassword}
                      onChange={(e)=> setConfirmPassword(e.target.value)}
                      required
                    />

                    <motion.button
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                      className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                      type="submit"
                      disabled={isLoading}
                    >
                        {isLoading ? <Loader size={24} className="animate-spin mx-auto"/> : "Set new password"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
      )
}

export default ResetPassword;