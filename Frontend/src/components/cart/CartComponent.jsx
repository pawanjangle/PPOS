import React, { useState, useRef } from 'react'
import "./CartComponent.css"
import { BsFillCartXFill } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { RiDeleteBin2Fill } from "react-icons/ri";
import Form from 'react-bootstrap/Form';
import { IoPrintSharp } from "react-icons/io5";
import { useReactToPrint } from 'react-to-print';
import BillPrint from '../billprint/BillPrint';
import { Button } from 'react-bootstrap';

const CartComponent = ({ cartProducts, total, handleRemoveFromCart, handleDeleteCart }) => {
    const [formData, setFormData] = useState({ customerName: "" })
    const [paymentStatus, setPaymentStatus] = useState("UnPaid")
    const contentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef });
    const shopName = "MK kirana stores"

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handlePaymentStatus = (value) => {
        setPaymentStatus(value)
    }
    return (
        <div className="cart-main">
            <Form>
                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Control type="text" placeholder="Enter Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} required />
                </Form.Group>
            </Form>
            {cartProducts.length !== 0 && <Card className="card-style">
                <div className="cart-button-style">
                    <IoPrintSharp onClick={handlePrint} style={{ color: "blue" }} />
                    <BsFillCartXFill onClick={handleDeleteCart} style={{ color: "blue" }} />
                </div>
                {cartProducts.map((cartProduct) => {
                    return (
                        <div className="main-cart-div">
                            <div className="cart-wrapper">
                                <div className="cart-items">
                                    <p className="product-name">{cartProduct.productName}</p>
                                    <div className="product-detail">
                                        Rs. {cartProduct.price} per {cartProduct.unit}
                                    </div>
                                </div>
                                <div className="total-div">
                                    <div className="quantity-margin">
                                        <RiDeleteBin2Fill onClick={() => handleRemoveFromCart(cartProduct._id)} style={{ color: "red" }} />
                                    </div>
                                    <div className="quantity-div">
                                        <h6 >{cartProduct.quantity}</h6>
                                    </div>
                                    <h6>{cartProduct.price * cartProduct.quantity} </h6>
                                </div>
                            </div>
                            {<hr className='horizontal-line' />}
                        </div>
                    )
                })
                }
            </Card>}
            {cartProducts.length !== 0 && <Card className="total-card">
                <div className="total-inner-div">
                    <h6>Total</h6>
                    <h6>Rs. {total}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Payment Status: <span className="payStatus">{paymentStatus}</span></p>
                    <Form.Select aria-label="Default select example" onChange={(e) => handlePaymentStatus(e.target.value)}>
                        <option>Please Select</option>
                        <option value="Paid">Paid</option>
                        <option value="UnPaid">UnPaid</option>
                    </Form.Select>
                </div>

            </Card>}
            <div className="bill-style">
                <BillPrint innerRef={contentRef} customerName={formData.customerName} cartProducts={cartProducts} shopName={shopName} total={total} />
            </div>
        </div>
    )
}

export default CartComponent