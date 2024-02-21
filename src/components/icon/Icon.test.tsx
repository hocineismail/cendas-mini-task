import React from "react";
import { render, screen } from "@testing-library/react";
import Icon from "./Icon"; // Adjust the import path based on your actual file structure

describe("Icon component", () => {
  it("renders emoji when emoji prop is provided", () => {
    render(<Icon emoji="😊" />);
    const emojiElement = screen.getByText("😊");

    expect(emojiElement).toBeInTheDocument();
  });

  it("renders two letters when text prop is provided", () => {
    render(<Icon text="Test Text" />);
    const lettersElement = screen.getByTestId("emoji");

    expect(lettersElement).toBeInTheDocument();
    expect(lettersElement.textContent).toBe("tt");
  });

  it("renders 'DF' when text prop is not provided", () => {
    render(<Icon />);
    const defaultElement = screen.getByTestId("emoji");

    expect(defaultElement).toBeInTheDocument();
    expect(defaultElement.textContent).toBe("a");
  });

  it("renders 'D' when a single-word text prop is provided", () => {
    render(<Icon text="Word" />);
    const singleLetterElement = screen.getByTestId("emoji");

    expect(singleLetterElement).toBeInTheDocument();
    expect(singleLetterElement.textContent).toBe("w");
  });

  it("renders 'D' when a multi-word text prop is provided", () => {
    render(<Icon text="First Last" />);
    const singleLetterElement = screen.getByTestId("emoji");

    expect(singleLetterElement).toBeInTheDocument();
    expect(singleLetterElement.textContent).toBe("fl");
  });
});
