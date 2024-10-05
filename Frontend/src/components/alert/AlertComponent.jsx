import React from 'react'

const AlertComponent = ({ alertMessage, alertType }) => {
    return (
        <div>
            <Alert variant={alertType} >
                {alertMessage}
            </Alert>
        </div>
    )
}

export default AlertComponent