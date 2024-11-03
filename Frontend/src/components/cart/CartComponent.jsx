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
import { useDispatch, useSelector } from 'react-redux'
import { setCustomerData, setPaymentStatus } from '../../redux/features/CartSlice'


const CartComponent = ({ handleRemoveFromCart, handleDeleteCart, createOrder, handleAlert }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const contentRef = useRef();
    const handlePrint = useReactToPrint({ contentRef });
    const shopName = "MK kirana stores"

    const handleChange = (e) => {
        dispatch(setCustomerData({ customerName: cart.customerName, [e.target.name]: e.target.value }))
    }

    const handlePaymentStatus = (value) => {
        dispatch(setPaymentStatus(value))
    }

    const validatePayment = () => {
        if (cart.paymentStatus == "UnPaid" && cart.customerName == "") {
            handleAlert()
            return false
        }
        return true
    }

    const handleOrder = () => {
        if (!validatePayment()) {
            return
        }
        let payload = {
            customerName: cart.customerName,
            shopName,
            paymentStatus: cart.paymentStatus,
            cartProducts: cart.cartProducts,
            total: cart.cartTotal
        }
        createOrder(payload);
        handlePrint()
    }
    return (
        <div className="cart-main">
            <Form>
                <Form.Group className="mb-3" controlId="formProduct">
                    <Form.Control type="text" placeholder="Enter Customer Name" name="customerName" value={cart.customerName} onChange={handleChange} required />
                </Form.Group>
            </Form>
            {cart.cartProducts.length !== 0 && <Card className="card-style">
                <div className="cart-button-style">
                    <BsFillCartXFill onClick={handleDeleteCart} style={{ color: "red" }} />
                </div>
                {cart.cartProducts.map((cartProduct) => {
                    return (
                        <div key={cartProduct._id} className="main-cart-div">
                            <div className="cart-wrapper">
                                <div className="cart-items">
                                    <p className="product-name">{cartProduct.productNameInHindi}</p>
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
            {cart.cartProducts.length !== 0 && <Card className="total-card">
                <div className="total-inner-div">
                    <h6>Total</h6>
                    <h6>Rs. {cart.cartTotal}</h6>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Payment Status: <span className="payStatus">{cart.paymentStatus}</span></p>
                    <div className="payment-form">
                        <Form.Select aria-label="Default select example" onChange={(e) => handlePaymentStatus(e.target.value)} value={cart.paymentStatus}>
                            <option disabled={true}>Please Select</option>
                            <option value="Paid">Paid</option>
                            <option value="UnPaid">UnPaid</option>
                        </Form.Select>
                    </div>
                </div>
                <div className="save-btn-container">
                    <Button className="save-btn" onClick={handleOrder}>Checkout <IoPrintSharp style={{ color: "blue" }} />
                    </Button>
                </div>
            </Card>}
            <div className="bill-style">
                <BillPrint innerRef={contentRef} customerName={cart.customerName} cartProducts={cart.cartProducts} shopName={shopName} total={cart.cartTotal} paymentStatus={cart.paymentStatus} />
            </div>
        </div>
    )
}

export default CartComponent