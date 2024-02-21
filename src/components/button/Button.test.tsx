import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders with default styles", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("border-radius: 12px");
    // Add more assertions for default styles
  });

  it("renders with custom width", () => {
    render(<Button width={150}>Click me</Button>);
    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("width: 150px");
  });

  it("applies styles based on variant prop", () => {
    render(<Button variant="primary">Click me</Button>);
    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: #007bff");
    expect(buttonElement).toHaveStyle("color: white");
  });

  it("applies styles for outlined button", () => {
    render(
      <Button outline variant="danger" border>
        Click me
      </Button>
    );
    const buttonElement = screen.getByText("Click me");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle("background-color: transparent");
    expect(buttonElement).toHaveStyle("color: #dc3545");
    expect(buttonElement).toHaveStyle("border: 2px solid #dc3545");
  });

  it("handles click events", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    const buttonElement = screen.getByText("Click me");

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
