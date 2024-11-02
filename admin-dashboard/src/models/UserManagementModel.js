// src/models/UserManagementModel.js
import axios from "axios";

// Hàm lấy tất cả người dùng từ API
export async function getUsers() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/user/",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Hoặc bạn có thể xử lý theo cách khác
  }
}
