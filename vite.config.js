import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";
import reactRefresh from "@vitejs/plugin-react-refresh";
const useDevMode = true;
// https://vitejs.dev/config/

export default ({ mode }) => {
  const __DEV__ = mode === "development";
  return defineConfig({
    base: __DEV__ ? "/" : "//localhost:3009",
    plugins: [
      react({
        // Exclude storybook stories
        exclude: /\.stories\.(t|j)sx?$/,
        // Only .tsx files
        include: "**/*.tsx",
      }),
      ...(useDevMode ? [] : [reactRefresh()]),
      qiankun("vite-react", {
        // 微应用名字，与主应用注册的微应用名字保持一致
        useDevMode,
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            "@primary-color": "red",
          },
        },
      },
    },
    server: {
      port: 3009,
      open: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  });
};
