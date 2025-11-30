# Fullstack Portfolio Client

This is the frontend for the Fullstack Portfolio application, built with React and Vite. It connects to a backend API to display dynamic project data.

## Features
- **Dynamic Projects:** Fetches project data from the backend API.
- **Admin Dashboard:** Secure interface to add, edit, and delete projects.
- **Authentication:** JWT-based authentication with secure cookies.
- **Responsive Design:** Fully responsive layout for all devices.
- **Dark Mode:** Toggle between light and dark themes.

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** React Toastify

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env` file in the root of the `client` directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
    Replace `http://localhost:5000` with your deployed backend URL in production.

3.  **Run Locally:**
    ```bash
    npm run dev
    ```

## Deployment (Vercel)

1.  Push the code to a GitHub repository.
2.  Import the project into Vercel.
3.  Set the **Root Directory** to `client`.
4.  Add the `VITE_API_URL` environment variable in the Vercel dashboard.
5.  Deploy!

## Folder Structure
- `src/components`: Reusable UI components.
- `src/pages`: Page components (AdminLogin, AdminDashboard).
- `src/assets`: Static assets (icons, etc.).
