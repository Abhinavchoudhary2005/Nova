# Nova Clothing Brand

Nova Clothing Brand is a full-stack MERN application that allows users to browse products, add them to the cart, and make purchases. The project includes features like user authentication, product management, and a responsive frontend design.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Setting Up Environment Variables](#setting-up-environment-variables)
   - [Installing Depedencies](#Installing-depedencies)
   - [Database Setup](#database-setup)
   - [Running the Application](#running-the-application)
3. [Contributing](#contributing)

## Features

- User authentication (signup, login, logout)
- Add to cart, remove from cart functionality
- Toast notifications for user actions
- Responsive design
- API calls to backend
- Data saved in MongoDB

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhinavchoudhary2005/Nova.git
   cd Nova
   ```

### Setting Up Environment Variables

    Create .env files for both the frontend and backend.

    Frontend
    In the frontend directory, create a .env file with the following content:
    ```bash
    REACT_APP_API_KEY=http://localhost:8000/
    ```

    Backend
    In the backend directory, create a .env file with the following content:
    ```bash
    PORT=8000
    MONGODB_URL=<your mongoDB URL>
    SECRET=<any secret>
    ```

    Replace <your mongoDB URL> with your actual MongoDB connection string, and <any secret> with a secret string for JWT authentication.

### Installing Depedencies

    Install dependencies:

    For the frontend:
    ```bash
    cd frontend
    npm install
    ```

    For the backend:
    ```bash
    cd ../backend
    npm install
    ```

### Database Setup

    In your MongoDB project, create two collections: products and banners, and upload the necessary data into these collections. Data provided in root directory.

### Running the Application

    1.Start the backend server:
    ```bash
    cd Backend
    npm start
    ```

    2.Start the frontend:
    ```bash
    cd Frontend
    npm start
    ```

## Contributing

    If you want to contribute to this project, please fork the repository and create a pull request with your changes.
