# YouTube Clone - MERN Stack Project

## Project Overview

This YouTube Clone application replicates core features of YouTube, including user authentication, video browsing, and channel management. Built using the MERN (MongoDB, Express, React, Node.js) stack, it provides a full-stack development experience.

## Key Features

### Frontend

- **Home Page**:

  - Header with search and filter functionality.
  - Sidebar toggleable from the header.
  - Video grid displaying video thumbnails, titles, channel names, and view counts.
  - Responsive design for various screen sizes.

- **User Authentication**:

  - Registration and login with JWT-based authentication.
  - After login, the user’s name appears in the header.

- **Search & Filter**:

  - Search bar for searching videos by title.
  - Filter videos based on categories.

- **Video Player Page**:

  - Embedded video player.
  - Video details including title, description, and channel name.
  - Like functionality.
  - Comment section with options to add, edit, and delete comments.

- **Channel Page**:
  - Create, edit, and delete videos.
  - View all videos belonging to a channel.
  - Customize channel details.

### Backend

- **RESTful API** for managing videos, channels, and comments.
- **MongoDB Atlas** for data persistence.

---

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **React Router**: For navigation.
- **Redux & Redux Thunk**: For state management and handling asynchronous actions.
- **React Hook Form**: For form validation and management.
- **TailwindCSS**: For styling.

### Backend

- **Node.js**: Server runtime.
- **Express.js**: Backend framework for building REST APIs.
- **JWT**: For user authentication and route protection.
- **MongoDB (Atlas)**: NoSQL database for storing users, videos, channels, and comments.

---

## Setup Instructions

### Prerequisites

1. Node.js and npm installed.
2. MongoDB Atlas or a local MongoDB instance.
3. A code editor like VS Code.

### Backend Setup

1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```
