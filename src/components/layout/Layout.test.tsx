import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import "@testing-library/jest-dom"; // Ensure you have this import for custom jest matchers

describe("Layout component", () => {
  test("renders Navbar and children", () => {
    // Render the Layout component
    render(<Layout>Test Children</Layout>);

    // Assert that Navbar is rendered
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();

    // Assert that Navbar is rendered
    const contentElement = screen.getByTestId("content-id");
    expect(contentElement).toBeInTheDocument();

    // Assert that children are rendered
    const childrenElement = screen.getByText("Test Children");
    expect(childrenElement).toBeInTheDocument();
  });
});
