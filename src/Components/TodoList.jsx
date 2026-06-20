import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onEdit, onDelete, onToggleComplete, filter }) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <p>Henüz görev yok. Yeni bir görev ekleyin!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>
        Görevlerim ({filter === 'all' ? todos.length : filteredTodos.length})
      </h2>
      <div className="todos-container">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
