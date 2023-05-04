import { StrictMode } from "react";
import ReactDOM from "react-dom";
import AuthProvider from "./context/AuthProvider";
import CardProvider from "./context/CardProvider";
import ThemeProvider from "./context/ThemeProvider";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <CardProvider>
          <App />
        </CardProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
  rootElement
);
