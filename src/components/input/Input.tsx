import React from "react";
import styled, { css } from "styled-components";
// Define the props for the Input component
interface Props {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  color?: string;
  dataTestId?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface Color {
  color?: string;
}

export default function Input({
  placeholder,
  label,
  onChange,
  type,
  name,
  value,
  color,
  required,
  dataTestId,
}: Props) {
  return (
    <>
      <SyledLabel data-testid="label">{label}</SyledLabel>
      <StyledInput
        type={type}
        name={name}
        data-testid={dataTestId}
        placeholder={placeholder}
        value={value}
        color={color}
        required={!!required}
        onChange={onChange}
      />
    </>
  );
}

// Styled component
const StyledInput = styled.input<Color>`
  border-radius: 12px;
  padding: 10px;
  border-color: transparent;
  margin: 5px;
  width: 100%;
  display: block;
  background-color: rgb(212, 212, 212);
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
`;
const SyledLabel = styled.label`
  width: 100%;
  display: block;
  margin: 5px;
`;
