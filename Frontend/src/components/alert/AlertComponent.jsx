import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertComponent = ({ alertMessage, alertType, alertState }) => {
    return (
        <div>
            <Alert show ={alertState} variant={alertType} >
                {alertMessage}
            </Alert>
        </div>
    )
}

export default AlertComponent