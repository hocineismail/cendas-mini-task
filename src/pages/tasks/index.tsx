import AddTask from "@component/tasks/AddTask";
import Layout from "@component/layout/Layout";
import TasksSection from "@component/tasks/TasksSection";

// Functional component for the Tasks page
export default function Tasks() {
  return (
    // Layout component wraps the entire page
    <Layout>
      {/* AddTask component for adding new tasks */}
      <AddTask />

      {/* TasksSection component for displaying and managing tasks */}
      <TasksSection />
    </Layout>
  );
}
