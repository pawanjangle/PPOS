import React, { useState, useEffect, useReducer } from 'react'
import "./Billing.css"
import { callAllProducts, updateProduct } from '../../service/Service'
import DataTableComponent from '../data-table/DataTableComponent'
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Html5QrcodeScanner } from "html5-qrcode"
import ScannerComponent from '../scannerComponent/ScannerComponent';
import CartComponent from '../cart/CartComponent';


const Billing = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [rowData, setRowData] = useState(cartProducts);
    const [selectedItem, setSelectedItem] = useState("");
    const [total, setTotal] = useState(0);
    const [colDefs, setColDefs] = useState([{
        field: "sNo", headerName: 'S. No.', width: 100,
    }, {
        field: "productName", headerName: 'Product Name', editable: true
    },
    { field: "quantity", width: 100, editable: true },
    { field: "manufacturerName", headerName: 'Manufacturer Name', editable: true },
    { field: "price", headerName: 'Price per unit', width: 100, editable: true },
    { field: "unit", width: 100, editable: true },
    ]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        handleAllProducts()
    }, [])

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
        filter: true,
        sortable: true,
    }


    const handleChange = (product) => {
        if (product.length == 0 || cartProducts.includes(product[0])) {
            setSelectedItem(product)
            return
        }
        if (product.length !== 0) {
            product[0].quantity = 1;
            product[0].sNo = cartProducts.length + 1,
                setSelectedItem(product)
            let allCartProduct = [
                ...cartProducts,
                product[0],
            ]
            setTotal(calculateTotal(allCartProduct));
            setCartProducts(allCartProduct)
        }
    }

    const onCellEditingStopped = (data) => {
        updateProduct(data.data).then(res => {
            cartProducts.map(obj => cartProducts.find(o => o._id === obj._id) || data.data);
            console.log(cartProducts)

            setCartProducts(cartProducts)
            setTotal(calculateTotal(cartProducts));
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
        console.log(finalCart)
        calculateTotal(finalCart)
        setTotal(calculateTotal(finalCart));
        setCartProducts(finalCart)
    }
    const handleDeleteCart = () => {
        setTotal(0);
        setCartProducts([])
    }

    return (
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
                {cartProducts.length !== 0 &&
                    <DataTableComponent allProducts={cartProducts} allColumns={colDefs} onCellEditingStopped={onCellEditingStopped} defaultColDef={defaultColDef} />
                }
            </div>
            <div className="right-side">
                <CartComponent cartProducts={cartProducts} total={total} handleRemoveFromCart={handleRemoveFromCart} handleDeleteCart={handleDeleteCart} />
            </div>
        </div>
    )
}

export default Billing