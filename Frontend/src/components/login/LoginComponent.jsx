import React, { useState } from 'react'
import "./LoginComponent.css"
import { Form, Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isEmpty, checkEmail } from '../../shared/validations'
import { signinFunction } from '../../service/Service'
import { showAlert } from '../../redux/features/AlertSlice';
import { useSelector, useDispatch } from 'react-redux';
import AlertComponent from '../alert/AlertComponent';

const LoginComponent = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state => state.alert)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: ""
    })
    const [errorMessages, setErrorMessages] = useState({ emailErrorMessage: "Please Enter correct email", passwordErrorMessage: "Please Enter Password" })
    const [mandatory, setMandatory] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        switch (name) {
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
            default: return;
        }
    }
    const resetForm = () => {
        setFormData({
            email: "",
            password: "",
        });
        setErrors({
            emailError: "",
            passwordError: ""
        })
    }


    const handleSignIn = (e) => {
        e.preventDefault();
        if (errors.emailError !== "" || errors.passwordError !== "") {
            setMandatory("Please Enter all mandatory fields")
            return
        }
        setMandatory("")
        signinFunction(formData).then(res => {
            if (res.status === 200) {
                resetForm();
                localStorage.setItem("token", res.data.token);
                navigate("/")
            }
            else if (res.status === 401) {
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
                        <h5 className="text-center">Sign In</h5>
                        <form>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            {errors.emailError !== "" && <p className="error-style">{errors.emailError}</p>}
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>
                            {errors.passwordError !== "" && <p className="error-style">{errors.passwordError}</p>}
                            <Button className="sign-in-button" onClick={handleSignIn}>Sign In</Button>
                            {mandatory !== "" && <p className="error-style">{mandatory}</p>}
                            <Link to="/reset">Forgot Password ?</Link>
                        </form>
                        <div className="pl-2">
                            <p>Dummy credentials</p>
                            <p>email: admin@gmail.com</p>
                            <p className>password: 123456</p>
                        </div>
                    </div>
                    <div className="right">
                        <h3>Welcome to login</h3>
                        <p>Don't have an account?</p>
                        <Link to="/signup"> <Button className="sign-up-button">Sign UP</Button></Link>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default LoginComponent