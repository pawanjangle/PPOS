import React, { useState } from 'react'
import "./SidebarComponent.css"
import { AiFillHome, AiOutlineProduct } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { RiArrowRightDoubleLine, RiBillFill } from "react-icons/ri";
import poslogo from "../../assets/poslogo.png";
import { MdBorderColor } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

const SidebarComponent = () => {
  const [expand, setExpand] = useState(false)
  const handleCollapse = () => {
    setExpand(!expand);
  }

  return (
    <>
      {expand ? <div className="main">
        <div className="brand-style">
          <NavLink to="/"><img className="image-style" src={poslogo} alt="" /></NavLink>
          PPOS
        </div>
        <li className="link-style">
          <NavLink to="/" className="link-text-style" activeClassName="active">
            <div className="d-flex py-2"><span className="link-gap"><AiFillHome /></span>
              <span>Dashboard</span></div></NavLink>
        </li>
        <li className="link-style">
          <NavLink to="/billing" className="link-text-style" activeClassName="active"><div className="d-flex py-2"><span className="link-gap"><RiBillFill /></span>
            <span>Billing</span></div></NavLink>
        </li>
        <li className="link-style">
          <NavLink to="/inventory" className="link-text-style" activeClassName="active"><div className="d-flex py-2"><span className="link-gap"><AiOutlineProduct /></span>
            <span>Inventory</span></div></NavLink>
        </li>

        <li className="link-style">
          <NavLink to="/orders" className="link-text-style" activeClassName="active"><div className="d-flex py-2"><span className="link-gap"><MdBorderColor /></span>
            <span>Orders</span></div></NavLink>
        </li>
        <li className="link-style">
          <NavLink to="/sales" className="link-text-style" activeClassName="active"><div className="d-flex py-2"><span className="link-gap"><FcSalesPerformance /></span>
            <span>Sales</span></div></NavLink>
        </li>
        <div className="arrow-style" ><RiArrowLeftDoubleLine size={30} onClick={handleCollapse} /></div>
      </div> :
        <div className="main">
          <div className="brand-style">
            <NavLink to="/"><img className="image-style" src={poslogo} alt="" /></NavLink>
          </div>
          <div className="link-style" activeClassName="active">
            <NavLink to="/" className="link-text-style py-2"><AiFillHome />
            </NavLink>
          </div>
          <div className="link-style">
            <NavLink to="/billing" activeClassName="active" className="link-text-style py-2"><RiBillFill />
            </NavLink>
          </div>
          <div className="link-style">
            <NavLink to="/inventory" activeClassName="active" className="link-text-style py-2"><AiOutlineProduct /></NavLink>
          </div>
          <div className="link-style">

            <NavLink to="/orders" activeClassName="active" className="link-text-style py-2"><MdBorderColor /></NavLink>
          </div>
          <div className="link-style">
            <NavLink to="/sales" activeClassName="active" className="link-text-style py-2"><FcSalesPerformance /></NavLink>
          </div>
          <div className="arrow-style"><RiArrowRightDoubleLine size={30} onClick={handleCollapse} /></div>
        </div>
      }
    </>
  );
}

export default SidebarComponent