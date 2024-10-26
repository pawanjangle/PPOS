import React, { useState } from 'react'
import "./SidebarComponent.css"
import { AiFillHome, AiOutlineProduct } from "react-icons/ai";
import { FcSalesPerformance } from "react-icons/fc";
import { Link } from "react-router-dom";
import { RiArrowRightDoubleLine, RiBillFill } from "react-icons/ri";
import poslogo from "../../assets/poslogo.png";
import { MdBorderColor } from "react-icons/md";
import { RiArrowLeftDoubleLine } from "react-icons/ri";

const SidebarComponent = () => {
  const [expand, setExpand] = useState(false)
  const handleCollapse = () => {
    setExpand(!expand);
  }
  const handleActive = () => {

  }

  return (
    <>

      {expand ? <div className="main">
        <div className="brand-style">
          <img className="image-style" src={poslogo} alt="" />
          PPOS
        </div>
        <div className="link-style" onClick={handleActive}>
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
          <MdBorderColor />
          <Link to="/orders" className="link-text-style">Orders</Link>
        </div>
        <div className="link-style">
          <FcSalesPerformance />
          <Link to="/sales" className="link-text-style">Sales</Link>
        </div>
        <div className="arrow-style" ><RiArrowLeftDoubleLine size={30} onClick={handleCollapse} /></div>
      </div> :
        <div className="main">
          <div className="brand-style">
            <img className="image-style" src={poslogo} alt="" />
          </div>
          <div className="link-style">
            <Link to="/" className="link-text-style"><AiFillHome />
            </Link>
          </div>
          <div className="link-style">
            <Link to="/billing" className="link-text-style"><RiBillFill />
            </Link>
          </div>
          <div className="link-style">
            <Link to="/inventory" className="link-text-style"><AiOutlineProduct /></Link>
          </div>
          <div className="link-style">

            <Link to="/orders" className="link-text-style"><MdBorderColor /></Link>
          </div>
          <div className="link-style">
            <Link to="/sales" className="link-text-style"><FcSalesPerformance /></Link>
          </div>
          <div className="arrow-style"><RiArrowRightDoubleLine size={30} onClick={handleCollapse} /></div>
        </div>
      }
    </>
  );
}

export default SidebarComponent