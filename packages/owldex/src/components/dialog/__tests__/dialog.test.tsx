import React from "react";
import { render, cleanup } from "react-testing-library";
import { Dialog } from "../";

describe("Alert component", () => {
  afterEach(cleanup);

  it("should have label", () => {
    const mockLabel = "mock label";
    const { getAllByText } = render(<Dialog label={mockLabel} />);

    expect(getAllByText(mockLabel)).toHaveLength(1);
  });

  it("should have children", () => {
    const mockText = "mock content";
    const MockContent = () => <p>{mockText}</p>;
    const { getAllByText } = render(
      <Dialog label="">
        <MockContent />
      </Dialog>
    );

    expect(getAllByText(mockText)).toHaveLength(1);
  });
});
