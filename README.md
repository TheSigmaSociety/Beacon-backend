# 🌟 Beacon Backend

A Node.js backend service for managing beacons with MongoDB integration.

## 📋 Table of Contents
- [✨ Features](#-features)
- [🔧 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🏃‍♂️ Running the Server](#️-running-the-server)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)

## ✨ Features
- CRUD operations for beacons
- Voting system (upvote/downvote)
- MongoDB integration
- Express.js REST API
- Error handling

## 🔧 Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🚀 Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd Beacon-backend
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration
1. Create a `.env` file in the root directory
2. Add the following environment variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/beacon_db
```

## 🏃‍♂️ Running the Server
Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 📚 API Documentation
Detailed API documentation can be found in [documentation.md](./documentation.md)

## 🤝 Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License
This project is licensed under the MIT License.
