# ApexLead – Lead Management CRM

ApexLead is a full-stack Customer Relationship Management (CRM) application designed to help businesses capture, organize, and manage customer leads efficiently.

The application provides a public website where potential customers can submit inquiries and a secure admin dashboard where leads can be tracked from initial inquiry to conversion.

## Features

### Public Website

- Responsive business landing page
- Light and dark mode
- Features and workflow sections
- Customer inquiry/contact form
- Automatic lead creation from submitted inquiries
- Staff portal for admin access

### Admin Dashboard

- Secure admin authentication
- JWT-based protected routes
- View and manage customer leads
- Add leads manually
- Search and filter leads
- Lead status tracking:
  - New
  - Contacted
  - Converted
- Lead priority:
  - Low
  - Medium
  - High
- Follow-up date management
- Notes for individual leads
- Lead analytics and conversion rate
- Light and dark mode

## How It Works

1. A customer submits an inquiry through the public website.
2. The inquiry is automatically added to the CRM as a new lead.
3. The admin can review the lead and assign a priority.
4. The lead can be updated from **New → Contacted → Converted**.
5. Follow-up dates and notes help track further communication.
6. Dashboard analytics provide an overview of lead activity and conversions.

## Demo Access

The public website can be accessed without authentication.

To explore the CRM admin dashboard, use the following demo credentials:

**Admin Portal:** `/admin`

```text
Email: demo@example.com
Password: <demo-password>
```

## Tech Stack

**Frontend**
- React.js
- Vite
- React Router
- CSS
- Lucide React

**Backend**
- Node.js
- Express.js
- JWT Authentication
- bcrypt

**Database**
- MongoDB
- Mongoose

**Deployment**
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

## Project Structure

```text
ApexLead/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api.js
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Running the Project Locally

Clone the repository:

```bash
git clone <your-repository-url>
cd <repository-name>
```

Install frontend dependencies:

```bash
cd client
npm install
npm run dev
```

Install backend dependencies in another terminal:

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create the required `.env` files and configure variables such as:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:5174
```

For the frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

> Environment files and secret credentials should never be committed to GitHub.

## Deployment

The application can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

The frontend communicates with the deployed REST API, while MongoDB Atlas stores user and lead information.

## Future Improvements

- Email notifications for new leads
- Follow-up reminders
- Advanced analytics and charts
- Lead export functionality
- Improved mobile dashboard experience
