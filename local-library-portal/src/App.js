import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';

export default function App() {
  const [page, setPage] = useState('register');

  return (
    <div>
      <nav>
        <button onClick={() => setPage('register')}>Register</button>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('books')}>Books</button>
      </nav>

      {page === 'register' && <Register />}
      {page === 'login' && <Login />}
      {page === 'books' && <BookList />}
    </div>
  );
}
