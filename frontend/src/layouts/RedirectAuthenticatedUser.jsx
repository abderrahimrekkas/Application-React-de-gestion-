import { Navigate } from "react-router-dom";
import { userAuthStore } from "../store/authStore"

const RedirectAuthenticatedUser = ({children}) => {

    const {isAuthenticated, user}=userAuthStore();
    if(isAuthenticated && user.isVerified){
        return <Navigate to="/" replace/>
    }

    return children;
}

export default RedirectAuthenticatedUser;