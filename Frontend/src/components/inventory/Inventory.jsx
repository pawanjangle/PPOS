import React, { useState } from 'react'
import "./Inventory.css"
import { Button } from "react-bootstrap"
import DataTableComponent from '../data-table/DataTableComponent'
import CommonModal from '../common/commonmodal/CommonModal'
import Form from 'react-bootstrap/Form';


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

  }
  const modalBody = <div>
    <Form>
      <Form.Group className="mb-3" controlId="formProduct">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Product Name" name="productName" value={formData.productName} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formProduct">
        <Form.Label>Manufacturer Name</Form.Label>
        <Form.Control type="text" placeholder="Manufacturer Name" name="manufacturerName" value={formData.manufacturerName} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formdescription">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description" name="description" value={formData.description} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price in Rs.</Form.Label>
        <Form.Control type="number" placeholder="Price" name="Price" value={formData.price} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formUnit">
        <Form.Label>Unit</Form.Label>
        <Form.Select aria-label="unit" name="unit" value={formData.unit}>
          <option>select Unit</option>
          <option value="kg">KG</option>
          <option value="litre">litre</option>
          <option value="piece">Piece</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="number" placeholder="Category" name="category" value={formData.category} />
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
      <DataTableComponent />
    </>
  )
}

export default Inventory