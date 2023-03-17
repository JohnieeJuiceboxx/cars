import React from "react";
import { Link } from "react-router-dom";
import logo from "../carDepot.svg";
import { Button } from "@material-ui/core";

export default function LeftSideBar({ setMode, mode }) {
  const addJello = (className) => {
    let elem = document.getElementsByClassName(className)[0];
    elem.classList.add("jello-horizontal");

    setTimeout(() => {
      elem.classList.remove("jello-horizontal");
    }, 1000);
  };
  return (
    <div className="left_sidebar_wrapper">
      <div
        className="logo_container"
        onMouseEnter={() => addJello("logo_container")}
      >
        <img src={logo} width={"65%"} alt="logo" />
      </div>
      <h1 className={mode === "cars" ? "active" : ""}>
        <Link to="/cars">Cars</Link>
      </h1>
      <h1 className={mode === "add" ? "active" : ""}>
        <Link to="/add">Add</Link>
      </h1>
      <div style={{ marginTop: 50 }}>
        <Button
          component={Link}
          to="/"
          onClick={() => setMode("splash")}
          variant="contained"
          style={{ backgroundColor: "#ff7321" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
