import { useState } from "react";

function AddTask({ onAddTask }) {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "") return;
    onAddTask(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
