import React from "react";
import { ThemeContext } from "../context/ThemeProvider";
export default function Footer() {
  const { theme } = React.useContext(ThemeContext);
  const { isLightTheme, light, dark } = theme;
  const FOOTER_COLOR = isLightTheme ? light.footerColor : dark.footerColor;
  return (
    <footer
      class='foodter mt-3'
      style={{ backgroundColor: FOOTER_COLOR, color: "#fff" }}>
      <div class='container-fluid padding'>
        <div class='row text-center'>
          <div class='col-md-4'>
            <hr className='bg-light' />
            <p>0963805034</p>
            <p>dangcongxuanminh@gmail.com</p>
            <p>Ha Noi, Viet Nam</p>
          </div>
          <div class='col-md-4'>
            <hr class='bg-light' />
            <p class='my-4'>Working hour</p>
            <hr class='bg-light' />
            <p>Monday-Friday: 8am-5pm</p>
            <p>Weekend: 8am-12am</p>
          </div>
          <div class='col-md-4'>
            <hr class='bg-light' />
            <p class='my-4'>Service</p>
            <hr class='bg-light' />
            <p>Outsourcing</p>
            <p>Front End development</p>
            <p>Web development</p>
          </div>
          <div className='col-12'>Design by Ming</div>
        </div>
      </div>
    </footer>
  );
}
