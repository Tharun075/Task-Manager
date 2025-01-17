import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AddTask from "./Components/AddTask";
import TaskList from "./Components/TaskList";
import './App.css'


function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskName) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const reorderTasks = (dragIndex, hoverIndex) => {
    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, draggedTask);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Task Manager</h1>
        <AddTask onAddTask={addTask} />
        <br/>
        <TaskList
          tasks={tasks}
          onTaskComplete={toggleTaskCompletion}
          onTaskDelete={deleteTask}
          onTaskReorder={reorderTasks}
        />
      </div>
    </DndProvider>
  );
}

export default App;
