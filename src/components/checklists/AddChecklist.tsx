import Input from "@component/input/Input";
import Button from "@component/button/Button";
import React from "react";
import Modal from "@component/modal/Modal";
import { useAppDispatch } from "@store/hooks";
import { addChecklistAsync } from "@store/actions/tasksActions";
import styled from "styled-components";
import { LuPlus } from "react-icons/lu";

const StyledIcon = styled(LuPlus)`
  border: 2px solid;
  border-radius: 8px;
  margin-right: 10px;
`;

type Props = {
  task_id: string;
};
// type TaskType = {
//   id: number;
//   name: string;
//   status: boolean;
// };
export default function AddChecklist({ task_id }: Props) {
  const [value, setValue] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value.replace(/\s/g, "") === "") {
      alert("Enter correct value");
      return;
    }
    setValue("");

    setOpen(false);
    // here need to send data to db
    dispatch(
      addChecklistAsync({
        title: value,
        task_id: task_id,
      })
    );
  };

  return (
    <div>
      <Button
        type="submit"
        variant="primary"
        onClick={() => setOpen(true)}
        width={230}
        outline
        border={false}
        data-testid="btn-add-item"
      >
        <StyledIcon size={24} /> Add new checklist
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form onSubmit={onSubmit}>
          <Input
            label="Checklist name:"
            type="text"
            name="checklist"
            dataTestId={"item-name"}
            placeholder="Add new Checklist"
            value={value}
            required={true}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button type="submit" variant="primary" width={180} left>
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}
