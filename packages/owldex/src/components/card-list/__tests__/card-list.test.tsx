import React from "react";
import { CardList } from "..";
import { cleanup } from "react-testing-library";
import { getMockCards, renderWithRouter } from "../../../test-helpers";

describe("Button component", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const cards = getMockCards();
    renderWithRouter(<CardList cards={cards} />);
  });
});
