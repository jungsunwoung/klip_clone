import React, { useEffect, useState } from "react";
import xx from "./assets/xx.png";
import { ReactComponent as Klip } from "./assets/klip.svg";
import { ReactComponent as Klay_Klip } from "./assets/klay_klip.svg";
export function HomeHeader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #dfdfdf",
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      <div
        style={{
          width: 100,
          height: 28,
        }}
      />
      <div
        style={{
          fontSize: 24,
          color: "#010608",
          fontFamily: "AvenirNext",
          textAlign: "center",
          width: 120,
          cursor: "pointer",
        }}
      >
        <Klip></Klip>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",

          paddingRight: 20,
          width: 80,
        }}
      >
        <img
          alt=""
          src={xx}
          style={{
            width: 28,
            height: 28,
            cursor: "pointer",
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
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #dfdfdf",
        paddingTop: 15,
        paddingBottom: 15,
      }}
    >
      <div
        style={{
          width: "30vw",
        }}
      />
      <div
        style={{
          fontSize: 18,
          color: "#010608",
          fontFamily: "AvenirNext",
          textAlign: "center",
          width: "30vw",
          cursor: "pointer",
        }}
      >
        <Klip></Klip>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",

          paddingRight: "5vw",
          width: "25vw",
        }}
      >
        <img
          alt=""
          src={xx}
          style={{
            width: 24,
            height: 24,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}
