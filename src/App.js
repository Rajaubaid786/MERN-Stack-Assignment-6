import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  // Load tasks from localStorage — agar pehle se saved hain to wahi aayenge
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('my-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ title: '', priority: 'Medium' });
  const [editingId, setEditingId] = useState(null);

  // Filter states
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  // Jab bhi tasks badlein — localStorage mein save karo automatically
  useEffect(() => {
    localStorage.setItem('my-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = () => {
    window.scrollTo({ top: window.scrollY });
    if (!formData.title.trim()) {
      alert('Please enter a task title!');
      return;
    }
    if (editingId !== null) {
      setTasks(tasks.map(t =>
        t.id === editingId ? { ...t, ...formData } : t
      ));
      setEditingId(null);
    } else {
      setTasks([...tasks, {
        id: Date.now(),
        ...formData,
        completed: false
      }]);
    }
    setFormData({ title: '', priority: 'Medium' });
  };

  const handleDelete = (id) => setTasks(tasks.filter(t => t.id !== id));

  const handleEdit = (task) => {
  setFormData({ title: task.title, priority: task.priority });
  setEditingId(task.id);
  // Scroll band - wahi raho jahan ho
  window.scrollTo({ top: window.scrollY });
};

  const handleToggle = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Clear all completed tasks
  const handleClearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  // Filter logic — dono filters saath apply honge
  const filteredTasks = tasks.filter(task => {
    const statusMatch =
      filterStatus === 'All' ? true :
      filterStatus === 'Complete' ? task.completed :
      !task.completed;

    const priorityMatch =
      filterPriority === 'All' ? true :
      task.priority === filterPriority;

    return statusMatch && priorityMatch;
  });

  // Stats
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;

  return (
    <div className="app">
      <div className="header">
        <h1>📋 My Task Manager</h1>
        <p className="subtitle">Your tasks are auto-saved!</p>
        <div className="stats">
          <span className="stat pending">⏳ Pending: {pending}</span>
          <span className="stat done">✅ Done: {completed}</span>
          <span className="stat total">📋 Total: {tasks.length}</span>
        </div>
      </div>

      <TaskForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <TaskList
        tasks={filteredTasks}
        allTasksCount={tasks.length}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
        handleClearCompleted={handleClearCompleted}
        completedCount={completed}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
      />
    </div>
  );
}

export default App;