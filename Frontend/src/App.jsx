import { useState } from 'react'
import './App.css'
import SidebarComponent from './components/sidebarComponent/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './components/RouterComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import AlertComponent from './components/alert/AlertComponent';
import { useSelector } from 'react-redux'


function App() {
  const alert = useSelector((state) => state.alert)
  console.log(alert)

  return (
    <>
      <div className="main-div">
        <SidebarComponent />
        <div className="right-style">
          <NavbarComponent />
          <RouterComponent />
          <div className="App">
          </div>
        </div>
      </div>
    </>
  )
}

export default App
