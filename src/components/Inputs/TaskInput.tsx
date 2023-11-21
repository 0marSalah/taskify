import React, { useState } from 'react';

const TaskInput = ({ onAddTask }: any) => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    onAddTask(task);
    setTask('');
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBlock: '1rem',
        maxWidth: '400px'
      }}
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task name"
        style={{
          margin: 0
        }}
      />
      <button
        style={{
          borderRadius: '10px'
        }}
        className="btn task-btn"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
