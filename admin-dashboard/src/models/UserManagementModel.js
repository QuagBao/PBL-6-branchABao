// src/models/UserManagementModel.js
import axios from "axios";

export async function getUsers() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
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
      userInfo: user.user_info,
      role: user.role,
      status: user.status,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getUserById(userId) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Fetch the basic user information based on userId
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/user/${userId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = response.data;

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      userInfo: user.user_info,
      role: user.role,
      status: user.status,
    };
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return null; // Return null or handle as needed
  }
}

export async function createUserInfo(user) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/userInfo/${user.id}`,
      {
        description: user.description,
        phone_number: user.phone_number,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("User info created successfully");
      return { success: true, message: "User info created successfully" };
    }
  } catch (error) {
    console.error("Error creating user info:", error);
    return { success: false, message: "Failed to create user info" };
  }
}

// Cập nhật thông tin người dùng
export async function updateUserInfo(user) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/userInfo/${user.id}`, // sử dụng user.id làm userId
      {
        description: user.description,
        phone_number: user.phone_number,
      },
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("User info updated successfully");
      return { success: true, message: "User info updated successfully" };
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    return { success: false, message: "Failed to update user info" };
  }
}

export async function deleteUserInfo(userID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/userInfo/${userID}`, // sử dụng user.id làm userId
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("User info delete successfully");
      return { success: true, message: "User info deleted successfully" };
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    return { success: false, message: "Failed to delete info" };
  }
}

export async function addNewUser(user) {
  try {
    const data = {
      username: user.username,
      password: user.password,
      email: user.email,
    };
    const response = await axios.post(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/user/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data.username) {
      return { success: true, name: response.data.username }; // Assuming name is returned
    } else {
      return { success: false, message: "Failed to register account" };
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      return { success: false, message: "Invalid data" };
    } else {
      return { success: false, message: "An error occurred" };
    }
  }
}
