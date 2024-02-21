import Container from "@component/container/Container";
import Navbar from "@component/navbar/Navbar";
import React from "react";
import styled from "styled-components";

// Define the Props interface for the Layout component
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div data-test-id>
      {/* Navbar component */}
      <Navbar data-testid="navbar-id" />

      {/* Content area with Container component */}
      <StyledContent data-testid="content-id">
        <Container>{children}</Container>
      </StyledContent>
    </div>
  );
}

// Styled component for the content area
const StyledContent = styled.div`
  padding-top: 70px;
`;
