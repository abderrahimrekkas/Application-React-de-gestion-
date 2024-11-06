import { Outlet } from 'react-router-dom';
import FloatingShapes from "./components/FloatingShapes";
import { Toaster } from 'react-hot-toast';
import { userAuthStore } from './store/authStore';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const {checkAuth, isCheckingAuth}=userAuthStore();

  useEffect(()=> {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth){
    return <LoadingSpinner/>
  }

  return (
    <>
      <Toaster/>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
        <FloatingShapes color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
        <FloatingShapes color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
        <FloatingShapes color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>

        <main>
          <Outlet/>
        </main>
      </div>
    </>
  )
}

export default App;
