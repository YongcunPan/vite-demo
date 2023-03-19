import React from "react";
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import intl from "react-intl-universal";
import zhCN from "./locales/cn.json";
import enUS from "./locales/en.json";
import "intl/locale-data/jsonp/en.js";
import "intl/locale-data/jsonp/zh.js";
import { useEffect, useState } from "react";
import { t } from "./utils/functions";

const locales = { "en-US": enUS, "zh-CN": zhCN };

export default function App() {
  const navigate = useNavigate();
  const { pathname, state, search } = useLocation();
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en-US");
  useEffect(() => {
    setLoading(true);
    intl
      .init({
        currentLocale: lang,
        locales,
      })
      .then(() => {
        navigate(`${pathname}${search}`, { state, replace: true });
        setLoading(false);
      });
  }, [lang]);

  const onChange = () => {
    const v = intl.getInitOptions().currentLocale;
    setLang(v === "en-US" ? "zh-CN" : "en-US");
  };

  if (loading) return <>loading...</>;

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<>slash-slash</>} />
          <Route path="index" element={<div>slash-index</div>} />
          <Route path="about" element={<About />} />
          <Route path="home" element={<Home />} />
          <Route path="space/*" element={<CustomComponent />} />
          <Route path="user/*" element={<CustomComponent />} />
          {/* <Route path="*" element={<div>slash-404</div>} /> */}
        </Route>
      </Routes>
      <div onClick={onChange}>todo-----common</div>
    </>
  );
}

const CustomComponent = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<SlashComponent pathname={pathname} />}>
          <Route index element={<div>{pathname}-index</div>} />
          <Route path="content" element={<div>{pathname}-content</div>} />
          <Route path="nav/*" element={<CustomComponent />} />
          <Route
            path="*"
            element={<div onClick={() => navigate(-1)}>{pathname}-404</div>}
          />
        </Route>
        <Route
          path="*"
          element={<div onClick={() => navigate(-1)}>{pathname}-404</div>}
        />
      </Routes>
    </>
  );
};

const Home = () => {
  return (
    <div>
      <div>{t("home")}</div>
      <a href="/app2">toApp2</a>
    </div>
  );
};

const About = () => {
  return <div>{t("about")}</div>;
};

const SlashComponent = ({ pathname }) => {
  return (
    <>
      <div>---{pathname}-Index</div>
      <div>---SlashComponent</div>
      <Outlet />
    </>
  );
};
