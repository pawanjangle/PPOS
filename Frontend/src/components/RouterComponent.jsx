import { Route, Routes } from 'react-router-dom';
import React from 'react'
import Dashboard from './dashboard/Dashboard';
import Inventory from './inventory/Inventory';
import Billing from './billing/Billing';
import Sales from './sales/Sales';
import OrdersComponent from './orders/OrdersComponent';

const RouterComponent = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/inventory' element={<Inventory/>} />
            <Route path='/billing' element={<Billing />} />
            <Route path='/sales' element={<Sales/>} />
            <Route path='/orders' element={<OrdersComponent/>} />
        </Routes>)
}

export default RouterComponent

