import React from 'react'
import Nav from 'react-bootstrap/Nav';

import "./SidebarComponent.css"
import { AiFillHome, AiOutlineProduct } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { TbReportSearch } from "react-icons/tb";
import { MdPointOfSale } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiBillFill } from "react-icons/ri";
import poslogo from "../../assets/poslogo.png"
const SidebarComponent = () => {
  return (
    <>
      <div className="main">
        <div className="brand-style">
          <img className="image-style" src={poslogo} alt="" />
          PPOS
        </div>
        <div className="link-style">
          <AiFillHome />
          <Link to="/" className="link-text-style">Dashboard</Link>
        </div>
        <div className="link-style">
          <RiBillFill />
          <Link to="/billing" className="link-text-style">Billing</Link>
        </div>
        <div className="link-style">
          <AiOutlineProduct />
          <Link to="/inventory" className="link-text-style">Inventory</Link>
        </div>
        <div className="link-style">
          <FcSalesPerformance />
          <Link to="/sales" className="link-text-style">Sales</Link>
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