// Users Collection - Base user information
db.users.insertMany([
  {
    _id: ObjectId(),
    email: "sarah.anderson@email.com",
    password: "$2b$12$hashedpassword", // bcrypt hashed
    userType: "caregiver", // "caregiver" or "client"
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    profileCompletion: 85
  },
  {
    _id: ObjectId(),
    email: "michael.johnson@email.com", 
    password: "$2b$12$hashedpassword",
    userType: "client",
    isVerified: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLogin: new Date(),
    profileCompletion: 92
  }
]);