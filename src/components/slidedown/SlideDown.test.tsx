import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SlideDown from "./SlideDown";

describe("SlideDown component", () => {
  it("renders with closed state", () => {
    render(<SlideDown isOpen={false}>Content</SlideDown>);

    const contentElement = screen.getByText("Content");

    expect(contentElement).toBeInTheDocument();
    expect(contentElement.parentElement).toHaveStyle("max-height: 0");
  });
});
