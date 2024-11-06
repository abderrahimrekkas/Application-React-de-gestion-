import { Navigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore"

const ProtectedRoute = ({children}) => {

    const {isAuthenticated, user}=userAuthStore();
    
    if(!isAuthenticated){
        return <Navigate to={`/login`} replace/>
    }

    if(!user.isVerified){
        return <Navigate to={`/verify-email`} replace/>
    }

    return children;
}

export default ProtectedRoute;