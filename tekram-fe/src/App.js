import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './context/authContext';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  const { isLogged, userPermissions, setUserPermissions, isLoading, setIsLogged, refreshAccessToken, accessToken, setAccessToken, getCurrentUser, getRole } = useAuth();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    setIsLoadingAuth(false);
  }, [isLogged]);


  if (isLoadingAuth) {
    // Show a loader or nothing until auth status is confirmed
    return <div className="loading-spinner">Loading...</div>;
  }


  return (
    <div className="App">
      <BrowserRouter>
        <React.Fragment>
          {!isLogged ? (<PublicRoutes/>):(<PrivateRoutes/>) }
        </React.Fragment>
      </BrowserRouter>
    </div>
  );
}

export default App;
