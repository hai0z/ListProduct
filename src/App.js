import "./styles.css";
import Shop from "./components/shop";
import Cart from "./components/cart";
import Login from "./components/login";
import Modal from "./components/modal";
import Detail from "./components/detail";
import { BrowserRouter, Route, Switch } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Shop} path='/' exact />
        <Route component={Cart} path='/cart' exact />
        <Route component={Detail} path='/detail/:id' />
      </Switch>
      <Login />
      <Modal />
    </BrowserRouter>
  );
}
