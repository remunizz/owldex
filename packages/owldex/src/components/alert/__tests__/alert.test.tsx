import React from "react";
import { render, cleanup } from "react-testing-library";
import { Alert } from "../";

describe("Alert component", async () => {
  afterEach(cleanup);

  it("should have children", async () => {
    const mockTest = "mock test";
    const { getAllByText } = render(<Alert alert={mockTest} />);
    expect(getAllByText(mockTest)).toHaveLength(1);
  });
})
