import React, { useState, useEffect } from 'react'
import "./Inventory.css"
import { Button } from "react-bootstrap"
import DataTableComponent from '../data-table/DataTableComponent'
import CommonModal from '../common/commonmodal/CommonModal'
import Form from 'react-bootstrap/Form';
import { callAllProducts, createProductfunction } from '../../service/Service'

const Inventory = () => {
  const [formData, setFormData] = useState({
    productName: "",
    manufacturerName: "",
    price: "",
    unit: "",
    description: "",
    category: ""
  })
  const [show, setShow] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [rowData1, setRowData1] = useState([]);
  useEffect(() => {
    handleAllProducts()
  }, []);

  const colDefs = [
    { field: "srNo"},
    { field: "productName", headerName: 'Product Name' },
    { field: "manufacturerName", headerName: 'Manufacturer Name'},
    { field: "description"},
    { field: "price", headerName: 'Price per unit'},
    { field: "unit" },
    { field: "category"},
    { field: "actions"},

  ]

  const handleAllProducts = () => {
    callAllProducts().then(res => {
      if (res.status == 200) {
        setAllProducts(res.data.products)
        let data = res.data.products.length !== 0 && res.data.products.map((val, index) => {
          return (
            {
              srNo : index+1,
              productName: val.productName,
              manufacturerName: val.manufacturerName,
              description: val.description,
              price: val.price,
              unit: val.unit,
              category: val.category,
            }
          )
        })
        setRowData1(data)
        console.log(data)
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    }
    )
  }
  const handleSubmit = () => {
    console.log(formData)
    createProductfunction(formData).then(res => {
      if (res.status == 200) {
        console.log(res.data.message)
        handleAllProducts()
      }
      else if (res.status == 400) {
        console.log(res.data.message)
      }
    })
      .catch(err => {
        console.log(err)
      })
  }
  const modalBody = <div>
    <Form>
      <Form.Group className="mb-3" controlId="formProduct">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product Name" name="productName" value={formData.productName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formProduct">
        <Form.Label>Manufacturer Name</Form.Label>
        <Form.Control type="text" placeholder="Manufacturer Name" name="manufacturerName" value={formData.manufacturerName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formdescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price in Rs.</Form.Label>
        <Form.Control type="number" placeholder="Price" name="price" value={formData.price} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUnit">
        <Form.Label>Unit</Form.Label>
        <Form.Select aria-label="unit" name="unit" value={formData.unit} onChange={handleChange}>
          <option>select Unit</option>
          <option value="kg">KG</option>
          <option value="litre">litre</option>
          <option value="piece">Piece</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="number" placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
      </Form.Group>
    </Form>
  </div>

  return (
    <>
      <div className="main-container">
        <div className="heading-style">
          <h5>Stocks Inventory</h5>
          <Button variant="dark">Import Product</Button>
        </div>
        <Button className="add-button" onClick={handleShow}>Create Product</Button>
        <CommonModal show={show} handleClose={handleClose} modalHeading="Create Product" modalBody={modalBody} submitModalButton="Create Product" handleSubmit={handleSubmit} />
      </div>
      {rowData1.length !== 0 &&
        <DataTableComponent rowData1={rowData1} colDefs1={colDefs} />
      }
    </>
  )
}

export default Inventory