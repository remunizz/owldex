import React from "react";
import { Menu } from "../";
import { cleanup } from "react-testing-library";
import { renderWithRouter } from "../../../test-helpers";

describe("Button component", () => {
  afterEach(cleanup);

  it("should have children", () => {
    const mockText = "mock content";
    const MockContent = () => <p>{mockText}</p>;
    const { getAllByText } = renderWithRouter(
      <Menu>
        <MockContent />
      </Menu>
    );

    expect(getAllByText(mockText)).toHaveLength(1);
  });
});
