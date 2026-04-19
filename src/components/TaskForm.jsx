import React from 'react';

function TaskForm({ formData, setFormData, handleSubmit, editingId }) {
  return (
    <div className="form-container">
      <h2>{editingId !== null ? '✏️ Edit Task' : '➕ Add New Task'}</h2>

      {/* Task Title Input */}
      <input
        type="text"
        placeholder="Enter task title..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      {/* Priority Dropdown */}
      <select
        value={formData.priority}
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
      >
        <option value="High">🔴 High Priority</option>
        <option value="Medium">🟡 Medium Priority</option>
        <option value="Low">🟢 Low Priority</option>
      </select>

      <button onClick={handleSubmit}>
        {editingId !== null ? '✏️ Update Task' : '➕ Add Task'}
      </button>
    </div>
  );
}

export default TaskForm;