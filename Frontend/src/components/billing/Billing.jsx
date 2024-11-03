import React, { useState, useEffect, useReducer } from 'react'
import "./Billing.css"
import { callAllProducts } from '../../service/Service'
import DataTableComponent from '../data-table/DataTableComponent'
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Html5QrcodeScanner } from "html5-qrcode"
import ScannerComponent from '../scannerComponent/ScannerComponent';
import CartComponent from '../cart/CartComponent';
import AlertComponent from '../alert/AlertComponent'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../redux/features/AlertSlice'
import { hideAlert, setCartProducts } from '../../redux/features/CartSlice'
import WrapperComponent from '../wrapper/WrapperComponent';
import { addProductToCart, updateProduct, setCartEmpty, callcreateOrder } from "../../redux/features/CartSlice"

const Billing = () => {
    const alert = useSelector((state) => state.alert)
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const [allProducts, setAllProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    const [finalCart, setFinalCart] = useState(JSON.parse(JSON.stringify(cart.cartProducts)))
    const [colDefs, setColDefs] = useState([{
        field: "sNo", headerName: 'S. No.', width: 100,
    }, {
        field: "productName", headerName: 'Product Name', filter: true
    }, {
        field: "productNameInHindi", headerName: 'Product Display Name'
    },
    { field: "quantity", width: 100, editable: true },
    { field: "manufacturerName", headerName: 'Manufacturer Name', editable: true, filter: true },
    { field: "price", headerName: 'Price per unit', width: 100, editable: true },
    { field: "unit", width: 100, editable: true },
    ]);

    useEffect(() => {
        handleAllProducts()
    }, [])

    useEffect(() => {
        setFinalCart(JSON.parse(JSON.stringify(cart.cartProducts)))
    }, [cart.cartProducts])

    const handleAllProducts = () => {
        callAllProducts().then(res => {
            if (res.status == 200) {
                setAllProducts(res.data.products)
            }
            else if (res.status == 400) {
                console.log(res.data.message)
            }
        }
        )
            .catch(err => {
                console.log(err)
            })
    }
    const defaultColDef = {
        sortable: true,
    }

    const productAdded = (product) => {
        for (let val of cart.cartProducts) {
            if (val._id == product._id) {
                dispatch(showAlert({
                    alertState: true,
                    alertType: "danger",
                    alertMessage: "Product is already present in the cart"
                }))
                setTimeout(() => {
                    dispatch(showAlert({
                        alertState: false,
                        alertType: "",
                        alertMessage: ""
                    }))
                }, 2000
                )
                return true
            }
        }
        return false;
    }

    const handleChange = (product) => {
        if (product.length == 0 || productAdded(product[0])) {
            setSelectedItem(product)
            return
        }
        if (product.length !== 0) {
            product[0].quantity = 1;
            product[0].sNo = cart.cartProducts.length + 1,
                setSelectedItem(product)
            let allCartProduct = [
                ...cart.cartProducts,
                product[0],
            ]
            let total = calculateTotal(allCartProduct)
            dispatch(addProductToCart({ product: product[0], total }))
        }
    }

    const onCellEditingStopped = (data) => {
        let payload = {
            editedPrdouct: data.data,
            allCartProducts: cart.cartProducts
        }
        dispatch(updateProduct(payload))
        hideMessage()
    }
    const hideMessage = () => {
        setTimeout(() => {
            dispatch(hideAlert())
        }, 2000)
    }

    const calculateTotal = (cartProducts) => {
        let total = 0;
        for (let val of cartProducts) {
            total += (val.quantity * val.price)
        }
        return total;
    }

    const handleRemoveFromCart = (selectedCartItemId) => {
        let filteredCart = cart.cartProducts.filter(product => product._id !== selectedCartItemId);
        let finalCart = filteredCart.map((cartProduct, index) => {
            return (
                {
                    ...cartProduct,
                    sNo: index + 1
                }
            )
        })
        dispatch(setCartProducts(finalCart))
    }
    const handleDeleteCart = () => {
        dispatch(setCartEmpty([]))
    }

    const createOrder = (payload) => {
        dispatch(callcreateOrder(payload))
        hideMessage()
    }

    const handleAlert = () => {
        dispatch(showAlert({
            alertState: true,
            alertType: "danger",
            alertMessage: "Please Enter Customer name"
        }))
        setTimeout(() => {
            dispatch(showAlert({
                alertState: false,
                alertType: "",
                alertMessage: ""
            }))
        }, 2000
        )
    }

    return (
        <>
            <WrapperComponent>
                {alert.alertMessage !== "" && <AlertComponent alertState={alert.alertState} alertType={alert.alertType} alertMessage={alert.alertMessage} />}
                {cart.alertMessage !== "" && <AlertComponent alertState={cart.alertState} alertType={cart.alertType} alertMessage={cart.alertMessage} />}
                <div className="wrapper">
                    <div className="left-side">
                        <div className="form-width">
                            {allProducts.length !== 0 &&
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="productName"
                                            onChange={handleChange}
                                            options={allProducts}
                                            placeholder="Choose a Product..."
                                            selected={selectedItem}
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            }
                        </div>
                        {/* <ScannerComponent/> */}
                        {cart.cartProducts.length !== 0 &&
                            <div className="table-height">
                                <DataTableComponent allProducts={finalCart} allColumns={colDefs} onCellEditingStopped={onCellEditingStopped} defaultColDef={defaultColDef} />
                            </div>

                        }
                    </div>
                    <div className="right-side">
                        <CartComponent handleRemoveFromCart={handleRemoveFromCart} handleDeleteCart={handleDeleteCart} createOrder={createOrder} handleAlert={handleAlert} />
                    </div>
                </div>
            </WrapperComponent>
        </>
    )
}

export default Billing