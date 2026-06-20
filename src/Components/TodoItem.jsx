import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onEdit, onDelete, onToggleComplete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          aria-label="Görevi tamamla"
        />
      </div>

      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <small className="todo-date">
          {new Date(todo.createdAt).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </small>
      </div>

      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn-edit"
          title="Düzenle"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-delete"
          title="Sil"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
