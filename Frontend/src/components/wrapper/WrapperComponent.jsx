import React from 'react'
import './WrapperComponent.css'
import RouterComponent from '../RouterComponent'
import SidebarComponent from '../sidebarComponent/SidebarComponent'
import NavbarComponent from '../NavbarComponent/NavbarComponent'

const WrapperComponent = ({ children, authorized }) => {
    return (
        <div className="wrapper-div">
            <SidebarComponent />
            <div className="right-style">
                <NavbarComponent />
                <div>                {children}
                </div>
            </div>

        </div>
    )
}

export default WrapperComponent