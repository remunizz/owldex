import React from "react";
import { CardComponent } from "../";
import { render, cleanup } from "react-testing-library";
import { getMockCard } from "../../../test-helpers";

describe("Button component", () => {
  afterEach(cleanup);

  it("should have card name", async () => {
    const card = getMockCard();
    const { getAllByText } = render(<CardComponent {...card} />);
    expect(getAllByText(card.name).length).toBeGreaterThan(0);
  });

  it("should have card image", async () => {
    const card = getMockCard();
    const { getByTestId } = render(<CardComponent {...card} />);
    const cardImageSource = getByTestId("card-img").style.backgroundImage;

    // should contain CSS URL, HTTPS and card ID
    const urlMatchRegex = /url\(https:\/\/.*ba3e32aa\-946f\-5538\-a7c1\-a3be17c249db.*\)/i;
    expect(cardImageSource).toMatch(urlMatchRegex);
  });
});
