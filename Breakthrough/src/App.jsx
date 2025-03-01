import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from './components';

function App() {
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [dispatch]); 

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-amber-600">
      <div className="w-full block">
        <Header />
        <main>
          Todo: {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
