import React from "react";
import styled from "styled-components";

// Define the props for the Title component

type HeadTitleProps = {
  title: string;
  // border?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function Title({
  as = "h1",
  title,
}: HeadTitleProps): JSX.Element {
  // Define a styled component based on the provided heading level ("as" prop)
  const StyledTitle = styled[as]`
    border-bottom: 1px solid rgb(173, 173, 173);
    text-transform: capitalize;
    padding: 10px;
    margin: 0;
  `;

  return <StyledTitle data-testid="title-component">{title}</StyledTitle>;
}
