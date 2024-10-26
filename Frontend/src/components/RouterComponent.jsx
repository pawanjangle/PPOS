import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Dashboard from './dashboard/Dashboard';
import Inventory from './inventory/Inventory';
import Billing from './billing/Billing';
import Sales from './sales/Sales';
import OrdersComponent from './orders/OrdersComponent';
import LoginComponent from './login/LoginComponent';
import SignUpComponent from './signup/SignUpComponent';
import WrapperComponent from './wrapper/WrapperComponent';


const RouterComponent = () => {
    return (
        <>
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route path='/inventory' element={<Inventory />} />
                    <Route path='/billing' element={<Billing />} />
                    <Route path='/sales' element={<Sales />} />
                    <Route path='/orders' element={<OrdersComponent />} />
                    <Route path='/signup' element={<SignUpComponent />} />
                    <Route path='/signin' element={<LoginComponent />} />
                </Routes>
        </>
    )
}

export default RouterComponent

