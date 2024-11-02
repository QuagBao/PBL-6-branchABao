// src/models/UserManagementModel.js

// Khởi tạo danh sách người dùng mẫu
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Brown", email: "alice@example.com" },
  { id: 4, name: "Bob Johnson", email: "bob@example.com" },
  { id: 5, name: "Charlie Lee", email: "charlie@example.com" },
];

// Hàm lấy tất cả người dùng
export function getUsers() {
  return users;
}

// Hàm thêm người dùng mới
export function addUser(newUser) {
  users.push(newUser);
}

// Hàm chỉnh sửa thông tin người dùng theo ID
export function updateUser(id, updatedUser) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
  }
}

// Hàm xóa người dùng theo ID
export function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
}
