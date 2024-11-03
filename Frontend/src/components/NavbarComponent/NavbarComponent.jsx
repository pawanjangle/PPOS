import React from 'react'
import "./NavbarComponent.css"
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NavbarComponent = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        navigate("/signin");
    }
    return (
        <>
            <div className="heading-box">
                <p className="main-heading">PPOS(Point of Sales)v1.0.1</p>
                <p className="text-danger">Logout</p>
            </div>
        </>
    )
}

export default NavbarComponent