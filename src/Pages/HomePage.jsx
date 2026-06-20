import React, { useState, useEffect } from 'react';
import TodoForm from '../Components/TodoForm';
import TodoList from '../Components/TodoList';
import './HomePage.css';

function HomePage() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all');

  // LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // EKLE işlemi
  const handleAddTodo = (newTodo) => {
    const todo = {
      id: Date.now(),
      ...newTodo,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([todo, ...todos]);
    alert('✅ Görev eklendi!');
  };

  // LİSTELE işlemi (filter ile)
  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  // GÜNCELLE işlemi
  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setEditingTodo(null);
    alert('✅ Görev güncellendi!');
  };

  // SİL işlemi
  const handleDeleteTodo = (id) => {
    if (window.confirm('Bu görevi silmek istediğinize emin misiniz?')) {
      setTodos(todos.filter((todo) => todo.id !== id));
      alert('Görev silindi!');
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Görev Listem</h1>
        <p>Tamamlanan: {completedCount}/{todos.length}</p>
      </header>

      <main className="app-main">
        <div className="form-section">
          <TodoForm
            onAddTodo={handleAddTodo}
            editingTodo={editingTodo}
            onUpdateTodo={handleUpdateTodo}
          />
          {editingTodo && (
            <button
              className="btn-cancel-edit"
              onClick={() => setEditingTodo(null)}
            >
              Düzenlemeyi İptal Et
            </button>
          )}
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilter('all')}
          >
            Tümü
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilter('active')}
          >
            Aktif
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilter('completed')}
          >
            Tamamlanan
          </button>
        </div>

        <div className="list-section">
          <TodoList
            todos={todos}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            filter={filter}
          />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
