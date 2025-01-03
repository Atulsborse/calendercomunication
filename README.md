# Communication Calendar

A modern web application for managing company communications and tracking interactions.

## 🚀 Features

- User authentication with role-based access (Admin/User)
- Company management with detailed profiles
- Communication tracking and scheduling
- Interactive calendar view
- Analytics dashboard
- Real-time notifications
- Responsive design

## 🔐 Authentication Guide

### Quick Start Login Credentials

#### Admin Access
- Email: `admin@example.com`
- Password: any 6+ characters (e.g., `password123`)

#### Regular User Access
- Email: `user@example.com`
- Password: any 6+ characters (e.g., `password123`)

### How to Register

1. Visit the application URL
2. Click the "Register" tab on the login page
3. Fill in your details:
   - Full Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
4. Click "Register" button
5. Note: Using an email containing "admin" (e.g., admin@example.com) will create an admin account

### How to Login

1. Visit the application URL
2. Enter your credentials:
   - Email Address
   - Password
3. Click "Login" button
4. You'll be redirected to your dashboard based on your role:
   - Admin: Full access to company management, users, and analytics
   - User: Access to communication tracking and personal dashboard

## 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📦 Deployment

This project is configured for deployment on Vercel:

1. Fork/Clone the repository
2. Connect to Vercel
3. Deploy with default settings (Vite configuration is included)

## 🔑 Environment Variables

Create a `.env` file with:

```env
VITE_APP_TITLE=Communication Calendar
```

## 📝 License

MIT License - feel free to use this project for your own purposes.
