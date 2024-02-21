import React from "react";
import { render } from "@testing-library/react";
import { List } from "./List";

describe("List component", () => {
  it("applies default styles", () => {
    const { container } = render(<List />);
    const listElement = container.firstChild as HTMLElement;

    expect(listElement).toHaveStyle("list-style-type: none");
    expect(listElement).toHaveStyle("margin: 0");
    expect(listElement).toHaveStyle("padding: 0");
  });
});
