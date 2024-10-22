import React, { useEffect } from 'react'
import './App.css'
import SidebarComponent from './components/sidebarComponent/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './components/RouterComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import LoginComponent from './components/Login/LoginComponent';
import SignUpComponent from './components/signup/SignUpComponent';
import { jwtVerify } from 'jose';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const jwtSecret = import.meta.env.VITE_JWTSECRET
  const secretKey = new TextEncoder().encode(jwtSecret); // Replace with your actual secret key

  useEffect(() => {
    handleAuthorization()
  }, [])

  const handleAuthorization = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { payload } = await jwtVerify(token, secretKey);
      console.log(payload); // Your JWT claims
    }
    else {
      navigate("/signin")
    }
  }

  return (
    <>
      <div className="main-div">
        {/* <SignUpComponent /> */}
        {/* <LoginComponent /> */}
        <RouterComponent />
        {/* <SidebarComponent />
        <div className="right-style">
          <NavbarComponent />
          <div className="App">
          </div>
        </div> */}
      </div>
    </>
  )
}

export default App
