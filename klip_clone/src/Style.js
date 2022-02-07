import React, { useEffect, useState } from "react";
import xx from "./assets/xx.png";
import { ReactComponent as Klip } from "./assets/klip.svg";
import { ReactComponent as Klay_Klip } from "./assets/klay_klip.svg";
import hamburger from "./assets/hamburger.png";
export function HomeHeader({ openBurger }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        paddingTop: 15,
        paddingBottom: 15,
        height: "5vh",
      }}
    >
      <div>
        <img
          onClick={openBurger}
          alt=""
          src={hamburger}
          style={{
            width: 28,
            height: 28,
            cursor: "pointer",
            marginLeft: 5,
          }}
        />
      </div>
      <div>
        <Klip></Klip>
      </div>
      <div>
        <img
          alt=""
          src={xx}
          style={{
            width: 28,
            height: 28,
            cursor: "pointer",
            marginRight: 5,
          }}
        />
      </div>
    </div>
  );
}

export function MHomeHeader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      <div>
        <img
          alt=""
          src={hamburger}
          style={{
            width: 24,
            height: 24,
            cursor: "pointer",
            marginLeft: 5,
          }}
        />
      </div>
      <div>
        <Klip></Klip>
      </div>
      <div>
        <img
          alt=""
          src={xx}
          style={{
            width: 24,
            height: 24,
            cursor: "pointer",
            marginRight: 5,
          }}
        />
      </div>
    </div>
  );
}
