import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const getCSV = async () => {
    fetch("/csv", {
      method: "GET",
    }).then((res) => {
      console.log(res);
    });
  };

  return <button onClick={getCSV}>button</button>;
}

export default App;
