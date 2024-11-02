import React from 'react'
import "./BillPrint.css"

const BillPrint = ({ innerRef, shopName, cartProducts, customerName, total, paymentStatus }) => {
    return (
        <div ref={innerRef} className="outer-div .page-break">
            <div className="shop-details">
                <h6>Invoice</h6>
                <p>{shopName}</p>
            </div>
            <p>Name: {customerName}</p>

            {cartProducts.length !== 0 && cartProducts.map((product, index) => {
                return (
                    <div key={index} className="cart-details">
                        <p>{index + 1}</p>
                        <p>{product.productNameInHindi}</p>
                        <p>{product.quantity}{product.unit}</p>
                        <p>{product.quantity * product.price}</p>
                    </div>
                )
            })}
            <hr />
            <div className="total-details-div">
                <h6>Total :</h6>
                <h6>Rs. {total}</h6>
            </div>
            <h6>Payment Status: {paymentStatus}</h6>
        </div>

    )
}

export default BillPrint