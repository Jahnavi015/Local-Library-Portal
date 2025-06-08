const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET = 'your_jwt_secret_key';

app.use(express.json());

// --- In-memory data ---
// Users array (with borrowedBooks)
let users = [];

// Books array
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help', genreCode: 'SH', rating: 4.8, readerLevel: 'Beginner', borrowedUntil: null, reviews: [] },
  { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', genreCode: 'FIC', rating: 4.5, readerLevel: 'Intermediate', borrowedUntil: null, reviews: [] },
  // add more books as needed
];

// --- Middleware ---
// Authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

// Custom middleware to log borrow events
function logBorrow(req, res, next) {
  console.log(`User ${req.user.email} is borrowing book ID ${req.params.id} at ${new Date().toLocaleString()}`);
  next();
}

// --- Routes ---

// Register
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Provide name, email, and password' });
  if (users.find(u => u.email === email)) return res.status(400).json({ message: 'User already exists' });

  const newUser = { id: users.length + 1, name, email, password, borrowedBooks: [] };
  users.push(newUser);
  res.json({ message: 'User registered', user: newUser });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// View all books with optional filters (public)
app.get('/books', (req, res) => {
  const { genre, author, rating } = req.query;
  let filtered = books;

  if (genre) filtered = filtered.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  if (author) filtered = filtered.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (rating) filtered = filtered.filter(b => b.rating >= parseFloat(rating));

  res.json({ books: filtered });
});

// Borrow book (limit 3, no two same genre)
app.post('/borrow/:id', authenticateToken, logBorrow, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const bookId = +req.params.id;
  const book = books.find(b => b.id === bookId);

  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (user.borrowedBooks.length >= 3) return res.status(400).json({ message: 'Borrow limit reached (3 books)' });
  if (user.borrowedBooks.some(b => b.genreCode === book.genreCode)) return res.status(400).json({ message: 'Cannot borrow two books from the same genre at once' });

  // Borrow period: 14 days, formatted DD-MMM-YYYY
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  const formattedDue = dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');

  book.borrowedUntil = formattedDue;
  user.borrowedBooks.push(book);

  res.json({ message: `Book borrowed until ${formattedDue}`, book });
});

// Return book
app.post('/return/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const bookId = +req.params.id;

  const bookIndex = user.borrowedBooks.findIndex(b => b.id === bookId);
  if (bookIndex === -1) return res.status(400).json({ message: 'You have not borrowed this book' });

  // Remove borrowedUntil from book
  const book = user.borrowedBooks[bookIndex];
  book.borrowedUntil = null;

  // Remove from user's borrowedBooks
  user.borrowedBooks.splice(bookIndex, 1);

  res.json({ message: 'Book returned successfully', book });
});

// Add review with learning reflection
app.post('/review/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  const bookId = +req.params.id;
  const { reviewText, learningReflection } = req.body;

  if (!reviewText || !learningReflection) return res.status(400).json({ message: 'Review text and learning reflection required' });

  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  // User must have borrowed the book
  if (!user.borrowedBooks.some(b => b.id === bookId)) return res.status(400).json({ message: 'You must borrow the book to review it' });

  // Add review
  book.reviews.push({ userId: user.id, reviewText, learningReflection, date: new Date().toISOString() });

  res.json({ message: 'Review added', book });
});

// Get user profile (protected)
app.get('/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ message: 'Profile info', user });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
