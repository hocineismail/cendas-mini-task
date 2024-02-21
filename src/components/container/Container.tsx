import React from "react";
import styled from "styled-components";

// props interface
interface Props {
  children: React.ReactNode;
}
export default function Container({ children }: Props) {
  return (
    <StyledContainer data-testid="container-component">
      {children}
    </StyledContainer>
  );
}

// ===========  styled section ===============//

// Define the styled component
const StyledContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  /* Media query for responsive design */
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;
