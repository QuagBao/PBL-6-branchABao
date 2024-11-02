// src/models/UserModel.js
export const users = [
  { id: 1, username: "admin", password: "admin123", name: "Admin User" },
  { id: 2, username: "user1", password: "user123", name: "User One" },
  // Thêm các user giả khác
];

export const authenticateUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};
