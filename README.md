# 🚕 CRX - Car Rental Platform

> A modern, full-featured car rental management system built with TypeScript, Node.js, and MongoDB.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://crx-server-three.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🌟 Features

### 👤 User Management
- **Secure Authentication** - User registration and login with bcrypt password hashing
- **Email Verification** - Welcome emails sent upon registration
- **Admin Approval System** - Users must be verified before accessing the platform
- **User Profiles** - View and update user information
- **Role-Based Access** - Different permissions for users and admins

### 🚗 Car Management
- **Comprehensive Car Catalog** - Browse available vehicles with detailed information
- **Advanced Search & Filtering** - Search by name, brand, model with pagination
- **Car Availability Tracking** - Real-time availability status updates
- **Image Management** - Cloudinary integration for car images
- **CRUD Operations** - Full create, read, update, and soft delete functionality
- **Sorting & Pagination** - Efficient data browsing with customizable views

### 📅 Booking System
- **Real-time Booking Management** - Track all rental bookings
- **Booking Status Tracking** - Monitor pending, confirmed, and completed bookings
- **Automated Car Availability** - Automatic updates based on booking status

### 📊 Admin Dashboard
- **Analytics Overview** - Comprehensive platform statistics
  - Total users, cars, and bookings
  - Booking status distribution
  - Most rented vehicles
  - Monthly revenue tracking
  - Car availability metrics
- **User Management** - Block/unblock users, approve registrations
- **Revenue Insights** - Monthly revenue aggregation and reporting

### 🔧 Technical Features
- **Error Handling** - Centralized error management with custom AppError class
- **Query Builder** - Powerful querying with search, filter, sort, and pagination
- **Data Validation** - Type-safe operations with TypeScript interfaces
- **Soft Delete** - Preserve data integrity with soft delete functionality
- **Aggregation Pipelines** - Complex MongoDB aggregations for analytics

## 🛠️ Tech Stack

- **Backend Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcrypt for password hashing
- **File Storage**: Cloudinary for image management
- **Email Service**: Custom email service with templates
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crx-server.git
   cd crx-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/block` - Block user (Admin)
- `PUT /api/users/:id/unblock` - Unblock user (Admin)

### Cars
- `POST /api/cars` - Create new car (Admin)
- `GET /api/cars` - Get all available cars
- `GET /api/cars/:id` - Get car by ID
- `PUT /api/cars/:id` - Update car (Admin)
- `DELETE /api/cars/:id` - Delete car (Admin)
- `PATCH /api/cars/:id/availability` - Update car availability (Admin)

### Admin
- `GET /api/admin/analysis` - Get platform analytics (Admin)

## 📊 Database Schema

### User Model
- name, email, password
- role (user/admin)
- isVerified status
- timestamps

### Car Model
- name, brand, model
- image, description
- pricePerHour
- isAvailable, isDeleted
- timestamps

### Booking Model
- user, car references
- status (pending/confirmed/completed)
- totalPrice
- timestamps

## 🔐 Security Features

- Password hashing with bcrypt
- Admin approval required for new users
- Role-based access control
- Soft delete for data preservation
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/samio11)
- LinkedIn: [Your LinkedIn]([https://linkedin.com/in/yourprofile](https://www.linkedin.com/in/samio-hasan))

## 🙏 Acknowledgments

- Thanks to all contributors who have helped this project grow
- Built with modern web technologies and best practices

---

⭐ **Star this repo if you find it helpful!**

🔗 **Live Demo**: [https://crx-server-three.vercel.app/](https://crx-server-three.vercel.app/)
