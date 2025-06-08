import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';

export default function App() {
  const [page, setPage] = useState('login'); // 'login' | 'register' | 'books'
  const [token, setToken] = useState(null);

  // Call this when login or register succeeds and gives you a token
  const handleLoginSuccess = (jwtToken) => {
    setToken(jwtToken);
    setPage('books');
  };

  const handleLogout = () => {
    setToken(null);
    setPage('login');
  };

  return (
    <div className="app-container">
      <nav>
        {!token && (
          <>
            <button onClick={() => setPage('login')}>Login</button>
            <button onClick={() => setPage('register')}>Register</button>
          </>
        )}
        {token && (
          <>
            <button onClick={() => setPage('books')}>Books</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <main>
        {page === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {page === 'register' && <Register onRegisterSuccess={handleLoginSuccess} />}
        {page === 'books' && <BookList token={token} />}
      </main>
    </div>
  );
}
