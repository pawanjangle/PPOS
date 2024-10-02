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
import ScannerComponent from '../ScannerComponent/ScannerComponent';
import CartComponent from '../cart/CartComponent';


const Billing = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [rowData, setRowData] = useState(cartProducts);
    const [selectedItem, setSelectedItem] = useState("");
    const [total, setTotal] = useState(0);
    const [colDefs, setColDefs] = useState([{ field: "productName", headerName: 'Product Name' },
    { field: "quantity" },
    { field: "manufacturerName", headerName: 'Manufacturer Name' },
    { field: "price", headerName: 'Price per unit' },
    { field: "unit" },
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
        editable: true
    }


    const handleChange = (product) => {
        setSelectedItem(product)
        if (product.length !== 0) {
            product[0].quantity = 1;
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
        let finalCart = cartProducts.filter(product => product._id !== selectedCartItemId);
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
                                {/* <Form.Label>Search Product</Form.Label> */}
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
                    <DataTableComponent allProducts={cartProducts} allColumns={colDefs} onCellEditingStopped={onCellEditingStopped} />
                }
            </div>
            <div className="right-side">
                <CartComponent cartProducts={cartProducts} total={total} handleRemoveFromCart={handleRemoveFromCart} handleDeleteCart={handleDeleteCart} />
            </div>
        </div>
    )
}

export default Billing