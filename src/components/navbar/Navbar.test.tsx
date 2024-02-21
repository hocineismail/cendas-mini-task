import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./Navbar";

interface LocalStorageMock {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  clear: () => void;
  removeItem: (key: string) => void;
}

const localStorageMock: LocalStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

localStorageMock;

beforeEach(() => {
  jest.clearAllMocks();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
});

describe("Navbar component", () => {
  test("render username and logout", () => {
    // set username
    localStorageMock.setItem("username", "testUser");

    render(<Navbar />);

    // Check the current username has rendered
    const usernameElement = screen.getByText("testUser");
    expect(usernameElement).toBeInTheDocument();

    // Check the current logout button has rendered
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });
});
