import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './context/authContext';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import Sidebar from './components/layout/Sidebar';
import {ToastContainer} from 'react-toastify';
function App() {
  const { isLogged, userPermissions, setUserPermissions, isLoading, setIsLogged, refreshAccessToken, accessToken, setAccessToken, getCurrentUser, getRole } = useAuth();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    console.log(isLogged)
    setIsLoadingAuth(false);
    // getCurrentUser();
  }, [isLogged]);


  if (isLoadingAuth) {
    // Show a loader or nothing until auth status is confirmed
    return <div className="loading-spinner">Loading...</div>;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          {!isLogged ? (<PublicRoutes />) : (
            <>
              <div className="app-layout">
                <Sidebar />
                <div className="content-area">
                  <PrivateRoutes />
                </div>
              </div>
            </>
          )}
          <ToastContainer />
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
