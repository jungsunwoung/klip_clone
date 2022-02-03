import React, { useState, useEffect } from "react";
import { Default, Mobile } from "./App";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { HomeHeader, MHomeHeader } from "./Style";

export default function Main() {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <Default>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#f2f3f8",
            zIndex: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",

              width: 480,
              minHeight: "100vh",
              backgroundColor: "#ffffff",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <HomeHeader></HomeHeader>
          </div>
        </div>
      </Default>
      <Mobile>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#f2f3f8",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
              height: "100vh",
              backgroundColor: "#ffffff",
            }}
          >
            <MHomeHeader></MHomeHeader>
          </div>
        </div>
      </Mobile>
    </>
  );
}
