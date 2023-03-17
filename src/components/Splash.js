import React from "react";
import { Link } from "react-router-dom";

import logo from "../carDepot.svg";
import { Button } from "@material-ui/core";

export default function Splash({ setMode }) {
  return (
    <div className="splash fade-in">
      <div>
        <img src={logo} className="Notable-logo" alt="logo" />
      </div>
      <div style={{ marginTop: 50 }}>
        <Button
          component={Link}
          to="/cars"
          onClick={() => setMode("cars")}
          variant="contained"
          style={{ backgroundColor: "#ff7321" }}
        >
          Enter
        </Button>
      </div>
    </div>
  );
}
