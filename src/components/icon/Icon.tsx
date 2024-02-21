import styled from "styled-components";

// Styled component for the Icon
const IconStyled = styled.div`
  padding: 6px;
  color: light;
  background-color: #062a4f;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 9px;
  text-align: center;
`;

// Define the Props interface for the Icon component
interface Props {
  text?: string;
  emoji?: string;
}

// Define the ILetters interface that extends Props
interface ILetters extends Props {
  text?: string;
}

export default function Icon({ text, emoji }: Props) {
  // If an emoji is provided, display it
  if (emoji) {
    return <div data-testid="emoji">{emoji}</div>;
  }
  // If no emoji is provided, display the IconStyled
  return (
    <IconStyled data-testid="icon-styled">
      <div data-testid="emoji">{getTwoLetters({ text })}</div>
    </IconStyled>
  );
}

// Function to get the first two letters from a string (or default to "A" if no text is provided)
function getTwoLetters({ text = "A" }: ILetters): string {
  const splittedText: string[] = text.split(" ");

  // If there is only one word, return the first letter
  if (splittedText.length === 1) {
    const firstLetter = splittedText[0].slice(0, 1).toLocaleLowerCase();
    return firstLetter;
  }

  // If there are two words, return the first letter of each word
  if (splittedText.length === 2) {
    const firstLetter = splittedText[0].slice(0, 1).toLocaleLowerCase();
    const secondLetter = splittedText[1].slice(0, 1).toLocaleLowerCase();
    return firstLetter + secondLetter;
  }

  // Default to "A" if no suitable letters are found
  return "A";
}
