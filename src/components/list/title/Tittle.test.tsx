import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title component", () => {
  it("renders default Title with H1 ", () => {
    const { getByTestId } = render(<Title title="Test Title" />);
    const titleElement = getByTestId("title-component");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H1");
  });

  it("renders Title with H2", () => {
    render(<Title as="h2" title="Test Title" />);

    expect(screen.getByTestId("title-component")).toBeInTheDocument();
    expect(screen.getByTestId("title-component").tagName).toBe("H2");
  });

  it("render title with capitlize the first letter", () => {
    render(<Title title="test title" />);

    expect(screen.getByTestId("title-component")).toBeInTheDocument();

    //check if the first letter is upcase
    expect(screen.getByTestId("title-component")).toHaveTextContent(
      /Test title/i
    );
  });
});
