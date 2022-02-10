import getRecentCard from "../Main";

test("gerRecentCard Test", () => {
  getRecentCard().then((cardList) => {
    expect(cardList).toEqual({
      hi: "hi",
    });
  });
});
