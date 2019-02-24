import React from "react";
import { cleanup, fireEvent } from "react-testing-library";
import { CardDetails } from "../";
import { getMockCard, renderWithRouter } from "../../../test-helpers";

describe("CardDetails component", () => {
  afterEach(cleanup);

  it("should have name", () => {
    const mockCard = getMockCard();
    const { getAllByText } = renderWithRouter(
      <CardDetails cardData={mockCard} btnAction={() => {}} btnLabel="" />
    );
    expect(getAllByText(mockCard.name)).toHaveLength(1);
  });

  it("should have type", () => {
    const mockCard = getMockCard();
    const { getAllByText } = renderWithRouter(
      <CardDetails cardData={mockCard} btnAction={() => {}} btnLabel="" />
    );
    expect(getAllByText(mockCard.type)).toHaveLength(1);
  });

  it("should have text", () => {
    const mockCard = getMockCard();
    const { getAllByText } = renderWithRouter(
      <CardDetails cardData={mockCard} btnAction={() => {}} btnLabel="" />
    );
    expect(getAllByText(mockCard.text)).toHaveLength(1);
  });

  it("should have rarity", () => {
    const rarity = "Rare";
    const { getAllByText } = renderWithRouter(
      <CardDetails cardData={{...getMockCard(), rarity}} btnAction={() => {}} btnLabel="" />
    );
    expect(getAllByText(`(${rarity})`)).toHaveLength(1);
  });

  it("should be called when click", () => {

    const btnLabel = "mock btn label";
    const spy = jest.fn();
    const { getByText } = renderWithRouter(
      <CardDetails cardData={getMockCard()} btnAction={spy} btnLabel={btnLabel} />
    );

    fireEvent.click(getByText(btnLabel));

    expect(spy).toBeCalledTimes(1);
  });
});
