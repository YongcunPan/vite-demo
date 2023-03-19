import React, { useEffect, useRef } from "react";
import styles from "./demo.module.scss";
import fengmap from "fengmap/build/fengmap.map.min";
import "fengmap/build/fengmap.analyser.min";
import "fengmap/build/fengmap.effect.min";
import "fengmap/build/fengmap.plugin.min";
import { Hello } from "./tab";

const Demo = () => {
  return (
    <div className={styles.red}>
      <Hello />
    </div>
  );
};

export const Demo1 = () => {
  const node = useRef();
  useEffect(() => {
    var map;
    var options = {
      appName: "蜂鸟研发SDK_2_0",
      key: "57c7f309aca507497d028a9c00207cf8",
      mapID: "1321274646113083394",
      themeID: "1351477465818427393",
      container: node.current,
      backgroundColor: "#fff",
      viewMode: fengmap.FMViewMode.MODE_2D,
      rotation: 109.5,
    };

    map = new fengmap.FMMap(options);
    map.on("loaded", (r) => {
      console.log("Map loaded");
      const bound = map.getBound();
      map.setFitView(bound);
    });
    map.on("click", (event) => console.log(event));
  }, []);
  return (
    <div>
      <div ref={node} id="fengmap" className={styles.fengmap}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export const data = {
  a: 11,
  b: 22,
};

export default Demo;
