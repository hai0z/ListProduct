import React from "react";
import { Toast } from "react-bootstrap";
export default function ToastPopup(props) {
  const { show, onClose } = props;
  return (
    <Toast {...props} show={show} onClose={onClose} autohide delay={3000}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Thông báo</strong>
        <small>few second ago</small>
      </Toast.Header>
      <Toast.Body>Thêm vào giỏ hàng thành công</Toast.Body>
    </Toast>
  );
}
