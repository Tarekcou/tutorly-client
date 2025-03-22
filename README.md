# Tutorly - Language Tutor Booking Application

## 1. Basic Project Information

**Project Title:** Tutorly  
**Short Description:** Tutorly is a modern web application that connects students with language tutors, making it easy to find, book, and learn from expert instructors.  
**Motivation/Purpose:** To facilitate easy access to quality language education through a streamlined online tutor booking system.  
**Live Demo:** [Visit Tutorly](https://online-tutor-2c707.firebaseapp.com/)

## 2. ⚙️ Installation & Setup Instructions

### Prerequisites

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher

### Installation Steps

1. Clone the repository:

   git clone https://github.com/your-username/tutorly.git
   cd tutorly

2. Install dependencies:

   # Frontend

   cd frontend
   npm install

   # Backend

   cd backend
   npm install

3. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add the required environment variables:
     env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     FIREBASE_API_KEY=your_firebase_api_key
4. Start the development server:

   # Frontend

   npm run dev

   # Backend

   npm start

### Build for Production

npm run build

## 3. 🚀 Usage Guide

### Running the Application

- Use the following command to start the app:

  npm run dev

- Access the app at `http://localhost:3000` in your browser.

### User Roles

- **Student:** Browse and book language tutors.
- **Tutor:** Register and provide teaching services.
- **Admin:** Manage users and platform settings.

## 4. 🌟 Features List

- **Tutor Search:** Find tutors based on language, experience, and location.
- **Tutor Registration:** Tutors can sign up and list their teaching services.
- **Secure Authentication:** Firebase authentication for login and signup.
- **Dashboard:** Personalized dashboard for students and tutors.
- **Real-time Notifications:** Instant updates using toast notifications.
- **Booking System:** Schedule and manage lessons easily.

## 5. 🛠️ Tech Stack

### Frontend

- **React 18** - UI development
- **Vite** - Fast build tool
- **React Router** - Client-side navigation
- **Tailwind CSS & DaisyUI** - UI styling
- **TanStack Query** - API data management
- **Recharts** - Data visualization
- **SweetAlert2 & React Toastify** - User notifications
- **Firebase** - Authentication and hosting

### Backend

- **Node.js & Express.js** - Backend framework
- **MongoDB & Mongoose** - Database management
- **JWT (JSON Web Token)** - Secure authentication
- **Dotenv** - Environment variables management
- **Cors** - Handling cross-origin requests

## 6. 📂 Project Structure

tutorly/
├── frontend/ # React app
│ ├── src/ # Source code
│ ├── components/ # UI components
│ ├── pages/ # Page components
│ ├── hooks/ # Custom hooks
│ ├── services/ # API calls
│ └── App.js # Main entry point
├── backend/ # Express server
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── controllers/ # Request handlers
│ ├── config/ # Configuration files
│ └── index.js # Main server file
└── package.json # Dependencies and scripts

## 7. 🔗 API Information

### Example API Endpoints

- **Get Tutors:** `GET /api/tutors`
- **Register Tutor:** `POST /api/tutors`
- **Book Lesson:** `POST /api/bookings`
- **User Authentication:** `POST /api/auth/login`

## 8. 📜 License Information

This project is licensed under the **MIT License**. See the `LICENSE` file for more information.

## 9. 🎯 Additional Information

### Troubleshooting Tips

- **Common Issue:** Application fails to start.
  - **Solution:** Ensure the correct Node.js version is installed and dependencies are correctly installed.
- **Common Issue:** Environment variables not loaded.
  - **Solution:** Ensure the `.env` file is correctly configured.

### Acknowledgments

- Inspired by leading online tutoring platforms.
- Special thanks to the open-source community.
- Libraries such as Tailwind CSS and Firebase for seamless integration.

---

Thank you for using Tutorly! Happy Learning! 🎓
