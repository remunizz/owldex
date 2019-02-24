import React from "react";
import { Button } from "../";
import { render, fireEvent, cleanup } from "react-testing-library";

describe("Button component", () => {
  afterEach(cleanup);

  it("should be called when click", () => {
    const spy = jest.fn();
    const { getByText } = render(<Button onClick={spy}>Test</Button>);
    fireEvent.click(getByText("Test"));
    expect(spy).toBeCalledTimes(1);
  });
});
