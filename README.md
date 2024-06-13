## Setup Guide

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



# AnswersAI Backend

This is the backend for AnswersAI, a web application that allows users to ask questions and receive answers from an AI service. This project uses Node.js, Express, MongoDB, and integrates with the Hugging Face API for AI responses.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login, logout)
- Asking and viewing questions
- Integration with Hugging Face API for AI responses
- Scalable infrastructure on AWS

## Prerequisites

- Node.js (v15.x or later)
- MongoDB
- Hugging Face API key

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/tahirshaikh099/TAHIR-SHAIKH-AnswersAi-Backend.git
    cd answersai-backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/answersai
    JWT_SECRET=your_jwt_secret
    HUGGINGFACE_API_KEY=your_huggingface_api_key
    ```

2. Make sure your MongoDB server is running.

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running at `https://tahir-shaikh-answersai-backend.onrender.com`.

## API Documentation

### Authentication

#### Signup

- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "data": {
            "user": {
                "_id": "1234567890",
                "name": "John Doe",
                "email": "john@example.com"
            },
            "token": "jwt_token"
        }
    }
    ```

#### Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "data": {
            "user": {
                "_id": "1234567890",
                "name": "John Doe",
                "email": "john@example.com"
            },
            "token": "jwt_token"
        }
    }
    ```

#### Logout

- **URL:** `/api/auth/logout`
- **Method:** `POST`
- **Headers:**
    - `Authorization: Bearer jwt_token`
- **Response:**
    ```json
    {
        "status": "success",
        "data": "User logged out"
    }
    ```

### Questions

#### Ask Question

- **URL:** `/api/questions`
- **Method:** `POST`
- **Headers:**
    - `Authorization: Bearer jwt_token`
- **Body:**
    ```json
    {
        "question": "What is the capital of France?"
    }
    ```
- **Response:**
    ```json
    {
        "status": "success",
        "data": {
            "_id": "1234567890",
            "question": "What is the capital of France?",
            "answer": "The capital of France is Paris."
        }
    }
    ```

#### View Questions

- **URL:** `/api/questions`
- **Method:** `GET`
- **Headers:**
    - `Authorization: Bearer jwt_token`
- **Response:**
    ```json
    {
        "status": "success",
        "data": [
            {
                "_id": "1234567890",
                "question": "What is the capital of France?",
                "answer": "The capital of France is Paris."
            }
        ]
    }
    ```

## Curl
1. **POST /api/questions**
    ```sh
    curl -X POST https://tahir-shaikh-answersai-backend.onrender.com/api/questions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer {{jwt_token}}" \
    -d '{"question": "What is the capital of France?"}'
    ```

2. **GET /api/questions/:questionId**
    ```sh
    curl -X GET https://tahir-shaikh-answersai-backend.onrender.com/api/questions/:questionId \
    -H "Authorization: Bearer {{jwt_token}}"
    ```

3. **POST /api/users**
    ```sh
    curl -X POST https://tahir-shaikh-answersai-backend.onrender.com/api/users \
    -H "Content-Type: application/json" \
    -d '{"username": "your_username", "password": "your_password"}'
    ```

4. **GET /api/users/:userId**
    ```sh
    curl -X GET https://tahir-shaikh-answersai-backend.onrender.com/api/users/:userId \
    -H "Authorization: Bearer {{jwt_token}}"
    ```

5. **GET /api/users/:userId/questions**
    ```sh
    curl -X GET https://tahir-shaikh-answersai-backend.onrender.com/api/users/:userId/questions \
    -H "Authorization: Bearer {{jwt_token}}"
    ```

6. **POST /api/auth/login**
    ```sh
    curl -X POST https://tahir-shaikh-answersai-backend.onrender.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username": "your_username", "password": "your_password"}'
    ```

7. **POST /api/auth/logout**
    ```sh
    curl -X POST https://tahir-shaikh-answersai-backend.onrender.com/api/auth/logout \
    -H "Authorization: Bearer {{jwt_token}}"
    ```

8. **POST /api/auth/refresh**
    ```sh
    curl -X POST https://tahir-shaikh-answersai-backend.onrender.com/api/auth/refresh \
    -H "Authorization: Bearer {{jwt_token}}"
    ```


