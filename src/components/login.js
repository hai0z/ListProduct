import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";
import { useHistory } from "react-router-dom";
export default function Login(props) {
  const { onOk, onHide } = props;
  const history = useHistory();
  const { setUser, loginModal, setLoginModal } = React.useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginSuccess, setLoginSuccess] = React.useState("");
  const Login = (username, password) => {
    if (username === "admin" && password === "minh") {
      setUser({ username: username });
      localStorage.setItem("Auth", true);
      setLoginModal(false);
      history.goForward();
      return;
    } else {
      setLoginSuccess("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <div className='container'>
      <Modal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row mt-3'>
            <div className='col-md-6'>
              <div className='form-group'>
                <span>Username(admin)</span>
                <input
                  className='form-control'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <span>Password(minh)</span>
                <input
                  type='password'
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginSuccess && (
                <div className='alert alert-danger'>{loginSuccess}</div>
              )}
              <Button
                mb='2'
                variant='success'
                onClick={() => Login(username, password)}>
                Login
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
