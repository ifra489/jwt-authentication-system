# JWT Authentication System 🔐

A secure authentication system built using Node.js, Express.js, MongoDB, bcrypt, and JSON Web Tokens (JWT).  
It includes user registration, login, authentication, and role-based access control.

---

## 🚀 Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Role-Based Authorization (User/Admin)
- Cookie-based token storage
- MongoDB database integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- EJS

---

## 📂 Project Structure

```
/models
/views
app.js
.env
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/jwt-authentication-system.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the project

```bash
node app.js
```

Server runs on:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers → password is hashed
2. User logs in → JWT token is generated
3. Token stored in HTTP-only cookie
4. Middleware verifies token for protected routes
5. Admin routes restricted by role

---

## 📌 Routes

| Route | Method | Description |
|------|--------|-------------|
| / | GET | Home Page |
| /register | GET/POST | Register User |
| /login | GET/POST | Login User |
| /dashboard | GET | Protected Dashboard |
| /admin-only | GET | Admin Only Route |
| /logout | GET | Logout User |

---

## 👨‍💻 Author

Ifra Malik

---

## 📌 Notes

- Do NOT upload `.env` file
- Do NOT upload `node_modules`
- Use `.gitignore`

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub
