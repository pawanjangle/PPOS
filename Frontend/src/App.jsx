import { useState } from 'react'
import './App.css'
import SidebarComponent from './components/sidebarComponent/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './components/RouterComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';


function App() {

  return (
    <>
      <div className="main-div">
        <SidebarComponent />
        <div className="right-style">
          <NavbarComponent />
          <RouterComponent />
        </div>
      </div>
    </>
  )
}

export default App
