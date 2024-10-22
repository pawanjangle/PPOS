import React, { useState } from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isEmpty, checkEmail, checkContactNo } from '../../shared/validations'
import { signupFunction } from '../../service/Service';
import { showAlert } from '../../redux/features/AlertSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlertComponent from '../alert/AlertComponent';

const SignUpComponent = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state=>state.alert)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNo: "",
    })
    const [errors, setErrors] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: "",
        contactNoError: "",
    })

    const [errorMessages, setErrorMessages] = useState({ firstNameErrorMessage: "Please Enter First Name", lastNameErrorMessage: "Please Enter Last Name", emailErrorMessage: "Please Enter correct email", passwordErrorMessage: "Please Enter Password", contactNoErrorMessage: "Please Enter Contact No" })
    const [mandatory, setMandatory] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        switch (name) {
            case "firstName":
                if (isEmpty(value)) {
                    setErrors({
                        ...errors,
                        firstNameError: errorMessages.firstNameErrorMessage
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        firstNameError: ""
                    })
                }
                break;
            case "lastName":
                if (isEmpty(value)) {
                    setErrors({
                        ...errors,
                        lastNameError: errorMessages.lastNameErrorMessage
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        lastNameError: ""
                    })
                }
                break;
            case "email":
                if (checkEmail(value)) {
                    setErrors({
                        ...errors,
                        emailError: errorMessages.emailErrorMessage
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        emailError: ""
                    })
                }
                break;
            case "password":
                if (isEmpty(value)) {
                    setErrors({
                        ...errors,
                        passwordError: errorMessages.passwordErrorMessage
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        passwordError: ""
                    })
                }
                break;
            case "contactNo":
                if (checkContactNo(value)) {
                    setErrors({
                        ...errors,
                        contactNoError: errorMessages.contactNoErrorMessage
                    })
                }
                else {
                    setErrors({
                        ...errors,
                        contactNoError: ""
                    })
                }
                break;
            default: return;
        }
    }

    const resetForm = ()=>{
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            contactNo: "",
        });
        setErrors({
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            contactNoError: "",
        })
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        if (errors.firstNameError !== "" || errors.lastNameError !== "" || errors.emailError !== "" || errors.passwordError !== "" || errors.contactNoError !== "") {
            setMandatory("Please Enter all mandatory fields")
            return
        }
        setMandatory("")
        signupFunction(formData).then(res => {
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
                resetForm()
            }
        })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <div className="main-card">
                    <div className="left">
                        <AlertComponent alertState={alert.alertState} alertType={alert.alertType} alertMessage={alert.alertMessage} />
                        <h5 className="text-center">Sign Up</h5>
                        <form>
                            <Form.Group className="mb-3" controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                {errors.firstNameError !== "" && <p className="error-style">{errors.firstNameError}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                {errors.lastNameError !== "" && <p className="error-style">{errors.lastNameError}</p>}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            {errors.emailError !== "" && <p className="error-style">{errors.emailError}</p>}
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>
                            {errors.passwordError !== "" && <p className="error-style">{errors.passwordError}</p>}
                            <Form.Group className="mb-3" controlId="formContactNo">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="number" placeholder="Contact Number" name="contactNo" value={formData.contactNo} onChange={handleChange} required />
                            </Form.Group>
                            {errors.contactNoError !== "" && <p className="error-style">{errors.contactNoError}</p>}
                            <Button className="sign-in-button" onClick={handleSignUp}>Sign Up</Button>
                            {mandatory !== "" && <p className="error-style">{mandatory}</p>}
                        </form>
                    </div>
                    <div className="right">
                        <h3>Welcome to Sign Up</h3>
                        <p>Already have an account?</p>
                        <Link to="/signin"> <Button className="sign-up-button">Sign In</Button></Link>
                    </div>
                </div>

            </Card>
        </div>)
}

export default SignUpComponent