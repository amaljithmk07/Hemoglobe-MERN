import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from "react-redux";
import Store from "./redux/store/Store";
import Loader from "./components/loader/Loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ParallaxProvider>
    <Provider store={Store}>
      <App />
      {/* <Loader /> */}
    </Provider>
  </ParallaxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
