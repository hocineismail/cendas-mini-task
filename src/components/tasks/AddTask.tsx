import Input from "@component/input/Input";
import Button from "@component/button/Button";
import React from "react";
import Modal from "@component/modal/Modal";
import { useAppDispatch } from "../../redux/hooks";
import { addTaskAsync } from "../../redux/actions/tasksActions";
import styled from "styled-components";
import { LuPlus } from "react-icons/lu";
import { bootstrapColors } from "@utils/contstants";

const StyledIcon = styled(LuPlus)`
  border: 2px solid;
  border-radius: 8px;
  margin-right: 10px;
`;

export default function AddTask() {
  // Use a single state for the form
  const [formData, setFormData] = React.useState({
    value: "",
    description: "",
    open: false,
    selectedColor: undefined as string | undefined,
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setFormData({
      value: "",
      description: "",
      open: false,
      selectedColor: undefined as string | undefined,
    });

    // Dispatch the addTaskAsync action with the form data
    dispatch(
      addTaskAsync({
        title: formData.value,
        description: formData.description,
        selectedColor: formData.selectedColor,
      })
    );
    setOpen(false);
  };

  const handleColorSelection = (color: string) => {
    // Update selectedColor in formData
    setFormData((prevData) => ({ ...prevData, selectedColor: color }));
  };

  return (
    <div>
      <Button
        type="submit"
        variant="primary"
        onClick={() => setOpen(true)}
        width={200}
        outline
      >
        <StyledIcon size={24} /> Add Task
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit}>
          <Input
            label="Task name:"
            type="text"
            name="Task"
            placeholder="Add new Task"
            value={formData.value}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                value: e.target.value,
              }))
            }
          />
          <Input
            label="Description:"
            type="text"
            name="description"
            placeholder="Add Description"
            value={formData.description}
            color={formData.selectedColor}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
          <div>
            {bootstrapColors.map((color: string, index: number) => (
              <ColorButton
                key={index}
                type="button"
                color={color}
                data-testid={`color-${index}`}
                onClick={() => handleColorSelection(color)}
              />
            ))}
          </div>
          <Button type="submit" variant="primary" width={180}>
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}

interface ColorButtonProps {
  color: string;
}

const ColorButton = styled.button<ColorButtonProps>`
  background-color: ${(props) => props.color};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 5px;
  border-color: transparent;
  cursor: pointer;
`;
