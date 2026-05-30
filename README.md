# Snip.ly - Modern URL Shortener

Snip.ly is a full-stack, modern URL shortener built with a focus on performance, user experience, and sleek aesthetics. It allows users to quickly convert long, cumbersome URLs into clean, manageable links, complete with custom aliases, expiration dates, and real-time click tracking.

![Snip.ly UI](./frontend/public/favicon.svg) <!-- Replace with an actual screenshot path if available -->

## 🌟 Key Features

*   **Secure Authentication:** User registration and login using JWT (JSON Web Tokens) to protect user data and link history.
*   **Advanced URL Management:**
    *   Generate random short codes or specify custom aliases.
    *   Set expiration dates (e.g., 7 days) for temporary links.
*   **Real-time Analytics:** Track total links created, aggregate click counts, and monitor daily activity.
*   **Responsive Modern UI:** A beautiful, dark-themed interface built with React and Tailwind CSS v4, optimized for Mobile, Tablet, and Desktop.
*   **Seamless Notifications:** Elegant toast notifications powered by `sonner` for a polished user experience.

## 🛠️ Technology Stack

**Frontend:**
*   [React 19](https://react.dev/) - UI Library
*   [Vite](https://vitejs.dev/) - Build Tool & Development Server
*   [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
*   [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

**Backend:**
*   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Server environment & web framework
*   [Prisma](https://www.prisma.io/) - Next-generation ORM
*   [PostgreSQL](https://www.postgresql.org/) - Relational database
*   [JSON Web Tokens (JWT)](https://jwt.io/) - Secure authentication
*   [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
*   [Node.js](https://nodejs.org/en/download/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/)
*   A running instance of [PostgreSQL](https://www.postgresql.org/download/)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd url-shortener
```

### 2. Backend Setup

1.  Navigate to the root directory (the backend code is located here).
2.  Install the required dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables:** Create a `.env` file in the root directory and configure the following variables:
    ```env
    PORT=5000
    HOST=localhost
    API_VERSION=/api/v1
    
    # PostgreSQL Connection String
    DATABASE_URL="postgresql://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>?schema=public"
    
    # JWT Secret Key (generate a strong random string)
    JWT_SECRET="your_super_secret_key"
    ```
4.  **Database Migration:** Apply the Prisma schema to your PostgreSQL database:
    ```bash
    npx prisma db push
    ```

### 3. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

---

## 💻 Running the Application

This project is configured to easily run both the backend API and the frontend development server from the root directory.

Open **two separate terminal windows** in the root directory of the project.

**Terminal 1: Start the Backend API**
```bash
npm run api
```
*The server will start running on `http://localhost:5000` (or your configured PORT).*

**Terminal 2: Start the Frontend UI**
```bash
npm run frontend
```
*Vite will launch the development server, typically accessible at `http://localhost:5173`.*

---

## 📁 Project Structure

```text
url-shortener/
├── backend/                  # Express.js Server Logic
│   ├── auth/                 # Authentication controllers, routes, services
│   ├── config/               # Prisma and database configuration
│   ├── middlewares/          # JWT Auth Middleware
│   ├── url/                  # URL shortening logic and tracking
│   ├── user/                 # User management logic
│   └── server.js             # Entry point for the backend
├── frontend/                 # React UI Code
│   ├── src/
│   │   ├── components/       # Reusable React components (Navbar, Hero, Modals)
│   │   ├── context/          # React Context API (Auth state management)
│   │   ├── utils/            # Helper functions and API wrappers
│   │   ├── App.jsx           # Main application layout and routing logic
│   │   └── index.css         # Tailwind v4 configuration and global styles
│   └── package.json          # Frontend dependencies
├── prisma/                   # Database schema
│   └── schema.prisma         # Models for User, Url, ClickEvent, etc.
└── package.json              # Root (Backend) dependencies and root scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the ISC License.
