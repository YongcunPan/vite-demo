import React, { useEffect, useState /* useCallback */ } from "react";
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
import { t } from "./utils/functions";
import ResizeObserver from "rc-resize-observer";

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
  const [h, setH] = useState(80);

  const handleHeight = () => {
    let tempH = h === 80 ? 100 : 80;
    setH(tempH);
  };

  return (
    <div>
      <div>{t("home")}</div>
      <div style={{ width: 100, height: 100 }}>
        <ResizeObserver
          onResize={(d, e) => console.log(d, e.getBoundingClientRect())}>
          <div
            style={{ height: h, backgroundColor: "#999", padding: 10 }}
            onClick={handleHeight}>
            todo
          </div>
        </ResizeObserver>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div>{t("about")}</div>
      <div>
        <div> xxx</div>
        <div>todo</div>
      </div>
    </div>
  );
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
