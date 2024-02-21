import React from "react";

import AddChecklist from "./AddChecklist";
import ItemsTodoSection from "@component/items-todo/TodosSection";
import SlideDown from "@component/slidedown/SlideDown";
import { ItemList, List } from "@component/list";
import { IoMdArrowDropdown } from "react-icons/io";
import { IChecklistItem } from "@type/types";

import styled from "styled-components";

type Props = {
  checklists: IChecklistItem[];
  task_id: string;
};

export default function ChecklistsSection({ task_id, checklists }: Props) {
  // select our tasks from our database
  console.log(checklists);
  return (
    <ItemList>
      <List>
        {checklists?.map((item: IChecklistItem, index: number) => (
          <React.Fragment key={item._id}>
            <ChecklistDropDown
              index={index}
              item={item}
              task_id={task_id}
              length={checklists.length}
            />
          </React.Fragment>
        ))}
        <AddChecklist task_id={task_id} />
      </List>
    </ItemList>
  );
}
interface Item {
  item: IChecklistItem;
  length: number;
  index: number;
  task_id: string;
}
function ChecklistDropDown({ item, length, index, task_id }: Item) {
  const [isOpenChecklist, setIsOpen] = React.useState(false);
  return (
    <>
      <ItemList
        priority={4}
        bb
        normal
        onClick={() => setIsOpen(!isOpenChecklist)}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <DropdownArrow size={18} isOpen={isOpenChecklist} />
        Checklist {index + 1}
      </ItemList>
      <SlideDown isOpen={isOpenChecklist}>
        <div>
          {length === 0 && (
            <div style={{ textAlign: "center", margin: "20px" }}>
              Emty Section
            </div>
          )}
          <ItemList priority={4}>
            <ItemsTodoSection
              checklist_id={item._id}
              title={item.title}
              ItemsTodo={item.items}
              task_id={task_id}
            />
          </ItemList>
        </div>
      </SlideDown>
    </>
  );
}
interface TDropdown {
  isOpen: boolean;
}
// Define a styled component for the dropdown arrow
const DropdownArrow = styled(IoMdArrowDropdown)<TDropdown>`
  position: absolute;
  right: 20px;
  top: 10px;
  transform: ${(props) => (props.isOpen ? "rotate(0deg)" : "rotate(90deg)")};
  transition: 0.3s;
`;
