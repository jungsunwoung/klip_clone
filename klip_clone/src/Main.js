import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { HomeHeader, MHomeHeader } from "./Style";
import backVisual from "./assets/back-visual.gif";
import faker from "@faker-js/faker";
import ad from "./assets/ad.jpg";
import bottom_card from "./assets/bottom_card.png";
import bottom_donation from "./assets/bottom_donation.jpg";
import carousel from "./assets/carousel.jpg";
import top_donation from "./assets/top_donation.png";
import home from "./assets/home.png";
import arrow from "./assets/arrow.png";
import announce from "./assets/announce.png";
import gift from "./assets/gift.png";
import menu from "./assets/menu.png";
import diamond from "./assets/diamond.png";
import setting from "./assets/setting.png";

//z-index설정을 1보다 높게
const Modal = styled.div`
  width: 60vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  background: #ffffff;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  transform: ${({ isBurger }) => {
    return isBurger ? "translateX(0)" : "translateX(-100%)";
  }};
  overflow-y: scroll;
`;
const ScrollContainer = styled.div`
  width: 100vw;
  padding-top: 16px;
  padding-bottom: 16px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default function Main() {
  //Get From API
  const [nickname, setNickname] = useState("");
  const [tokenList, setTokenList] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const randomImage = faker.image.image();
  //burger
  const [isBurger, setIsBurger] = useState(false);
  const hamburgerMenu = [
    { id: 1, icon: home, text: "홈", side: arrow },
    { id: 2, icon: diamond, text: "Klip Drops", side: arrow },
    { id: 3, icon: menu, text: "서비스", side: arrow },
    { id: 4, icon: announce, text: "공지사항", side: arrow },
    { id: 5, icon: gift, text: "이벤트", side: arrow },
    { id: 6, icon: setting, text: "설정", side: arrow },
  ];
  //kakao info
  const location = useLocation();

  //swiper
  const swiperRef = useRef(null);
  const [swiperCurrentPosition, setSwiperCurrentPosition] = useState(0);
  const [loop, setLoop] = useState("");

  const bannerData = [
    { id: 1, imageUrl: bottom_donation },
    { id: 2, imageUrl: ad },
    { id: 3, imageUrl: top_donation },
    { id: 4, imageUrl: carousel },
  ];

  useEffect(() => {
    const swiperLoop = setTimeout(() => {
      setSwiperCurrentPosition((prev) => {
        if (prev < bannerData.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 2000);
    setLoop(swiperLoop);
    return clearTimeout(loop);
  }, [setSwiperCurrentPosition, swiperCurrentPosition]);

  useEffect(() => {
    swiperRef.current.style.transform =
      swiperCurrentPosition === 0
        ? `translate(000vw)`
        : `translate(-${swiperCurrentPosition}00vw)`;
  });
  //나의 토큰 불러오기
  function getMyToken() {
    var array = [];
    try {
      fetch("http://localhost:8080/wallet/token")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          for (var i = 0; i < data[0].items.length; i++) {
            const dict = {
              id: data[0].items[i].id,
              tokenCount: data[0].items[i].tokenCount,
              tokenName: data[0].items[i].tokenName,
              tokenType: data[0].items[i].tokenType,
            };
            array.push(dict);
          }
          setTokenList(array);
        });
    } catch (err) {
      console.log(err);
    }
  }

  //최근 카드목록 불러오기

  async function getRecentCard() {
    var array = [];
    var newArray = [];
    try {
      const res = await fetch("http://localhost:8080/wallet/card");
      if (res.status === 200) {
        var data = await res.json();
        console.log(data);
      } else {
        console.log(res.status);
      }
      for (var i = 0; i < data[0].items.length; i++) {
        const dict = {
          tokenId: data[0].items[i].tokenId,
        };
        array.push(dict);
      }
    } catch (err) {
      console.log(err);
    }

    for (var i = 0; i < array.length; i++) {
      try {
        const result = await fetch("./" + array[i].tokenId + ".json");
        if (result.status === 200) {
          var uri = await result.json();

          const dict = {
            tokenId: array[i].tokenId,
            name: uri.name,
          };
          newArray.push(dict);
        } else {
          console.log(result.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setCardList(newArray);
  }

  //최근 친구 불러오기
  function getRecentFriend() {
    var array = [];
    try {
      fetch("http://localhost:8080/friend")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          for (var i = 0; i < data[0].items.length; i++) {
            const dict = {
              id: data[0].items[i].id,
              nickname: data[0].items[i].nickname,
            };
            array.push(dict);
          }
          setFriendList(array);
        });
    } catch (err) {
      console.log(err);
    }
  }
  //햄버거 열기
  function openBurger() {
    setIsBurger(true);
  }
  useEffect(() => {
    setNickname(location.state.res.profile.kakao_account.profile.nickname);
    getMyToken();
    getRecentCard();
    getRecentFriend();
  }, []);
  useEffect(() => {
    // console.log(tokenList);
    console.log(cardList);
    // console.log(friendList);
  }, [cardList]);
  const modalEl = useRef();

  //버거 클릭된 상태에서 바깥 클릭시 버거 닫히기
  const handleClickOutside = ({ target }) => {
    if (isBurger && !modalEl.current.contains(target)) {
      setIsBurger(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isBurger]);

  return (
    <>
      {/* zindex 설정을 1 */}
      {isBurger ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            transition: "all 0.3s ease-in-out",
            position: "fixed",
            top: 0,
            zIndex: 1,
          }}
        ></div>
      ) : (
        <></>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          position: "relative",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Modal isBurger={isBurger} ref={modalEl}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflowY: "scroll",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "7vw",
                    height: "7vw",
                    marginTop: 20,
                  }}
                  src={randomImage}
                ></img>
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "2vw",
                  marginTop: 10,
                }}
              >
                {location.state.res.profile.kakao_account.profile.nickname}
              </div>
              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid #808080",
                  width: "10vw",
                  height: "3vw",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: 20,
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#808080", fontSize: "1.5vh" }}>
                  내 주소 보기
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    width: "27vw",
                    height: "5vw",
                    backgroundColor: "#f2f3f8",
                  }}
                >
                  토큰
                </div>
                <div
                  style={{
                    width: "27vw",
                    height: "5vw",
                    backgroundColor: "#f2f3f8",
                    marginLeft: 5,
                  }}
                >
                  NFT
                </div>
              </div>
            </div>
            <div
              style={{
                width: "50w",
                border: "1px solid #f2f3f8",
                marginTop: 30,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              {hamburgerMenu.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 15,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div>
                      <img style={{ width: "3vw" }} src={item.icon}></img>
                    </div>
                    <div style={{ marginLeft: "1vw", fontSize: "3vw" }}>
                      {item.text}
                    </div>
                  </div>
                  <div>
                    <img style={{ width: "3vw" }} src={item.side}></img>
                  </div>
                </div>
              ))}
              <div
                style={{
                  borderRadius: 20,
                  border: "1px solid #FFFF00",
                  backgroundColor: "#FFFF00",
                  width: "15vw",
                  height: "3vw",
                  marginTop: 20,
                }}
              >
                <div
                  style={{
                    color: "#808080",
                    fontSize: "2vw",
                  }}
                >
                  Klip 채널 추가
                </div>
              </div>
              <div>Klip의 소식을 가장 먼저 받으실 수 있습니다.</div>
              <div>
                <img
                  style={{
                    width: "60vw",
                    height: "10vw",
                    bottom: 0,
                    position: "fixed",
                  }}
                  src={top_donation}
                ></img>
              </div>
            </div>
          </div>
        </Modal>

        <HomeHeader openBurger={openBurger}></HomeHeader>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "30vw",
              height: "20vh",
            }}
          >
            <div style={{ fontSize: "4vw", fontWeight: "bold" }}>
              {nickname} 님.
            </div>
            <div style={{ fontSize: "4vw", fontWeight: "bold" }}>
              안녕하세요
            </div>
            <div
              style={{
                borderRadius: 20,
                border: "1px solid #0080ff",
                width: "15vw",
                height: "3vw",
                marginTop: 20,
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ color: "#0080ff", fontSize: "2vw" }}>
                내 주소 보기
              </div>
            </div>
          </div>

          <div>
            <img
              src={backVisual}
              style={{
                width: "25vw",
                height: "25vw",
              }}
            ></img>
          </div>
        </div>
        {/* 넘치는건 안보이게 */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={swiperRef}
            style={{
              width: "300vw",
              height: "20vh",
              marginTop: "3vh",
              transition: "transform 1s",
            }}
          >
            <div style={{ width: "100vw", height: "20vh", display: "flex" }}>
              {bannerData.map((item) => (
                <div key={item.id}>
                  <img
                    style={{ width: "100vw", height: "20vh" }}
                    src={item.imageUrl}
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div>나의 토큰</div>
          <div> 전체보기</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {tokenList.map((item) => (
            <div
              key={item.id}
              style={{
                marginTop: 5,
                backgroundColor: "#f2f3f8",
                height: "5vh",
                padding: 10,
                width: "90vw",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img
                    src={faker.image.image()}
                    style={{ width: 30, height: 30 }}
                  ></img>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>{item.tokenCount}</div>
                  <div>{item.tokenName}</div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              width: "90vw",
              height: "5vh",
              backgroundColor: "#0080ff",
              textAlign: "center",

              marginTop: 10,
              borderRadius: 10,
              color: "#ffffff",
            }}
          >
            토큰 보내기
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div>최근 받은 카드</div>
          <div> 전체보기</div>
        </div>
        <ScrollContainer>
          {cardList.map((item) => (
            <div
              key={item.tokenId}
              style={{
                minWidth: "32vw",
                height: "30vw",
                borderRadius: 10,
                marginRight: 5,
                border: "1px solid #f2f3f8",
                backgroundImage: "url(./back-visual.gif)",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  padding: "1.6vw",
                  minWidth: "28vw",
                  alignSelf: "center",
                  textAlign: "center",
                  borderRadius: 10,
                  marginTop: "25vw",
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </ScrollContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div>최근 전송한 친구</div>
          <div> 전체보기</div>
        </div>
        <ScrollContainer>
          {friendList.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                minWidth: "32vw",
                height: "30vw",
                borderRadius: 10,
                marginRight: 5,
                border: "1px solid #f2f3f8",
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <img
                  style={{
                    borderRadius: "50%",
                    width: "10vw",
                    height: "10vw",
                  }}
                  src={faker.image.image()}
                ></img>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {item.nickname}
                </div>
              </div>
            </div>
          ))}
        </ScrollContainer>
        <div
          style={{
            width: "100vw",

            backgroundColor: "#f2f3f8",
          }}
        >
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <img
                style={{
                  width: "95vw",
                  borderRadius: 10,
                  marginTop: 50,
                }}
                src={bottom_card}
              />
            </div>
            <div>
              <img
                style={{
                  width: "95vw",
                  borderRadius: 10,

                  marginTop: 20,
                }}
                src={carousel}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: 20,
              width: "90vw",
            }}
          >
            <div>고객센터</div>
            <div style={{ marginLeft: 20 }}>이용약관</div>
            <div style={{ marginLeft: 20, fontWeight: "bold" }}>
              개인정보처리방침
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            ⓒ2020-2021. GroundX Corp. All rights reserved.
          </div>
          <div style={{ marginTop: 40 }}>(주)그라운드엑스</div>
        </div>
      </div>
    </>
  );
}
