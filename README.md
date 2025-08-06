# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🧠 Task Tracker App

A full-stack task tracking application with real-time start/stop/pause, daily summaries, and intuitive UI.

---

## 🚀 Live Demo

- **Frontend**: (https://timely-track-frontend-git-master-aasminis-projects.vercel.app)
- **Backend API**: (https://timely-track-backend.onrender.com/api)

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

### Deployment:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 🧑‍💻 Local Development Setup

### 🖥️ Prerequisites
- Node.js (v18+)
- npm
- MongoDB Atlas URI

---

### 📦 Backend Setup

```bash
cd server
cp .env.example .env 
npm install
npm start         
