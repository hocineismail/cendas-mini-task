import React from "react";
import { render } from "@testing-library/react";
import { ItemList } from "./Item"; // Adjust the import path based on your actual file structure

describe("ItemList component", () => {
  it("applies default styles", () => {
    const { container } = render(<ItemList />);
    const listItemElement = container.firstChild as HTMLElement;

    expect(listItemElement).toHaveStyle("text-transform: capitalize");
    expect(listItemElement).toHaveStyle("color: black");
    expect(listItemElement).toHaveStyle("padding: 12px 0px");
    expect(listItemElement).toHaveStyle("margin: 0");
    expect(listItemElement).toHaveStyle("font-size: 14px");
  });

  it("applies styles based on props", () => {
    const { container } = render(
      <ItemList priority={3} bb bt light normal medium disabled />
    );
    const listItemElement = container.firstChild as HTMLElement;

    expect(listItemElement).toHaveStyle("text-transform: capitalize");
    expect(listItemElement).toHaveStyle("color: black");
    expect(listItemElement).toHaveStyle("padding: 12px 0px");
    expect(listItemElement).toHaveStyle("margin: 0");
    expect(listItemElement).toHaveStyle("border-bottom: 1px solid #e1e3e5");
    expect(listItemElement).toHaveStyle("border-top: 1px solid #e1e3e5");
  });

  // Add more test cases for different combinations of props if needed
});
