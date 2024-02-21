import Container from "@component/container/Container";
import { ItemList, List } from "@component/list";
import styled, { css } from "styled-components";
import { Navigate } from "react-router-dom";

// Navbar Component
export default function Navbar() {
  // Retrieve the username from localStorage or default to "anonymous"
  const username: string = localStorage.getItem("username") || "anonymous";

  // Handle the logout functionality: Clears localStorage and navigates to the login page.
  const handleLogout = () => {
    localStorage.clear();
    // Use Navigate component to navigate to the login page
    return <Navigate to="/login" />;
  };

  return (
    <StyledNavbar>
      <Container>
        <List>
          {/* Display the username */}
          <StyledItemList>{username}</StyledItemList>
          {/* Logout button with click handler */}
          <StyledItemList onClick={handleLogout} pointer>
            Logout
          </StyledItemList>
        </List>
      </Container>
    </StyledNavbar>
  );
}

// Styled components
const StyledItemList = styled(ItemList)<{ pointer?: boolean }>`
  display: inline;
  margin-right: 20px;
  ${({ pointer }) =>
    pointer &&
    css`
      cursor: pointer;
    `}
`;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  padding-top: 12px;
  box-shadow: 0 4px 2px -2px gray;
  background-color: white;
  text-align: right !important;
`;
