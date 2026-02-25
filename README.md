# SparkAisha Project

Full-stack spa booking and management platform.

## 🏗️ Monorepo Structure

```
SparkAishaProject/
├── frontend/          # React + Vite frontend application
│   ├── src/          # React components, pages, services
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # ASP.NET Core Web API
│   └── SparkAisha.API/
│       ├── Controllers/
│       ├── Services/
│       ├── Models/
│       └── Program.cs
│
├── .gitignore        # Monorepo-wide ignore rules
└── README.md         # This file
```

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend/SparkAisha.API
dotnet restore
dotnet run
```

## 📦 Tech Stack

**Frontend:**
- React 18
- Vite
- React Router
- Tailwind CSS
- Axios

**Backend:**
- ASP.NET Core 8.0
- Entity Framework Core
- MySQL/SQL Server
- JWT Authentication

## 🔧 Development

- Frontend runs on: `http://localhost:5173`
- Backend API runs on: `http://localhost:5000`

## 📝 License

Private Project
