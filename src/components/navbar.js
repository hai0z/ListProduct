import React from "react";
import { Form, Dropdown, ButtonGroup } from "react-bootstrap";
import { CardContext } from "../context/CardProvider";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import Confirm from "./confirm";
import "./nav.css";
export default function Navbar() {
  const { card } = React.useContext(CardContext);
  const history = useHistory();
  const { user, setLoginModal } = React.useContext(AuthContext);
  const [confirmModal, setConfirmModal] = React.useState(false);
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;

  const [isSwitchOn, setIsSwitchOn] = React.useState(!isLightTheme);

  const NAV_COLOR = isLightTheme ? light.navbarColor : dark.navbarColor;

  const onSwitchAction = () => {
    setIsSwitchOn(!isSwitchOn);
    setTheme({ ...theme, isLightTheme: !isLightTheme });
  };

  return (
    <div>
      <Confirm show={confirmModal} onHide={() => setConfirmModal(false)} />
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ backgroundColor: NAV_COLOR, opacity: 0.95 }}
      >
        <a
          class="navbar-brand"
          href
          onClick={() => history.push("/")}
          style={{ cursor: "pointer" }}
        >
          Shop
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a
                class="nav-link"
                href
                onClick={() => history.push("/")}
                style={{ cursor: "pointer" }}
              >
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {user.username ? (
                <div className="text-white">
                  <span>Wellcome {user.username}</span>
                </div>
              ) : (
                <a
                  href
                  className="text-white"
                  type="button"
                  onClick={() => setLoginModal(true)}
                >
                  Login
                </a>
              )}
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href
                onClick={() => history.push("/cart")}
                style={{ cursor: "pointer" }}
              >
                <div style={{ position: "relative" }}>
                  <i
                    class="fas fa-shopping-cart"
                    style={{
                      fontSize: "1.3rem",
                      color: "#fff",
                      zIndex: 0,
                      position: "relative",
                      left: 1
                    }}
                  ></i>
                  <div
                    className="badge badge-pill badge-danger"
                    style={{
                      position: "relative",
                      top: -10,
                      right: 7,
                      backgroundColor: "red",
                      textAlign: "center",
                      opacity: 0.7,
                      color: "#fff",
                      zIndex: 1
                    }}
                  >
                    {card.length}
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <Dropdown as={ButtonGroup}>
              <i
                class="fas fa-cog"
                style={{
                  fontSize: "1.3rem",
                  color: "white",
                  Index: 0,
                  position: "relative",
                  left: 0,
                  top: -2
                }}
              ></i>

              <Dropdown.Toggle
                split
                variant="light"
                id="dropdown-split-basic"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "none",
                  position: "relative",
                  top: 0,
                  right: 0,
                  textAlign: "center",
                  zIndex: 1,
                  display: "inherit"
                }}
              />

              <Dropdown.Menu style={{ padding: 15 }}>
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Dark theme"
                    checked={isSwitchOn}
                    onChange={onSwitchAction}
                  />
                  {user.username ? (
                    <span
                      type="button"
                      className={
                        isLightTheme
                          ? "btn btn-sm btn-info mt-1"
                          : "btn btn-sm btn-dark mt-1"
                      }
                      onClick={() => setConfirmModal(true)}
                    >
                      Logout
                    </span>
                  ) : (
                    ""
                  )}
                </Form>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </nav>
    </div>
  );
}
