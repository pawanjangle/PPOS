import React from 'react'
import "./CartComponent.css"
import { BsFillCartXFill } from "react-icons/bs";
import Card from 'react-bootstrap/Card';
import { RiDeleteBin2Fill } from "react-icons/ri";


const CartComponent = ({ cartProducts, total, handleRemoveFromCart, handleDeleteCart }) => {
    console.log(cartProducts)
    return (
        <div className="cart-main">
            {cartProducts.length !== 0 && <Card className="card-style">
                <div className="cart-button-style">
                    <BsFillCartXFill onClick={() => handleDeleteCart()} />
                </div>
                {cartProducts.map((cartProduct) => {
                    return (
                        <div className="main-cart-div">
                            <div className="cart-wrapper">
                                <div className="cart-items">
                                    <div className="product-name">
                                        <h6>{cartProduct.productName}</h6>
                                    </div>
                                    <div className="product-detail">
                                        Rs. {cartProduct.price} per {cartProduct.unit}
                                    </div>
                                </div>
                                <div className="total-div">
                                    <div className="quantity-margin">
                                        <RiDeleteBin2Fill onClick={() => handleRemoveFromCart(cartProduct._id)} />
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
                    <h6>{total}</h6>
                </div>
            </Card>}
        </div>
    )
}

export default CartComponent