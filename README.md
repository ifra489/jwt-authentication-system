# Express Session Authentication System

A secure authentication system built using Node.js, Express.js, MongoDB, bcrypt, and express-session.

## Features

- User Registration
- User Login
- Password Hashing with bcrypt
- Session Authentication
- MongoDB Session Store
- Protected Routes
- Admin Authorization
- EJS Templating

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- express-session
- connect-mongo
- EJS

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/express-session-auth-system.git
```

### Navigate into the project folder

```bash
cd express-session-auth-system
```

### Install dependencies

```bash
npm install
```

### Create a .env file

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### Start the server

```bash
node app.js
```

Server will run on:

```text
http://localhost:3000
```

## Routes

| Route | Description |
|---|---|
| / | Home Page |
| /register | Register User |
| /login | Login User |
| /dashboard | Protected Dashboard |
| /admin-only | Admin Protected Route |
| /logout | Logout User |

## Author

Ifra Malik
