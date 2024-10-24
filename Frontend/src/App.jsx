import React, { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './components/RouterComponent';
import { jwtVerify } from 'jose';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const jwtSecret = import.meta.env.VITE_JWTSECRET
  const secretKey = new TextEncoder().encode(jwtSecret);
  
  useEffect(() => {
    handleAuthorization()
  }, [])

  const handleAuthorization = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { payload } = await jwtVerify(token, secretKey);
      console.log(payload);
      navigate("/")
    }
    else {
      navigate("/signin")
    }
  }

  return (
    <>
      <div className="main-div">
        <RouterComponent />
      </div>
    </>
  )
}

export default App
