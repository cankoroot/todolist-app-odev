import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAddTodo, editingTodo, onUpdateTodo }) {
  const [title, setTitle] = useState(editingTodo ? editingTodo.title : '');
  const [description, setDescription] = useState(
    editingTodo ? editingTodo.description : ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Lütfen başlık giriniz!');
      return;
    }

    if (editingTodo) {
      onUpdateTodo({
        ...editingTodo,
        title,
        description,
      });
    } else {
      onAddTodo({
        title,
        description,
      });
    }

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>{editingTodo ? 'Görev Güncelle' : 'Yeni Görev Ekle'}</h2>

      <div className="form-group">
        <label htmlFor="title">Başlık *</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Görev başlığını giriniz..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Açıklama</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Görev açıklamasını giriniz..."
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="btn-submit">
        {editingTodo ? 'Güncelle' : 'Ekle'}
      </button>
    </form>
  );
}

export default TodoForm;
