# ApexLead

ApexLead is a lightweight CRM application designed to help small businesses manage client leads from initial contact to conversion. It provides a centralized dashboard for tracking leads, updating their progress, managing follow-ups, and monitoring conversion activity.

## Features

- Secure admin authentication using JWT
- Create, view, update, and delete leads
- Track leads through New, Contacted, and Converted stages
- Add follow-up notes to individual leads
- Search and filter leads
- Track lead sources
- View lead and conversion statistics
- Persistent data storage with MongoDB
- Responsive dashboard interface

## Tech Stack

**Frontend**
- React.js
- JavaScript
- CSS
- Vite

**Backend**
- Node.js
- Express.js
- REST API
- JWT Authentication

**Database**
- MongoDB
- Mongoose

**Deployment**
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Project Structure

```text
ApexLead/
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── api.js
│
├── server/                 # Node.js / Express backend
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ApexLead
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5174
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5174
```

## How It Works

ApexLead provides a simple lead-management workflow:

```text
Lead Received
      ↓
     New
      ↓
  Contacted
      ↓
  Converted
```

Admins can manage lead information, record follow-up notes, update lead status, search and filter the pipeline, and monitor overall conversion performance from the dashboard.

## Future Improvements

- Automatic website contact-form integration
- Lead priority and follow-up scheduling
- Activity history
- Email notifications and reminders
- Advanced lead analytics

## Author

**Ashwini Shenoy**

Computer Science & Engineering Student