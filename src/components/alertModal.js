import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function MyModal(props) {
  const { onHide } = props;
  const history = useHistory();
  return (
    <div className="container-fluid">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Products already in the cart</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => history.push("/cart")}>Go to cart</Button>
          <Button onClick={() => onHide()} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default MyModal;
