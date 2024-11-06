import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import RedirectAuthenticatedUser from "../layouts/RedirectAuthenticatedUser.jsx";
import ProtectedRoute from "../layouts/ProtectedRoute.jsx";
import TitleLayout from "../layouts/TitleLayout.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

const router=createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <ProtectedRoute>
                    <TitleLayout>
                        <Home/>
                    </TitleLayout>
                </ProtectedRoute>
            },
            {
                path: "signup",
                element: <RedirectAuthenticatedUser>
                    <TitleLayout>
                        <SignUp/>
                    </TitleLayout>
                </RedirectAuthenticatedUser>
            },
            {
                path: "login",
                element: <RedirectAuthenticatedUser>
                    <TitleLayout>
                        <Login/>
                    </TitleLayout>
                </RedirectAuthenticatedUser>
            },
            {
                path: "verify-email",
                element: <TitleLayout>
                    <VerifyEmail/>
                </TitleLayout>
            },
            {
                path: "forgot-password",
                element: <TitleLayout>
                    <ForgotPassword/>
                </TitleLayout>
            },
            {
                path: "reset-password/:token",
                element: <TitleLayout>
                    <ResetPassword/>
                </TitleLayout>
            },
            {
                path: "*",
                element: <Navigate to="/" replace/>
            }
        ]
    }
]);

export default router;