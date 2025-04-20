
---

# ⚖️ NyaayVeer – Application Backend

Welcome to the **main backend** of **NyaayVeer**, the powerful mobile app built to help users understand their legal rights through technology.

This backend handles user authentication, database management, and connects seamlessly with the AI backend to provide a complete system for legal assistance.

---

## 📘 About the Project

NyaayVeer is a mobile-first legal assistant designed to make **criminal law information more accessible** to everyday users. While the AI backend interprets the legal content, this backend is responsible for managing:

- Users and authentication  
- Case-related chats and data  
- Communication with the AI backend  
- Database interaction and storage

Together, this system helps bring justice closer to the people—smart, simple, and secure.

---

## 🔧 What You’ll Need

Before setting up, ensure you have:

- **Node.js** installed on your machine

---

## 🚀 How to Set It Up

Follow these steps to get the backend running:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nyaayveer-node-backend.git
cd nyaayveer-node-backend
```

### 2. Create a `.env` File

In the root folder, create a file named `.env` and add the following content:

```
PORT=your-port-number
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=your-jwt-secret-key
AI_APIKEY=your-ai-api-key-or-leave-empty
BASE_URL=http://localhost:5000  # or your AI backend URL
```

🔐 *Replace all placeholder values with your actual credentials.*

---

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
node server.js
```

Your backend should now be running on:

```
http://localhost:<PORT>
```

Make sure the port matches the one you set in your `.env` file.

---

## 🗃️ Database Setup

You’ll need a PostgreSQL database with the following schema. After connecting your database (as per the `DATABASE_URL`), execute the following SQL commands:

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    unique_id TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    mobileno TEXT NOT NULL,
    policestationid TEXT NOT NULL
);

-- Chats Table
CREATE TABLE chats (
    id INTEGER PRIMARY KEY DEFAULT nextval('chats_id_seq'::regclass),
    unique_id TEXT,
    messages TEXT,
    date TEXT,
    name TEXT,
    case_no TEXT
);

-- Collection Table
CREATE TABLE collection (
    id INTEGER DEFAULT nextval('collection_id_seq'),
    unique_id TEXT
);
```

> 📌 Be sure to create the appropriate sequences (`chats_id_seq`, `collection_id_seq`) if they don’t exist automatically.

---

## 🤝 Why It Matters

This backend is the **heart of user management and data storage** in the NyaayVeer ecosystem. It ensures everything runs securely and efficiently—connecting users with the tools they need for legal support.

---

## 🙏 Jai Nyaay!

Bringing clarity to justice—one case at a time.

---
