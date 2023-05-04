import React from "react";
import { CardContext } from "../context/CardProvider";
import { ThemeContext } from "../context/ThemeProvider";
import Navbar from "./navbar";
import Footer from "./footer";
export default function Cart() {
  
  const { card, setCard } = React.useContext(CardContext);
  const { theme } = React.useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;

  const BTN_CLASS_NAME = isLightTheme
    ? "btn btn-info  mt-1"
    : "btn btn-dark  mt-1";

  const BACKGROUND_COLOR = isLightTheme
    ? light.backgroundColor
    : dark.backgroundColor;

  const TEXT_COLOR = isLightTheme ? light.color : dark.color;

  let total = 0;

  for (let item of card) {
    total += item.price * item.quantity;
  }

  const updateQuantity = (id, operator) => {
    if (operator === "+") {
      setCard((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCard((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const removeFromCart = (id) => {
    setCard((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Navbar />
      <div className="col-12">
        <table
          className="table table-striped"
          style={{
            marginTop: 55,

            backgroundColor: BACKGROUND_COLOR,
            minHeight: "80vh"
          }}
        >
          {card.length > 0 ? (
            <thead style={{ textAlign: "center", color: TEXT_COLOR }}>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </thead>
          ) : (
            <p
              className="text-center p-3"
              style={{ height: "80vh", marginTop: 70, color: TEXT_COLOR }}
            >
              Cart is empty
            </p>
          )}
          <tbody>
            {card.map((item) => {
              return (
                <tr style={{ textAlign: "center", color: TEXT_COLOR }}>
                  <td className="text-left">
                    {item.title}
                    <img
                      src={item.image}
                      width="50"
                      className="p-2"
                      alt="img"
                    />
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        type="button"
                        class={BTN_CLASS_NAME}
                        onClick={() => updateQuantity(item.id, "-")}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <button type="button" class={BTN_CLASS_NAME}>
                        {item.quantity}
                      </button>
                      <button
                        type="button"
                        class={BTN_CLASS_NAME}
                        onClick={() => updateQuantity(item.id, "+")}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{item.price}$</td>
                  <td>{(item.price * item.quantity).toFixed(2)}$</td>
                  <td>
                    <button
                      className={BTN_CLASS_NAME}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p
          className="p-3 "
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            backgroundColor: BACKGROUND_COLOR,
            color: TEXT_COLOR
          }}
        >
          {card.length > 0 ? <p>Total : {total.toFixed(2)}$</p> : ""}
        </p>
      </div>
      <Footer />
    </div>
  );
}
