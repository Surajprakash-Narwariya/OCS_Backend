# Project Name

A Full-Stack User Authentication System

Deployed Link - https\://ocs-frontend-omega.vercel.app/

## Overview

This project is a full-stack web application that provides user authentication and role-based access control. It consists of a React.js frontend, an Express.js backend, and a PostgreSQL database.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL

## Features

- User login with **MD5-hashed passwords**.
- Role-based access control (Admin & User).
- Secure database storage using **PostgreSQL**.
- API endpoints for **user authentication** and **user management**.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running
- `.env` file with `DATABASE_URL` and `PORT` variables

### Backend Setup (Express.js)

1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   PORT=3001
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup (React.js)

1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## Database Test Data

The database is prepopulated with the following test data:

| userid            | password\_hash                   | role  | raw\_password |
| ----------------- | -------------------------------- | ----- | ------------- |
| admin\_test       | 5f4dcc3b5aa765d61d8327deb882cf99 | admin | password      |
| basic\_test\_user | 482c811da5d5b4bc6d497ffa98491e38 | basic | password123   |
| lakshya           | 5f4dcc3b5aa765d61d8327deb882cf99 | basic | password      |
| user1             | 8223fe8dc0533c6ebbb717e7fda2833c | basic | passwordabc   |
| user2             | 5f4dcc3b5aa765d61d8327deb882cf99 | basic | password      |

- New users can be added using the `/add-user` endpoint or by directly inserting them into the database.

## API Endpoints

### User Login

- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "userid": "user123",
    "password_hash": "md5hashedpassword"
  }
  ```
- **Response**:
  ```json
  [
    {
      "userid": "user123",
      "password_hash": "hashedvalue",
      "role": "admin"
    }
  ]
  ```

### Add User

- **Endpoint**: `POST /add-user`
- **Request Body**:
  ```json
  {
    "userid": "newuser",
    "password_hash": "plaintextpassword",
    "role": "user"
  }
  ```
- **Response**:
  ```json
  { "message": "User added successfully" }
  ```

## Usage

1. Start both backend and frontend servers.
2. Open `http://localhost:5173` in your browser.
3. Enter your **User ID** and **Password** to log in.
4. Admin users can view all users, while regular users can only view their details.


