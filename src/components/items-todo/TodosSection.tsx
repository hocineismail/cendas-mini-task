import styled from "styled-components";
import AddItemlist from "./AddItemTodo";
import { ItemList, List } from "@component/list";
import Icon from "@component/icon/Icon";
import { useAppDispatch } from "@store/hooks";
import {
  deleteItemAsync,
  updateItemStatusAsync,
} from "@store/actions/tasksActions";
import { ItemDocType } from "@type/schema";
import { FiTrash2 } from "react-icons/fi";

type Props = {
  ItemsTodo: ItemDocType[];
  checklist_id: string;
  title: string;
  task_id: string;
};

// Component definition
export default function ItemsTodoSection({
  checklist_id,
  ItemsTodo,
  title,
  task_id,
}: Props) {
  const dispatch = useAppDispatch();

  // Function to handle item status update
  const handleUpdateStatus = (item: ItemDocType) => {
    dispatch(
      updateItemStatusAsync({
        item_id: item._id,
        task_id: task_id,
        checklist_id,
      })
    );
  };
  const handleDelete = (
    event: React.MouseEvent<HTMLSpanElement>,
    item: ItemDocType
  ) => {
    // Prevent the click event from propagating to the parent
    event.stopPropagation();
    dispatch(
      deleteItemAsync({
        item_id: item._id,
        task_id: task_id,
        checklist_id,
      })
    );
  };
  return (
    <SectionContainer>
      <List>
        {/* Styled item list for section header */}
        <StyledItemList priority={4} bb light>
          <Icon text={title} />
          {/* Styled title */}
          <StyledTitle>{title}</StyledTitle>
          {/* Styled step count */}
          <StyledStepCount>{ItemsTodo?.length} STEP</StyledStepCount>
        </StyledItemList>
        {/* Display message when no items are present */}
        {ItemsTodo?.length === 0 && (
          <NoItemMessage>No item added yet</NoItemMessage>
        )}
        {/* Map through ItemsTodo array to display styled items */}
        {ItemsTodo?.map((item: ItemDocType) => (
          <StyledItem
            key={item._id}
            priority={4}
            light
            color={item.color}
            disabled={item.status}
            onClick={() => handleUpdateStatus(item)}
            style={{ position: "relative" }}
          >
            <DeleteButton onClick={(event) => handleDelete(event, item)}>
              <FiTrash2 size={20} />
            </DeleteButton>
            <EmojiContainer>{item.emoji}</EmojiContainer>
            <div>
              {item.name} <br />
              {item.description}
            </div>
          </StyledItem>
        ))}
      </List>
      {/* Component for adding new items */}
      <AddItemlist checklist_id={checklist_id} task_id={task_id} />
    </SectionContainer>
  );
}
// Styled components
const SectionContainer = styled.div``;

const StyledItemList = styled(ItemList)`
  display: grid;
  grid-template-columns: 35px auto 90px;
`;

const NoItemMessage = styled.div`
  text-align: center;
  margin: 20px;
`;

const StyledItem = styled(ItemList)`
  cursor: pointer;
  display: grid;
  grid-template-columns: 40px auto;
`;

const EmojiContainer = styled.div`
  font-size: 20px;
  padding-top: 3px;
`;

const StyledTitle = styled.div`
  padding: 5px;
`;

const StyledStepCount = styled.div`
  text-align: right;
  padding: 5px;
`;
const DeleteButton = styled.div`
  position: absolute;
  right: 50px;
  top: 20px;
  color: red;
  cursor: pointer;
`;
