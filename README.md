# Local Library Portal

## Project Description

This project is a full-stack "Local Library Portal" for a fictional small-town library. It allows users to browse books, register/login, borrow books with restrictions, write reviews, and see their borrowed books.

## Features

- Public users can view and filter available books.
- Registered users can borrow up to 3 books, but not two from the same genre at once.
- Reviews include a learning reflection field.
- JWT-based authentication for secure login and registration.
- Custom middleware logs book borrowing events.
- Borrowed books show a due date formatted as DD-MMM-YYYY.

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express
- Authentication: JWT
- Storage: In-memory arrays (mock DB)
- Styling: Tailwind CSS (optional)

## Setup Instructions

### Backend

1. Navigate to the backend folder (if separated) or project root.
2. Run `npm install` to install dependencies.
3. Start the server: `node app.js` (or your main server file name). The server runs on port 5000 by default.

### Frontend

1. Navigate to the React app folder (e.g., `src` or root if combined).
2. Run `npm install` to install frontend dependencies.
3. Start React app: `npm start`.
4. The frontend runs on port 3000 by default and communicates with backend via API calls.

## API Endpoints (Backend)

- `POST /register` - Register a new user.
- `POST /login` - Login and get JWT token.
- `GET /books` - View all books with optional filters: genre, author, rating.
- `POST /borrow/:id` - Borrow a book (protected route, requires JWT).
- `GET /profile` - View user profile (protected route).

## Notes

- Users cannot borrow more than 3 books.
- Users cannot borrow two books from the same genre simultaneously.
- Borrowed books have a `borrowedUntil` date 14 days from borrowing.
- Custom middleware logs borrowing events with timestamps.

## Author

Your Name
Jahnavi
