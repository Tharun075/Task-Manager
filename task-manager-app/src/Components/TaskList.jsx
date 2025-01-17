import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

function TaskList({ tasks, onTaskComplete, onTaskDelete, onTaskReorder }) {
  const [, drop] = useDrop({
    accept: 'task',
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = monitor.getItem().index;
 
      if (dragIndex === hoverIndex) return;
  
      onTaskReorder(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  return (
    <div ref={drop}>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            onTaskComplete={onTaskComplete}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function TaskItem({ task, index, onTaskComplete, onTaskDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, index }, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="task"
    >
      <div>
        <span
          className={task.completed ? 'completed' : ''}
          onClick={() => onTaskComplete(task.id)}
        >
          {task.name}
        </span>
        <button onClick={() => onTaskDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default TaskList;
