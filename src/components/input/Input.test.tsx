import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders correctly", () => {
    const { getByLabelText, getByPlaceholderText, getByTestId } = render(
      <Input
        label="Test Label"
        type="text"
        name="testInput"
        placeholder="Test Placeholder"
        value=""
        onChange={() => {}}
      />
    );

    const labelElement = getByTestId("label");
    const inputElement = getByPlaceholderText("Test Placeholder");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("triggers onChange callback when input value changes", () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <Input
        label="Test Label"
        type="text"
        name="testInput"
        placeholder="Test Placeholder"
        value=""
        onChange={onChangeMock}
        dataTestId="input"
      />
    );

    const inputElement = getByTestId("input");

    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
