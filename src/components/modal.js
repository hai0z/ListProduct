import React from "react";
import { Modal, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";
import { CardContext } from "../context/CardProvider";
function MyModal(props) {
  const { onHide } = props;
  const { setLoginModal } = React.useContext(AuthContext);
  const { showModal, setShowModal } = React.useContext(CardContext);
  return (
    <Modal
      {...props}
      show={showModal}
      size='lg'
      onHide={() => setShowModal(false)}
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Login to continue?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setLoginModal(true);
            setShowModal(false);
          }}>
          Login
        </Button>
        <Button onClick={() => setShowModal(false)} variant='danger'>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyModal;
