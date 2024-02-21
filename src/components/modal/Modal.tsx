import Button from "@component/button/Button";
import React from "react";
import styled from "styled-components";

// Props type definition for the Modal component
type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// Modal component definition
export default function Modal({ children, open, onClose }: Props) {
  // If the modal is not open, render an empty span
  if (!open) return <span></span>;

  return (
    <ModalStyled data-testid="modal">
      <ModalContent>
        <ModalHead>
          <Title>Title</Title>
          <Button onClick={onClose} type="submit" variant="light">
            X
          </Button>
        </ModalHead>
        {children}
      </ModalContent>
    </ModalStyled>
  );
}

// Styled components section

interface ModalStyledProps {
  open?: boolean;
}

const ModalStyled = styled.div<ModalStyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.74);
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: white;
  padding: 10px 20px 20px 20px;
  margin-top: 7vh;
`;

// Styled component for the modal header
const ModalHead = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

// Styled component for the modal title
const Title = styled.h3``;
