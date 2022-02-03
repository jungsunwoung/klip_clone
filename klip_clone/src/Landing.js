import React, { useState, useEffect } from "react";
import { Default, Mobile } from "./App";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router";

export default function Landing() {
  const navigate = useNavigate();
  const kakaoResponse = async (response) => {
    console.log(response);
    navigate("/main", { state: { res: response } });
  };
  const kakaoFail = async (res) => {
    console.log(res);
  };

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
            <KakaoLogin
              style={{
                width: 440,
                height: 56,
                marginLeft: 20,
                backgroundColor: "#f4e34d",
                color: "#010608",
                border: "1px solid transparent",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: "8vw",
                fontFamily: "NotoSansCJKkr",
                WebkitAppearance: "none",
                borderRadius: 6,
              }}
              token={"c06a83745093b2c44b45833358ae15c7"}
              onSuccess={kakaoResponse}
              onFail={kakaoFail}
            >
              카카오톡으로 시작하기
            </KakaoLogin>
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
            <KakaoLogin
              style={{
                width: "90vw",
                minHeight: 60,
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: "#f4e34d",
                color: "#010608",
                border: "1px solid transparent",
                fontWeight: "bold",
                fontSize: 16,
                marginTop: "8vw",
                fontFamily: "NotoSansCJKkr",
                WebkitAppearance: "none",
                borderRadius: 6,
              }}
              token={"c06a83745093b2c44b45833358ae15c7"}
              onSuccess={kakaoResponse}
              onFail={kakaoFail}
            >
              카카오톡으로 시작하기
            </KakaoLogin>
          </div>
        </div>
      </Mobile>
    </>
  );
}
