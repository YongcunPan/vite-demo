import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Demo, { Demo1, data } from "./demo";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => console.log("xx"), []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite & React!</p>
        <p>
          <Button type="primary" onClick={() => setCount((v) => v + 1)}>
            count is: {count}
          </Button>
        </p>
        <Demo />
        <Demo1 />
      </header>
    </div>
  );
}

export default App;
