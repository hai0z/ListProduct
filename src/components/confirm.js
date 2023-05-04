import React from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";
import { CardContext } from "../context/CardProvider";
function MyModal(props) {
  const { onHide } = props;
  const { setUser } = React.useContext(AuthContext);
  const { setCard } = React.useContext(CardContext);
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Aert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you want to logout</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setUser({});
            localStorage.removeItem("Auth");
            onHide();
            setCard([]);
          }}>
          Yes
        </Button>
        <Button onClick={() => onHide()} variant='danger'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyModal;
