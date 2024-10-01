import React, { useState, useEffect } from 'react'
import "./Billing.css"
import { callAllProducts, updateProduct } from '../../service/Service'
import DataTableComponent from '../data-table/DataTableComponent'
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";


const Billing = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [rowData, setRowData] = useState(cartProducts);
    const [selectedItem, setSelectedItem] = useState("");
    const [colDefs, setColDefs] = useState([{ field: "productName", headerName: 'Product Name' },
    { field: "manufacturerName", headerName: 'Manufacturer Name' },
    { field: "price", headerName: 'Price per unit' },
    { field: "unit" }]);

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
            setSelectedItem(product)
            setCartProducts([
                ...cartProducts,
                product[0]
            ]
            )
        }
    }

    const onCellEditingStopped = (data) => {
        updateProduct(data.data).then(res => {
            console.log(res)
        }
        )
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="wrapper">
            <div className="left-side">
                {allProducts.length !== 0 &&
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Search Product</Form.Label>
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
                {cartProducts.length !== 0 &&
                    <DataTableComponent allProducts={cartProducts} allColumns={colDefs} onCellEditingStopped={onCellEditingStopped} />
                }
            </div>
            <div className="right-side">
                Bill
            </div>
        </div>
    )
}

export default Billing