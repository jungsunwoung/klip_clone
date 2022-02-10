import React from "react";
import { mount } from "@cypress/react";
import Modal from "../../src/Main";
import internet from "@faker-js/faker/dist/cjs/internet";

it("renders hamburger", () => {
  mount(<Modal></Modal>);
});
