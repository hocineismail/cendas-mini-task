// Import necessary dependencies and components
import React, { useState } from "react";
import Input from "@component/input/Input";
import Button from "@component/button/Button";
import Modal from "@component/modal/Modal";
import styled from "styled-components";
import { LuPlus } from "react-icons/lu";
import { bootstrapColors, tasks } from "@utils/contstants";
import { addItemAsync } from "@store/actions/tasksActions";
import { useAppDispatch } from "@store/hooks";

// Define the props for the component
type Props = {
  checklist_id: string;
  task_id: string;
};

// Define the state for the form
type FormState = {
  value: string;
  open: boolean;
  description: string;
  emoji: string;
  selectedColor?: string;
};

// Functional component for adding a new item to the todo list
export default function AddItemTodo({ checklist_id, task_id }: Props) {
  // State to manage the form inputs and modal visibility
  const [formState, setFormState] = useState<FormState>({
    value: "",
    open: false,
    description: "",
    emoji: "",
    selectedColor: undefined,
  });

  // Dispatch function from Redux
  const dispatch = useAppDispatch();

  // Function to handle form submission
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset form inputs and close modal
    setFormState((prevState) => ({
      ...prevState,
      value: "",
      description: "",
      selectedColor: undefined,
      open: false,
    }));

    // Dispatch action to add a new item
    dispatch(
      addItemAsync({
        title: formState.value,
        emoji: formState.emoji,
        checklist_id,
        task_id,
        description: formState.description,
        selectedColor: formState.selectedColor,
      })
    );
  };

  // Function to handle color selection
  const handleColorSelection = (color: string) => {
    setFormState((prevState) => ({ ...prevState, selectedColor: color }));
  };

  // Function to handle emoji selection
  const handleEmojiSelection = (emoji: string) => {
    setFormState((prevState) => ({ ...prevState, emoji }));
  };

  // JSX structure for the component
  return (
    <Wrapper>
      {/* Button to open the modal */}
      <StyledButton
        type="submit"
        variant="primary"
        onClick={() =>
          setFormState((prevState) => ({ ...prevState, open: true }))
        }
        outline
        data-testid={"btn-add-item"}
      >
        <StyledIcon size={24} /> Add new Item
      </StyledButton>

      {/* Modal for adding a new item */}
      <Modal
        open={formState.open}
        onClose={() =>
          setFormState((prevState) => ({ ...prevState, open: false }))
        }
      >
        {/* Form for adding a new item */}
        <Form onSubmit={onSubmit}>
          {/* Input for item name */}
          <Input
            label="Item name:"
            type="text"
            name="task"
            placeholder="Add new Item"
            value={formState.value}
            required={true}
            dataTestId={"item-name"}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                value: e.target.value,
              }))
            }
          />

          {/* Input for item description */}
          <Input
            label="Description:"
            type="text"
            name="description"
            placeholder="Add Description"
            value={formState.description}
            color={formState.selectedColor}
            dataTestId={"item-description"}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />

          {/* Emoji selection buttons */}
          <div>
            {tasks.map((task, index) => (
              <EmojiButton
                key={index}
                type="button"
                data-testid={`emoji-${index}`}
                isSelected={formState.emoji === task.emoji}
                onClick={() => handleEmojiSelection(task.emoji)}
              >
                {task.emoji}
              </EmojiButton>
            ))}
          </div>

          {/* Color selection buttons */}
          <div>
            {bootstrapColors.map((color, index) => (
              <ColorButton
                key={index}
                type="button"
                color={color}
                data-testid={`color-${index}`}
                onClick={() => handleColorSelection(color)}
              />
            ))}
          </div>

          {/* Submit button */}
          <Button type="submit" variant="primary" width={180} left>
            Save
          </Button>
        </Form>
      </Modal>
    </Wrapper>
  );
}

// Styled icon for the add item button
const StyledIcon = styled(LuPlus)`
  border: 2px solid;
  border-radius: 8px;
  margin-right: 10px;
`;

// Wrapper for the component
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// Interface for color button props
interface ColorButtonProps {
  color: string;
}

// Styled button for color selection
const StyledButton = styled(Button)`
  width: 180px;
  outline: none;
  border: none;
`;

// Styled button for color selection
const ColorButton = styled.button<ColorButtonProps>`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  border-color: transparent;
  cursor: pointer;
`;

// Interface for emoji button props
interface EmojiButtonProps {
  isSelected: boolean;
}

// Styled button for emoji selection
const EmojiButton = styled.button<EmojiButtonProps>`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  border-color: ${(props) => (props.isSelected ? "green" : "transparent")};
  cursor: pointer;
`;

// Styled form for the modal content
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
