import styled, { css } from "styled-components";
import React from "react";

// Define the props that the Button component
type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  width?: number;
  outline?: boolean;
  border?: boolean;
  left?: boolean;
  type?: "button" | "submit";
  variant?:
    | "primary"
    | "danger"
    | "success"
    | "info"
    | "warning"
    | "secondary"
    | "light"
    | "dark";
};

// Function to determine the background color based on the button variant
const getButtonColor = (variant: ButtonProps["variant"]): string => {
  switch (variant) {
    case "primary":
      return "#007bff"; //  primary color
    case "danger":
      return "#dc3545"; //  danger color
    case "success":
      return "#28a745"; //  success color
    case "info":
      return "#17a2b8"; //  info color
    case "warning":
      return "#ffc107"; //  warning color
    case "secondary":
      return "#6c757d"; //  secondary color
    case "light":
      return "#f8f9fa"; //  light color
    case "dark":
      return "#343a40"; //  dark color
    default:
      return "#6c757d"; //  secondary color  as default
  }
};

// Styled component for the Button
const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  border-radius: 12px;
  padding: 10px;
  border-color: transparent;
  margin: 10px 0px;
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  background-color: ${({ variant }) => getButtonColor(variant)};
  color: ${({ variant }) => (variant === "light" ? "black" : "white")};
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  ${({ left }) =>
    left &&
    css`
      margin-left: auto;
    `}
  /* Additional styles for outlined button */
  ${({ outline, variant, border }) =>
    outline &&
    css`
      background-color: transparent !important;
      color: ${getButtonColor(variant)};
      border: 2px solid ${border ? getButtonColor(variant) : "transparent"};
      border: 2px solid ${border ? getButtonColor(variant) : "transparent"};
    `}
`;

export default Button;
