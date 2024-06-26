import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { deleteTaskAsync, fetchTasksAsync } from "@store/actions/tasksActions";
import ChecklistsSection from "@component/checklists/ChecklistsSection";
import { ItemList, List } from "@component/list";
import styled from "styled-components";
import { ITaskItem } from "@type/types";
import { cleaup } from "@store/reducers/tasksSlice";
import { FiTrash2 } from "react-icons/fi";

// TasksSection Component
export default function TasksSection() {
  // Select tasks, loading state, and error from the  store

  const { tasks, isLoading, error } = useAppSelector((state) => state.tasks);

  // Dispatch function from the redux store
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Memoize dispatch function

    dispatch(fetchTasksAsync());

    //clean our store
    return () => {
      dispatch(cleaup());
    };
  }, []);
  // Loading state: Display a loading message
  if (isLoading) {
    return <div data-testid="task-section-loading">Loading...</div>;
  }

  // Error state: Display an error message
  if (error) {
    return <div data-testid="task-section-error">{error}</div>;
  }

  // Empty tasks state: Display a message indicating that tasks are empty
  if (tasks.length === 0)
    return <div data-testid="task-section-emty">Tasks Empty</div>;

  // Render the list of tasks
  return (
    <div>
      {tasks?.map((item: ITaskItem) => (
        // Render each task using TaskContent component
        <TaskContent item={item} key={item._id} />
      ))}
    </div>
  );
}

interface TaskContentProps {
  item: ITaskItem;
}
// TaskContent Component: Displays the content of a task, including title, description, and associated checklists.
function TaskContent({ item }: TaskContentProps) {
  const dispatch = useAppDispatch();

  const handleDeleteItem = (event: React.MouseEvent<HTMLSpanElement>) => {
    // Prevent the click event from propagating to the parent
    event.stopPropagation();
    dispatch(deleteTaskAsync({ task_id: item._id }));
  };

  return (
    <Wrapper data-testid="tasks-section">
      <List data-testid="task-section-list">
        {/* Task title and description */}
        <ItemList
          data-testid="task-section-title"
          priority={1}
          normal
          bb
          bt
          style={{ position: "relative" }}
        >
          <DeleteButton onClick={handleDeleteItem}>
            <FiTrash2 size={20} />
          </DeleteButton>

          {item.title}
          <TaskDescription
            color={item?.description?.color}
            data-testid="task-section-description"
          >
            {item?.description?.text}
          </TaskDescription>
        </ItemList>

        {/* Render the ChecklistsSection component for associated checklists */}
        <ChecklistsSection task_id={item._id} checklists={item?.checklists} />
      </List>
    </Wrapper>
  );
}

// Styled components
interface TaskDescriptionProps {
  color?: string;
}

const Wrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 10px gray;
  padding: 0 10px 10px 10px;
  margin: 13px;
  background-color: white;
`;

const TaskDescription = styled.div<TaskDescriptionProps>`
  font-size: 12px;
  color: ${(props) => props.color || "initial"};
`;
const DeleteButton = styled.div`
  position: absolute;
  right: 50px;
  top: 20px;
  color: red;
  cursor: pointer;
`;
