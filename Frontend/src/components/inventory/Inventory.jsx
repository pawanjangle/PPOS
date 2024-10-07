import React, { useState, useEffect } from 'react'
import "./Inventory.css"
import { Button } from "react-bootstrap"
import DataTableComponent from '../data-table/DataTableComponent'
import CommonModal from '../common/commonmodal/CommonModal'
import Form from 'react-bootstrap/Form';
import { callAllProducts, createProductfunction, callDeleteProduct, updateProduct } from '../../service/Service'
import { MdDeleteForever } from "react-icons/md";
import { isEmpty } from '../../shared/validations'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from '../../redux/features/AlertSlice'
import AlertComponent from '../alert/AlertComponent'

const Inventory = () => {
  const alert = useSelector((state) => state.alert)
  const dispatch = useDispatch();

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
  const [errors, setErrors] = useState({ productNameError: "", priceError: "", unitError: "" })
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessages, setErrorMessages] = useState({ productErrorMessage: "Please Enter Product Name", priceErrorMessage: "Please Enter Price", unitErrorMessage: "Please Select Unit" })

  useEffect(() => {
    handleAllProducts()
  }, []);

  const handleDelete = (productData) => {
    callDeleteProduct(productData._id).then(res => {
      if (res.status === 200) {
        handleAllProducts()
      }
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
  }

  const colDefs = [
    { field: "srNo", width: 100 },
    { field: "productName", headerName: 'Product Name', editable: true },
    { field: "manufacturerName", headerName: 'Manufacturer Name', width: 150, editable: true },
    { field: "description", editable: true },
    { field: "price", headerName: 'Price per unit', width: 100, editable: true },
    { field: "unit", width: 100, editable: true },
    { field: "category", editable: true },
    {
      field: "Actions", headerName: "Actions", width: "100px", cellRenderer: (params) => <div>
        <MdDeleteForever style={{ color: "red", height: "40px" }} onClick={() => {
          handleDelete(params.data)
        }} />
      </div>
    }
  ]
  const defaultColDef = {
    filter: true,
    sortable: true,
    // floatingFilter: true
  }

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
    switch (event.target.name) {
      case "productName":
        if (isEmpty(event.target.value)) {
          setErrors({
            ...errors,
            productNameError: errorMessages.productErrorMessage
          })
        }
        else {
          setErrors({
            ...errors,
            productNameError: ""
          })
        }
        break;
      case "price":
        if (isEmpty(event.target.value)) {
          setErrors({
            ...errors,
            priceError: errorMessages.priceErrorMessage
          })
        }
        else {
          setErrors({
            ...errors,
            priceError: ""
          })
        }
        break;
      case "unit":
        if (isEmpty(event.target.value)) {
          setErrors({
            ...errors,
            unitError: errorMessages.unitErrorMessage
          })
        }
        else {
          setErrors({
            ...errors,
            unitError: ""
          })
        }
        break;
      default: return;
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.productName == "" || formData.price == "" || formData.unit == "") {
      return
    }
    createProductfunction(formData).then(res => {
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
        handleAllProducts()
      }
      else if (res.status == 400) {
        dispatch(showAlert({
          alertState: true,
          alertType: "danger",
          alertMessage: res.response.data.message
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
      handleClose()
    })
      .catch(err => {
        console.log(err)
      })
  }

  const onCellEditingStopped = (data) => {
    updateProduct(data.data).then(res => {
      if (res.status === 200) {
        allProducts.map(obj => allProducts.find(o => o._id === obj._id) || data.data);
        setAllProducts(allProducts)
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
    }
    )
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
      {errors.productNameError !== "" && <p className="error-style">{errors.productNameError}</p>}
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
      {errors.priceError !== "" && <p className="error-style">{errors.priceError}</p>}

      <Form.Group className="mb-3" controlId="formUnit">
        <Form.Label>Unit</Form.Label>
        <Form.Select aria-label="unit" name="unit" value={formData.unit} onChange={handleChange}>
          <option>select Unit</option>
          <option value="kg">KG</option>
          <option value="kg">G</option>
          <option value="litre">litre</option>
          <option value="piece">Piece</option>
        </Form.Select>
      </Form.Group>
      {errors.unitError !== "" && <p className="error-style">{errors.unitError}</p>}

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Category" name="category" value={formData.category} onChange={handleChange} />
      </Form.Group>
    </Form>
  </div>

  return (
    <>
      <div className="main-container">
        <AlertComponent alertState={alert.alertState} alertType={alert.alertType} alertMessage={alert.alertMessage} />
        <div className="heading-div">
          <h5>Stocks Inventory</h5>
          <div className="heading-style">
            {/* <Button variant="dark" className="import-button">Import Product</Button> */}
            <Button className="add-button" onClick={handleShow}>Create Product</Button>
          </div>
        </div>

        <CommonModal show={show} handleClose={handleClose} modalHeading="Create Product" modalBody={modalBody} submitModalButton="Create Product" handleSubmit={handleSubmit} />
      </div>

      {allProducts.length !== 0 &&
        <DataTableComponent allProducts={allProducts} allColumns={colDefs} rowSelection="single" defaultColDef={defaultColDef} onCellEditingStopped={onCellEditingStopped} />
      }


    </>
  )
}

export default Inventory