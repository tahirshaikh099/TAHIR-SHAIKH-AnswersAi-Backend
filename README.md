# AnswersAI Backend

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following variables:
    - `PORT=3000`
    - `JWT_SECRET=your_jwt_secret`
    - `AI_SERVICE_URL=https://your-ai-service-url`
4. Run `npm start` to start the server

## Endpoints

- `/api/auth`
  - `POST /login` - Login a user
  - `POST /logout` - Logout a user
  - `POST /refresh` - Refresh the JWT token

- `/api/questions`
  - `POST /` - Create a new question
  - `GET /:questionId` - Get a question by ID

- `/api/users`
  - `POST /` - Create a new user
  - `GET /:userId` - Get a user by ID
  - `GET /:userId/questions` - Get all questions for a user

## Testing

- Run `npm test` to run tests
