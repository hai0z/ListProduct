import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { CardContext } from "../context/CardProvider";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import { Spinner } from "react-bootstrap";
import AlertModal from "./alertModal";
import Footer from "./footer";
import Toast from "./toast";
export default function Detail() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  const [showToast, setShowToast] = React.useState(false);
  const { id } = useParams();
  const { card, setCard, setShowModal } = React.useContext(CardContext);
  const { user } = React.useContext(AuthContext);
  const { theme } = React.useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const [product, setProduct] = React.useState({});

  const BACKGROUND_COLOR = isLightTheme
    ? light.backgroundColor
    : dark.backgroundColor;

  const BTN_CLASS_NAME = isLightTheme
    ? "btn btn-info mt-4"
    : "btn btn-dark mt-4";

  const TEXT_COLOR = isLightTheme ? light.color : dark.color;

  const JUMBO_COLOR = isLightTheme ? light.jumboColor : dark.jumboColor;

  const BADGE_COLOR = isLightTheme
    ? "badge badge-primary"
    : "badge badge-light";

  const addToCart = () => {
    if (!user.username) {
      setShowModal(true);
    } else {
      const id = product.id;
      const check = card.find((x) => x.id === id);
      if (check) {
        setModalVisible(true);
      } else {
        setShowToast(true);
        setCard([
          ...card,
          {
            ...product,
            quantity: 1,
          },
        ]);
      }
    }
  };
  React.useEffect(() => {
    const getProduct = () => {
      axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
        const data = res.data;
        setProduct(data);
        setIsLoading(false);
      });
    };
    getProduct();
  }, [id]);
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [product]);

  return (
    <div style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Navbar />
      <AlertModal show={modalVisible} onHide={() => setModalVisible(false)} />
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: BACKGROUND_COLOR,
          }}>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : (
        <>
          <div
            className='conatainer'
            style={{
              marginTop: 55,
              minHeight: "100vh",
              backgroundColor: BACKGROUND_COLOR,
            }}>
            <div className='row'>
              <div className='col-md-6 col-xs-12 col-sm-12 text-center mt-4'>
                <img src={product.image} alt='img' height='400' width='400' />
              </div>
              <div className='col-md-6 col-xs-12 col-sm-12 mt-4'>
                <div
                  className='jumbotron'
                  style={{
                    backgroundColor: JUMBO_COLOR,
                    color: TEXT_COLOR,
                  }}>
                  <h2>{product.title} </h2>
                  <p style={{ fontWeight: "bold" }}>
                    Price: <span class={BADGE_COLOR}>{product.price}$</span>
                  </p>
                  <h5 style={{ textTransform: "capitalize" }} className='mt-2'>
                    About this item:
                  </h5>
                  <p>{product.description}</p>

                  <button
                    className={BTN_CLASS_NAME}
                    onClick={() => {
                      addToCart();
                    }}>
                    Add to cart
                  </button>
                </div>
              </div>
              <div className='container-fluid '>
                <Toast show={showToast} onClose={() => setShowToast(false)} />
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
