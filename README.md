# Task Management Frontend

A React + TypeScript frontend for task management.

## Features

- Light/Dark theme toggle
- REST API integration
- Dockerized for easy deployment

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

Running Locally

```sh
npm start
```

Docker
Build the Docker image

```sh
docker build -t task-management-frontend .
```

Run the Docker container

```sh
docker run -p 3000:3000 task-management-frontend
```

App will be available at http://localhost:3000.

# Note
- Ensure the backend server is running on port 8080 before starting the frontend.
- The frontend is designed to work with the backend API provided in the Task Management Backend repository.

# Repository Links
- [Task Management Backend](https://github.com/OmarAtef10/Task-Management-BE)