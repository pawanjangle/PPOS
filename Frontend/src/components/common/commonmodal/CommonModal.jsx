import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap"

const CommonModal = ({show, handleClose, modalHeading, modalBody, submitModalButton, handleSubmit}) => {
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {submitModalButton}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default CommonModal