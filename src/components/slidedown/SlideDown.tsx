import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// Props for the SlideDown component
interface SlideDownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

// SlideDown Component
export default function SlideDown({ isOpen, children }: SlideDownProps) {
  // State to track the content height for smooth animation
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined
  );

  // Reference to the content div to measure its scrollHeight
  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect to update contentHeight when isOpen changes
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setContentHeight(contentRef.current.scrollHeight);
      } else {
        setContentHeight(undefined);
      }
    }
  }, [isOpen]);

  return (
    <SlideDownContainer
      isOpen={isOpen}
      style={{ maxHeight: contentHeight }}
      data-testId="slide-down"
    >
      {/* Wrapper div with a ref for measuring content height */}
      <div ref={contentRef} data-testId="slide-down-children">
        {children}
      </div>
    </SlideDownContainer>
  );
}

// Styled component
const SlideDownContainer = styled.div<{ isOpen: boolean }>`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;
