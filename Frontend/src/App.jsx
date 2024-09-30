import { useState } from 'react'
import './App.css'
import SidebarComponent from './components/sidebarComponent/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterComponent from './components/RouterComponent';
import NavbarComponent from './components/NavbarComponent/NavbarComponent';
import Alert from 'react-bootstrap/Alert';


function App() {

  return (
    <>
      <div className="main-div">
        <SidebarComponent />
        <div className="right-style">
        <Alert key={"danger"} variant={"danger"}>
          This is a {"danger"} alert—check it out!
        </Alert>
          <NavbarComponent />
          <RouterComponent />
        </div>
      </div>
    </>
  )
}

export default App
