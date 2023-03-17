import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Cars from "./components/Cars";
import LeftSideBar from "./components/LeftSideBar";
import AddCars from "./components/AddCars";
import { Route, Routes } from "react-router-dom";
import Splash from "./components/Splash";

function App() {
  const [mode, setMode] = useState("");

  return (
    <div className="App">
      {mode === "splash" || mode === "" ? (
        <Splash setMode={setMode} />
      ) : (
        <div className="dashboard_container">
          <LeftSideBar setMode={setMode} mode={mode} />
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route
              path="/cars"
              element={<Cars setMode={setMode} mode={mode} />}
            />
            <Route
              path="/add"
              element={<AddCars setMode={setMode} mode={mode} />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
