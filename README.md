# Chat Application

## Overview
A real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Socket.IO for real-time communication. The application allows users to exchange messages, see online statuses, and upload images in their conversations.

---

## Features
- **Real-time Messaging:** Send and receive messages instantly using Socket.IO.
- **User Authentication:** Secure user login and registration with encrypted passwords.
- **Online Status:** Display users currently online.
- **Media Support:** Upload and send images in chat messages.
- **Search & Filters:** Search for users and filter by online status.
- **Themes:** Multiple themes functionality in settings page.

---

## Tech Stack
- **Frontend:** React.js, Zustand (state management), Tailwind CSS (styling).
- **Backend:** Node.js, Express.js, MongoDB.
- **Real-time Communication:** Socket.IO.
- **Cloud Storage:** Cloudinary (for image uploads).

---

## Usage
1. Open the application in your browser:
   [https://talkspace-zjuw.onrender.com](https://talkspace-zjuw.onrender.com)
2. Register or log in with your credentials.
3. Start chatting with other users in real-time!

---

## Instructions to Run Locally

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud-based)
- Cloudinary account for image uploads

### Steps
1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/chat-application.git
   cd chat-application
   ```

2. **Set Up the Backend**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and configure the following:
     ```env
     PORT=your PORT
     MONGO_URI=your_mongo_database_uri
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

---

## Future Enhancements
- Add group chat functionality.
- Add typing indicators for real-time feedback.
- Implement message read receipts.

---
