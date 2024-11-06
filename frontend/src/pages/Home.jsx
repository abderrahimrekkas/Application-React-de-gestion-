import { motion } from "framer-motion";
import { userAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const {user, logout, error, isLoading}=userAuthStore();
  const navigate=useNavigate();

  const formatDate=(dateString)=> {
    const date=new Date(dateString);
    if(isNaN(date.getTime())){
      return "Invalid Date";
    }

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  const handleOnClick=async ()=> {
    try{
      await logout();
      toast.success("User logged out successfully");
      navigate("/login");
    }catch(error){
      console.log(error);
    }
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.9}}
      transition={{duration: 0.5}}
      className="max-w-md w-full mx-auto mt-2 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>
      <p className="bg-gray-800 invisible">Enter your email and we will send a link to reset your</p>

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.2}}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
          <div className="flex items-center space-x-1">
            <p className="text-gray-300 text-md font-semibold">Name:</p>
            <span className="text-gray-300">{user.name}</span>
          </div>

          <div className="flex items-center space-x-1">
            <p className="text-gray-300 text-md font-semibold">Email:</p>
            <span className="text-gray-300">{user.email}</span>
          </div>
        </motion.div>
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{delay: 0.4}}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
          <p className="text-gray-300">
            <span className="font-semibold text-md">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
          <p className="text-gray-300 text-md">
            <span className="font-bold">Last Login: </span>
            {user.lastLogin ? formatDate(user.lastLogin) : "Signed up just now!"}
          </p>
        </motion.div>
      </div>

      {error && <p className="mt-3 text-red-500 text-xs font-semibold">{error}</p>}

      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6}}
        className="mt-6"
      >
        <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{opacity: 0.95}}
          onClick={handleOnClick}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {isLoading ? <Loader size={24} className="animate-spin mx-auto"/> : "Logout"}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Home;