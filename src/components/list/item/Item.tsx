import styled, { css } from "styled-components";

import { getFontSize } from "@utils/helper";

// Define the props for the ItemList styled component
type ItemProps = {
  priority?: 1 | 2 | 3 | 4 | 5 | 6;
  bb?: boolean; // Add a bottom border
  bt?: boolean; // Add a top border
  fb?: number; // Font weight
  light?: boolean; // Use light font weight
  normal?: boolean; // Use normal font weight
  medium?: boolean; // Use medium font weight
  disabled?: boolean; // Render as disabled
};

export const ItemList = styled.li<ItemProps>`
  text-transform: capitalize;
  color: black;
  padding: 12px 0px;
  margin: 0;
  font-size: ${({ priority }) => (priority ? getFontSize(priority) : "14px")};

  /* Conditional styles based on props */
  ${({ bb }) =>
    bb &&
    css`
      border-bottom: 1px solid #e1e3e5;
    `}

  ${({ bt }) =>
    bt &&
    css`
      border-top: 1px solid #e1e3e5;
    `}
  
  ${({ light }) =>
    light &&
    css`
      font-weight: 300;
    `}
  
  ${({ normal }) =>
    normal &&
    css`
      font-weight: 400;
    `}
  
  ${({ medium }) =>
    medium &&
    css`
      font-weight: 500;
    `}
  
  ${({ disabled }) =>
    disabled &&
    css`
      text-decoration: line-through;
      opacity: 0.5;
    `}
`;
