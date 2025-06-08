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
ve watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
