# YouTube Clone Frontend

A fully responsive YouTube Clone frontend built using the MERN stack ecosystem.  
This project allows users to browse videos, search content, upload videos, create channels, and interact through comments.

---

# ▶️ Important

While testing, for the best experience, make sure both frontend and backend servers are running simultaneously.

# 🚀 Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Icons
- React Loader Spinner
- JWT Decode
- Vite

---

# 📁 Project Structure

```bash
src/
│
├── components/
│   ├── Channel.jsx
│   ├── Comments.jsx
│   ├── Header.jsx
│   ├── Loader.jsx
│   ├── ProfileMenu.jsx
│   ├── Search.jsx
│   ├── Sidebar.jsx
│   ├── UploadVideo.jsx
│   ├── VideoCard.jsx
│   └── VideoList.jsx
│
├── Pages/
│   ├── ChannelPage.jsx
│   ├── CreateChannel.jsx
│   ├── HomePage.jsx
│   ├── Login.jsx
│   ├── NotFoundPage.jsx
│   ├── Register.jsx
│   └── VideoPlayer.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── SearchContext.jsx
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

# ✨ Features

## 🔐 Authentication Features
- User Registration
- User Login
- JWT Authentication
- Persistent Login using Local Storage
- Authentication Context API
- Protected User Features
- Sign out

---

## 🎥 Video Features
- Display All Videos
- Watch Videos
- Upload Videos
- Edit Uploaded Videos
- Delete Uploaded Videos
- Search Videos
- Filter Videos
- YouTube Video Support
- Local Device Video Upload Support
- Dynamic Video Player Page
- Recommended Videos Sidebar
- Like/Dislike buttons

---

## 💬 Comment Features
- Add Comments
- Edit Comments
- Delete Comments
- Real-time Comment Rendering
- User-based Comment Controls

---

## 📺 Channel Features
- Create Personal Channel
- View Own Channel
- Display Uploaded Videos
- Channel Banner Section UI
- Channel Profile Image
- Channel Subscriber UI

---

## 🎨 UI/UX Features
- Responsive Design
- Sidebar Navigation
- Sticky Header
- Mobile Friendly Layout
- Profile Dropdown Menu
- Loading Spinner
- Dark Theme UI
- Hover Effects & Animations
- Dynamic Routing

---
# Project Demonstration Video link
https://drive.google.com/file/d/1Z0EeogeoGG68iyLWuXx_7aaItC3ebuta/view?usp=sharing

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/hds05/Youtube_Clone_Frontend.git
```

---

## 2️⃣ Move into Project Folder

```bash
cd youtube-clone-frontend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

---

# 📦 Dependencies Used

## Main Dependencies

```json
{
  "@tailwindcss/vite": "^4.2.4",
  "axios": "^1.15.2",
  "jwt-decode": "^4.0.0",
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-icons": "^5.6.0",
  "react-loader-spinner": "^8.0.2",
  "react-router-dom": "^7.14.2",
  "tailwindcss": "^4.2.4"
}
```

# 🌐 API Endpoints Used

## Authentication Routes

```http
POST /register
POST /login
```

---

## Video Routes

```http
GET /videos
GET /video/:id
POST /upload
GET /myvideos
PUT /video/:id/edit
DELETE /video/:id/delete
```

---

## Comment Routes

```http
POST /video/:id/uploadComment
PUT /video/:id/editComment
DELETE /video/:id/deleteComment
```

## Like/Dislike Routes

```http
PUT /video/:id/like
PUT /video/:id/dislike
```

---

## Channel Routes

```http
POST /channel/create
GET /channel/mychannel
```

---

# 🔒 Authentication Flow

1. User registers or logs in  
2. Backend returns JWT token  
3. Token is stored in localStorage  
4. AuthContext manages user state globally  
5. Protected requests use Authorization headers  

---

# 🧠 State Management

This project uses **React Context API** for:

- Authentication State Management
- Search State Management
- Global User Data Handling

---

# 📱 Responsive Design

This application is optimized for:

- Mobile Devices
- Tablets
- Laptops
- Desktop Screens

---

# 🚧 Future Improvements

- Subscribe System
- Watch History
- Playlist Feature
- Infinite Scrolling
- Video Streaming Optimization
- Notification System
- Dark/Light Theme Toggle
- Live Streaming
- Shorts Feature
- Recommendation Algorithm
- Real-time Features using Socket.io

---

# 🐞 Known Issues

- Some sidebar items are placeholders
- Notifications are static
- No socket implementation yet
- No video streaming optimization

---

# 👨‍💻 Author

## Himanshu Dutt Sharma

Aspiring Full Stack MERN Developer 🚀

---

# 📄 License

This project is developed for learning and educational purposes only.

---

# ⭐ Support

If you liked this project:

- Give it a ⭐ on GitHub

---