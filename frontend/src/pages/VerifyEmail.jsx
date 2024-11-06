import { useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { userAuthStore } from "../store/authStore";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const [code, setCode]=useState(["", "", "", "", "", ""]);
    const inputRefs=useRef([]);
    const {verifyEmail, error, isLoading}=userAuthStore();
    const navigate=useNavigate();

    const handleChange=(idx, value)=> {
        const newCode=[...code];

        if(value.length>1){
            const pastedCode=value.slice(0, 6).split("");
            for(let i=0;i<6;i++){
                newCode[i]=pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex=newCode.findLastIndex((digit)=> digit!=="");
            const focusIndex=lastFilledIndex<5 ? lastFilledIndex+1 : 5;
            inputRefs.current[focusIndex].focus();
        }else{
            newCode[idx]=value;
            setCode(newCode);

            if(value && idx<5){
                inputRefs.current[idx+1].focus();
            }
        }
    }

    const handleKeyDown=(idx, e)=> {
        if(e.key=="Backspace" && !code[idx] && idx>0){
            inputRefs.current[idx-1].focus();
        }
    }

    const handleSubmit=async (e)=> {
        e.preventDefault();
        const verificationCode=code.join("");
        try{
            await verifyEmail(verificationCode);
            toast.success(`Email verified successfully`);
            navigate("/");
            setCode(["", "", "", "", "", ""]);
        }catch(error){
            console.log(error);
        }
    }

    return (
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="max-w-md w-full p-8 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl"
        >
            <h2 className="text-3xl font-bold mt-2 mb-4 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Verify your email
            </h2>
            <p className="text-center text-gray-300">Enter the 6-digit code sent to your mail</p>
            <p className="bg-gray-800 invisible">Enter your email and we will send a link to reset your</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between space-x-2">
                    {code.map((digit, idx)=> (
                        <input
                          key={idx}
                          ref={(el)=> (inputRefs.current[idx]=el)}
                          type="text"
                          maxLength='6'
                          value={digit}
                          onChange={(e)=> handleChange(idx, e.target.value)}
                          onKeyDown={(e)=> handleKeyDown(idx, e)}
                          className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                    ))}
                </div>

                {error && <p className="mt-3 text-red-500 font-semibold text-xs">{error}</p>}

                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  type="submit"
                  disabled={isLoading || code.some((digit)=> !digit)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                    {isLoading ? <Loader size={24} className="animate-spin mx-auto"/> : "Verify your email"}
                </motion.button>
            </form>
        </motion.div>
      </div>
    )
}

export default VerifyEmail;