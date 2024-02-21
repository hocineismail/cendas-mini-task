import React from "react";
import { screen, render } from "@testing-library/react";
import Container from "./Container"; // Adjust the import path based on your actual file structure

describe("Container component", () => {
  it("renders with default styles", () => {
    render(<Container>Test Content</Container>);
    const containerElement = screen.getByTestId("container-component");

    expect(containerElement).toHaveStyle("width: 100%");
    expect(containerElement).toHaveStyle("padding-right: 15px");
    expect(containerElement).toHaveStyle("padding-left: 15px");
    expect(containerElement).toHaveStyle("margin-right: auto");
    expect(containerElement).toHaveStyle("margin-left: auto");
    expect(containerElement).not.toHaveStyle("max-width: 540px"); // Media query styles are not applied initially
  });
});
