![kangaroo](/assets/kangaroo.gif)

# Kangaroo

**Keep everything in one safe place.**

Kangaroo is a lightweight bookmark manager that lets you **save, view, and delete links** in a clean interface.

Built with **Node.js, Express, MySQL, and Vanilla JS**, it provides a simple and personal way to keep your favorite URLs organized.

---

## Demo

You can preview the app locally by opening index.html in your browser **after installation below** or see it live here: [Live Demo](https://kangaroo-p2gq.onrender.com/).

---

## Features

- **Add Links** — Save a URL with an optional custom title.
- **View Saved Links** — Automatically fetches and displays your saved content.
- **Delete Links** — Secure double-confirmation before deleting.
- **Sorted by Time** — Always shows the latest saved items first.
- **Clean Frontend** — Minimal HTML/CSS/JS UI with instant updates.

---

## Tech stack

### Front-end

- **HTML**
- **CSS**
- **Vanilla Javascript**

### Back-end

- **Node.js**
- **Express**

### Database

- **MySQL** # mysql2/promise

---

## Project Structure

```
├── api/
│   └── contents.js        # Express routes
├── assets/
│   ├── icons/
│   └── kangaroo.png
├── public/                # Static frontend
│   ├── index.html
│   ├── style.css
│   └── index.js           # Client-side logic
├── db.js                  # MySQL connection
├── server.js              # Express server entry point
├── .env
├── package.json
├── package-lock.json
└── node_modules/

```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/simonegarofalo/kangaroo.git
cd kangaroo
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a **.env** file

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=kangaroo

```

### 4. Create MySQL Database

```
CREATE DATABASE kangaroo;

USE kangaroo;

CREATE TABLE contents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  title VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Start the Server

```
npm start
```

or

```
node server.js
```

Server runs at: http://localhost:3000

---

Developed by <a href="https://github.com/simonegarofalo">simonegarofalo</a>

Feel free to fork, use, or contribute to the project.
