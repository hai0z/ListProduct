import React from "react";

import Navbar from "./navbar";
import Footer from "./footer";

import axios from "axios";

import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";

export default function Shop() {
  const [product, setProduct] = React.useState([]);
  const [subList, setSubList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activePage, setActivePage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filter, setFilter] = React.useState(false);

  const PAGE_SIZE = 6;
  const totalPage = Math.ceil(product.length / PAGE_SIZE);

  const [category, setCategory] = React.useState([]);
  const history = useHistory();
  const [productName, setProductName] = React.useState("");

  const { setUser } = React.useContext(AuthContext);
  const { theme } = React.useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;

  const BTN_CLASS_NAME = isLightTheme
    ? "btn btn-info btn-block mb-1"
    : "btn btn-dark btn-block mb-1";

  const BACKGROUND_COLOR = isLightTheme
    ? light.backgroundColor
    : dark.backgroundColor;

  const TEXT_COLOR = isLightTheme ? light.color : dark.color;

  const CARD_COLOR = isLightTheme ? light.cardColor : dark.cardColor;

  const BADGE_COLOR = isLightTheme
    ? "badge badge-primary"
    : "badge badge-light";

  React.useEffect(() => {
    const getProduct = () => {
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => {
          const data = res.data;
          setProduct(data);
          setSubList(data.slice(0, PAGE_SIZE));
          setCategory(["All", ...new Set(data.map((cate) => cate.category))]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getProduct();
  }, []);

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [subList]);

  React.useEffect(() => {
    const user = localStorage.getItem("Auth");
    if (user) {
      setUser({ username: "admin" });
    }
  }, [setUser]);
  const renderPage = (num) => {
    const arr = [];
    for (let i = 1; i <= num; ++i) {
      arr.push(i);
    }
    return arr.map((page) => (
      <li
        style={{ cursor: "pointer" }}
        className={activePage === page ? "page-item active " : "page-item"}
        key={`page-${page}`}>
        <a
          style={{
            cursor: "pointer",
            backgroundColor: BACKGROUND_COLOR,
            color: TEXT_COLOR,
          }}
          className='page-link'
          href
          onClick={() => {
            loadPage(page);
            setCurrentPage(page);
            setActivePage(page);
          }}>
          {page}
        </a>
      </li>
    ));
  };

  const loadPage = React.useCallback(
    (num) => {
      const end = num * PAGE_SIZE;
      const start = end - PAGE_SIZE;
      setSubList(product.slice(start, end));
    },
    [product]
  );

  const nextPage = (cur) => {
    setCurrentPage((prev) => prev + 1);
    setActivePage(cur + 1);
    loadPage(cur + 1);
  };

  const prevPage = (cur) => {
    setCurrentPage((prev) => prev - 1);
    setActivePage(cur - 1);
    loadPage(cur - 1);
  };

  const filterCategory = async (category) => {
    setIsLoading(true);
    const getData = await (
      await axios.get("https://fakestoreapi.com/products")
    ).data;

    if (category === "All") {
      setProduct(getData);
      setSubList(getData.slice(0, PAGE_SIZE));
      setFilter(false);
      setActivePage(1);
    } else {
      const filterData = getData.filter((cate) => cate.category === category);
      setProduct(filterData);
      setSubList(filterData.slice(0, PAGE_SIZE));
      setFilter(true);
      setActivePage(1);
    }
    setIsLoading(false);
  };

  const search = (productName) => {
    const value = product.filter(
      (product) =>
        product.title.toLowerCase().indexOf(productName.toLowerCase()) !== -1
    );
    setSubList(value);
  };

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_COLOR,
      }}>
      <Navbar />
      <h2
        className='text-center'
        style={{
          marginTop: 55,
          color: TEXT_COLOR,
        }}>
        List Products
      </h2>
      <div className='container'>
        <div class='d-flex flex-column justify-content-between'>
          <div className='d-flex form-inline'>
            <select
              class='form-control'
              id='sel1'
              onChange={(e) => {
                filterCategory(e.target.value);
              }}>
              {category.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className='d-flex mt-1'>
            <div className='form-inline'>
              <input
                className='form-control'
                placeholder='Enter product name '
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <button
                disabled={1}
                class={
                  isLightTheme
                    ? "btn btn-info mx-1 my-1"
                    : "btn btn-light mx-1 my-1"
                }
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  search(productName);
                }}>
                Search <i class='fas fa-search'></i>
              </button>
            </div>
          </div>
        </div>
      </div>

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
          {
            <div className='container padding mt-2'>
              {filter ? (
                <p
                  className={
                    isLightTheme
                      ? "alert alert-info col-md-4"
                      : "alert alert-dark col-md-4"
                  }
                  style={{ fontWeight: 700, color: "#000000" }}>
                  {product.length} results for {product[0].category}
                </p>
              ) : (
                ""
              )}
            </div>
          }
          <div className='container'>
            <div className='row'>
              {subList.map((item, index) => {
                return (
                  <div key={index} className='col-md-4'>
                    <div
                      className='card my-2'
                      style={{
                        minHeight: 620,
                        backgroundColor: CARD_COLOR,
                        color: TEXT_COLOR,
                      }}>
                      <img
                        class='card-img-top p-2'
                        src={item.image}
                        alt='img'
                        height='350'
                      />
                      <div class='card-body'>
                        <h5 class='card-title'>{item.title}</h5>

                        <p class='card-text' className='mb-1'>
                          <span style={{ fontWeight: "bold" }}>Price</span>:{" "}
                          <span class={BADGE_COLOR}>{item.price}$</span>
                        </p>
                      </div>
                      <div className='card-footer'>
                        <p
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            textTransform: "capitalize",
                          }}>
                          Category: {item.category}
                        </p>
                        <button
                          className={BTN_CLASS_NAME}
                          onClick={() => {
                            history.push(`/detail/${item.id}`);
                          }}>
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='container row justify-content-center mt-3'>
              <ul className='pagination'>
                <li
                  style={{
                    cursor: "pointer",
                  }}
                  className={
                    currentPage <= 1 ? "page-item disabled" : "page-item"
                  }>
                  <a
                    className='page-link '
                    href
                    style={{
                      cursor: "pointer",
                      backgroundColor: BACKGROUND_COLOR,
                      color: TEXT_COLOR,
                    }}
                    onClick={() => prevPage(currentPage)}>
                    Previous
                  </a>
                </li>
                {renderPage(totalPage)}
                <li
                  className={
                    currentPage >= totalPage
                      ? "page-item disabled"
                      : "page-item"
                  }>
                  <a
                    className='page-link '
                    href
                    style={{
                      cursor: "pointer",
                      backgroundColor: BACKGROUND_COLOR,
                      color: TEXT_COLOR,
                    }}
                    onClick={() => nextPage(currentPage)}>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
