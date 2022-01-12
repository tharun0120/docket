import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div
      id="wrapper"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "25px",
        backgroundColor: "rgba(255,255,255,0.8)",
      }}>
      <img
        src="https://i.imgur.com/A040Lxr.png"
        alt="page not found"
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
        }}
      />
      <h3 style={{ fontSize: "25px", textTransform: "uppercase" }}>
        This page is lost in space.
      </h3>
      <Link to="/">
        <span
          style={{
            cursor: "pointer",
            fontSize: "25px",
            textDecoration: "none",
          }}>
          Get back Home
        </span>
      </Link>
    </div>
  );
}

export default PageNotFound;
