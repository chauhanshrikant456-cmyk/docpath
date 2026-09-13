# DOCPath

**Smart Application Readiness & Document Dependency Navigator**

A full-stack B.Tech CSE project that helps users determine their eligibility and preparation status for applications such as scholarships, government schemes, college admissions, and more.

## Core Purpose

DOCPath answers critical questions:
- Am I eligible?
- Which documents do I need?
- Which documents are missing?
- What are the dependencies between documents?
- How ready am I?
- What should I do next?

## Features

### User Features
- User registration and authentication
- Profile management
- Application discovery and search
- Eligibility evaluation
- Document tracking
- Document dependency analysis
- Missing document guidance
- Readiness score calculation
- Personalized action plan
- Next-best-action recommendations
- What-If simulator
- Deadline tracking
- Notification system
- Progress dashboard

### Admin Features
- Admin dashboard
- Application management
- Eligibility rules management
- Document management
- Dependency configuration
- User management

## Technology Stack

### Frontend
- React.js with Vite
- TypeScript
- React Router
- Tailwind CSS
- Axios
- React Hook Form
- Zod validation
- Recharts
- React Flow
- Lucide React icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs for password hashing

## Installation

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Demo Credentials

### User
```
Email: demo@docpath.local
Password: Demo@12345
```

### Admin
```
Email: admin@docpath.local
Password: Admin@12345
```

## Project Status

- Phase 1: Project setup ✅
- Phase 2: Authentication (in progress)
- Phase 3+: Remaining features
