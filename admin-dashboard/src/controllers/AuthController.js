// src/controllers/AuthController.js
import { authenticateUser } from "@/models/UserModel";

export const login = (username, password) => {
  const user = authenticateUser(username, password);
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user)); // Lưu thông tin người dùng
    return true; // Đăng nhập thành công
  }
  return false; // Đăng nhập thất bại
};

export const logout = () => {
  localStorage.removeItem("loggedInUser"); // Xóa thông tin người dùng
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser")); // Trả về thông tin người dùng đã đăng nhập
};
