# Todo API 🚀

A REST API built with Node.js, Express and MongoDB with full CRUD operations.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-online-brightgreen)](https://todo-api-sbyj.onrender.com/tasks)

## Live Demo

The API is deployed on Render: **https://todo-api-sbyj.onrender.com**

Try it: [`GET /tasks`](https://todo-api-sbyj.onrender.com/tasks)

> Note: the free instance sleeps after inactivity, so the first request may take ~30-50s to wake up.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get a single task by id |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Concepts Applied
- REST API architecture
- CRUD operations
- Route parameters
- Middleware (express.json)
- MongoDB database integration with Mongoose
- Input validation
- Error handling (404 / 500)

## How to run

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your MongoDB connection string:
   ```
   MONGODB_URI=your_connection_string
   ```

3. Start the server:
   ```bash
   node index.js
   ```

The server runs on `http://localhost:3000`.
