import React, { useState, useEffect } from 'react'
import "./Inventory.css"
import { Button } from "react-bootstrap"
import DataTableComponent from '../data-table/DataTableComponent'
import CommonModal from '../common/commonmodal/CommonModal'
import Form from 'react-bootstrap/Form';
import { callAllProducts, createProductfunction } from '../../service/Service'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";


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
  useEffect(() => {
    handleAllProducts()
  }, []);


  const colDefs = [
    { field: "srNo", width: 100 },
    { field: "productName", headerName: 'Product Name' },
    { field: "manufacturerName", headerName: 'Manufacturer Name' },
    { field: "description" },
    { field: "price", headerName: 'Price per unit', width: 100 },
    { field: "unit", width: 100 },
    { field: "category" }
  ]

  const handleAllProducts = () => {
    callAllProducts().then(res => {
      if (res.status == 200) {
        let data = res.data.products.length !== 0 && res.data.products.map((val, index) => {
          return (
            {
              ...val,
              srNo: index + 1,
            }
          )
        })
        setAllProducts(data)
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
        <div className="heading-div">
          <h5>Stocks Inventory</h5>
          <div className="heading-style">
            <Button variant="dark" className="import-button">Import Product</Button>
            <Button className="add-button" onClick={handleShow}>Create Product</Button>
          </div>
        </div>

        <CommonModal show={show} handleClose={handleClose} modalHeading="Create Product" modalBody={modalBody} submitModalButton="Create Product" handleSubmit={handleSubmit} />
      </div>

      {allProducts.length !== 0 &&
        <DataTableComponent allProducts={allProducts} allColumns={colDefs} />
      }


    </>
  )
}

export default Inventory