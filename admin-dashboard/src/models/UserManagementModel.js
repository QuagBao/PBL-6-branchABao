// src/models/UserManagementModel.js
import axios from "axios";

// Hàm lấy tất cả người dùng từ API
export async function getUsers() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/user/",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Duyệt qua từng user để lấy thông tin chi tiết
    const usersWithDetails = await Promise.all(
      response.data.map(async (user) => {
        // Mặc định thông tin business_description và phone_number là trống
        let businessDescription = "";
        let phoneNumber = "";
        let isCreate = false;

        try {
          // Lấy thông tin chi tiết của từng user dựa trên user_id
          const userInfoResponse = await axios.get(
            `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/userInfo/${user.id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Nếu thành công, gán giá trị business_description và phone_number
          businessDescription = userInfoResponse.data.business_description;
          phoneNumber = userInfoResponse.data.phone_number;
          isCreate = true;
        } catch (error) {
          if (error.response && error.response.status === 500) {
            console.warn(
              `User info not found for user ID ${user.id}, defaulting to empty values.`
            );
          } else {
            console.error(
              `Error fetching user info for user ID ${user.id}:`,
              error
            );
          }
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          business_description: businessDescription,
          phone_number: phoneNumber,
          role: user.role,
          isCreate: isCreate,
        };
      })
    );

    return usersWithDetails;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Hoặc bạn có thể xử lý theo cách khác
  }
}
