import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
// import App from "./App";
import App from "./Routers";
import "./index.less";

let root;
function render(props) {
  const container = props?.container
    ? props?.container.querySelector("#react-vite")
    : document.getElementById("react-vite");
  root = createRoot(container);
  const basename = props?.base || "/";
  root.render(
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  );
}

const initQianKun = () => {
  renderWithQiankun({
    // 当前应用在主应用中的生命周期
    // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

    mount(props) {
      console.log("开始了", props);
      render(props);
    },
    bootstrap(props) {
      console.log("bootstrap", props);
    },
    unmount(props) {
      console.log("注销了", props);
      root.unmount();
    },
  });
};

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
