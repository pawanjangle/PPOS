import React, { useState, useEffect, useReducer } from 'react'
import "./Billing.css"
import { callAllProducts, callcreateOrder, updateProduct } from '../../service/Service'
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
import WrapperComponent from '../wrapper/WrapperComponent';
import { addProductToCart, fetchProducts } from "../../redux/features/CartSlice"

const Billing = () => {
    const alert = useSelector((state) => state.alert)
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
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
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
      dispatch(fetchProducts());  
    }, [])

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
            // setTotal(calculateTotal(allCartProduct));
            let total = calculateTotal(allCartProduct)
            dispatch(addProductToCart({ product: product[0], total }))
            // setCartProducts(allCartProduct)
        }
    }

    const onCellEditingStopped = (data) => {
        updateProduct(data.data).then(res => {
            cartProducts.map(obj => cartProducts.find(o => o._id === obj._id) || data.data);
            setCartProducts(cartProducts)
            setTotal(calculateTotal(cartProducts));
            dispatch(showAlert({
                alertState: true,
                alertType: "success",
                alertMessage: res.data.message
            }))
            setTimeout(() => {
                dispatch(showAlert({
                    alertState: false,
                    alertType: "",
                    alertMessage: ""
                }))
            }, 2000
            )
            forceUpdate();
        }
        )
            .catch(err => {
                console.log(err)
            })
    }

    const calculateTotal = (cartProducts) => {
        let total = 0;
        for (let val of cartProducts) {
            total += (val.quantity * val.price)
        }
        return total;
    }

    const handleRemoveFromCart = (selectedCartItemId) => {
        let filteredCart = cartProducts.filter(product => product._id !== selectedCartItemId);
        let finalCart = filteredCart.map((cartProduct, index) => {
            return (
                {
                    ...cartProduct,
                    sNo: index + 1
                }
            )
        })
        calculateTotal(finalCart)
        setTotal(calculateTotal(finalCart));
        setCartProducts(finalCart)
    }
    const handleDeleteCart = () => {
        setTotal(0);
        setCartProducts([])
    }

    const createOrder = (payload) => {
        callcreateOrder(payload).then((res => {
            if (res.status == 200) {
                dispatch(showAlert({
                    alertState: true,
                    alertType: "success",
                    alertMessage: res.data.message
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
        }));
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
                <AlertComponent alertState={alert.alertState} alertType={alert.alertType} alertMessage={alert.alertMessage} />
                <div className="wrapper">
                    <div className="left-side">
                        <div className="form-width">
                            {cart.allProducts.length !== 0 &&
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Typeahead
                                            id="basic-typeahead-single"
                                            labelKey="productName"
                                            onChange={handleChange}
                                            options={cart.allProducts}
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
                            <DataTableComponent allProducts={cart.cartProducts} allColumns={colDefs} onCellEditingStopped={onCellEditingStopped} defaultColDef={defaultColDef} />
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