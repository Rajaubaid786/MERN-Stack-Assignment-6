import React from 'react';

function TaskList({
  tasks, allTasksCount, handleEdit, handleDelete, handleToggle,
  handleClearCompleted, completedCount,
  filterStatus, setFilterStatus, filterPriority, setFilterPriority
}) {
  return (
    <div className="task-list">

      {/* ── FILTER BAR ── */}
      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">Status:</span>
          {['All', 'Incomplete', 'Complete'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status === 'All' ? '📋 All' : status === 'Complete' ? '✅ Done' : '⏳ Pending'}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Priority:</span>
          {['All', 'High', 'Medium', 'Low'].map(priority => (
            <button
              key={priority}
              className={`filter-btn priority-filter ${filterPriority === priority ? 'active' : ''} ${priority.toLowerCase()}`}
              onClick={() => setFilterPriority(priority)}
            >
              {priority === 'All' ? '🌐 All' :
               priority === 'High' ? '🔴 High' :
               priority === 'Medium' ? '🟡 Medium' : '🟢 Low'}
            </button>
          ))}
        </div>

        {/* Clear completed button */}
        {completedCount > 0 && (
          <button className="clear-btn" onClick={handleClearCompleted}>
            🗑️ Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* ── TASKS ── */}
      {allTasksCount === 0 ? (
        <div className="empty-state">
          <p>📭 No tasks yet — add one above!</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>🔍 No tasks match your filter!</p>
        </div>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className={`task-card ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <div>
                <p className="task-title">{task.title}</p>
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'}
                  {' '}{task.priority}
                </span>
              </div>
            </div>

            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(task)}
                disabled={task.completed}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(task.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;