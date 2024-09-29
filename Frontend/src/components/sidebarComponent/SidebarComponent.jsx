import React from 'react'
import Nav from 'react-bootstrap/Nav';

import "./SidebarComponent.css"
import { AiFillHome, AiOutlineProduct } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { MdPointOfSale } from "react-icons/md";
import { Link } from "react-router-dom";



const SidebarComponent = () => {
  return (
    <>
      <div className="main">
        <div className="brand-style">
        <MdPointOfSale />
          PPOS SYSTEM
        </div>
        <div className="link-style">
          <AiFillHome />
          <Link to="/">Dashboard</Link>
        </div>
        <div className="link-style">
          <AiOutlineProduct />
          <Link to="/inventory">Inventory</Link>
        </div>
        <div className="link-style">
          <FcSalesPerformance />
          <li>Sales</li>
        </div>
        <div className="link-style">
          <TbReportSearch />
          <li>Reports</li>
        </div>
      </div>
    </>
  );
}

export default SidebarComponent