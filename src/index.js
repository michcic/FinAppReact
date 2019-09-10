import React, { useState } from "react";
import ReactDOM from "react-dom";
import TabPanel from "./TabPanel";

function App() {
  const [data, setData] = useState({});

  return (
    <div>
      <TabPanel />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
