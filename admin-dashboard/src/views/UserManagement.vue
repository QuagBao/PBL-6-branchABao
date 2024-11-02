<template>
  <div class="user-management">
    <h2>User Management</h2>
    <button class="add-user-button">Add User</button>
    <div class="table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="action-button edit-button" @click="editUser(user)">
                Edit
              </button>
              <button
                class="action-button delete-button"
                @click="removeUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  fetchUsers,
  createUser,
  modifyUser,
  removeUser,
} from "@/controllers/UserManagementController";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const users = ref([]);
    const router = useRouter();

    const loadUsers = async () => {
      users.value = await fetchUsers();
      if (users.value.length === 0) {
        alert("No users found, redirecting to login...");
        router.push("/login");
      }
    };

    onMounted(loadUsers);

    const removeUser = (id) => {
      // Logic to remove user
    };

    const editUser = (user) => {
      // Logic to edit user
    };

    return { users, removeUser, editUser };
  },
};
</script>

<style scoped>
.user-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; /* Light background for the entire section */
  border-radius: 8px; /* Rounded corners for the container */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

h2 {
  margin-bottom: 20px;
  color: #333; /* Darker color for better readability */
}

.table-container {
  max-height: 60vh; /* Đặt chiều cao tối đa cho vùng chứa bảng */
  overflow-y: auto; /* Thêm thanh cuộn dọc */
  background-color: #f9f9f9; /* Màu nền cho vùng chứa bảng */
  border-radius: 5px; /* Bo góc cho vùng chứa */
  padding: 10px; /* Khoảng cách bên trong */
}

/* Tùy chỉnh thanh cuộn */
.table-container::-webkit-scrollbar {
  width: 12px; /* Chiều rộng của thanh cuộn */
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1; /* Màu nền của thanh cuộn */
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #003366; /* Màu của thanh cuộn */
  border-radius: 10px; /* Bo góc cho thanh cuộn */
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #005b8c; /* Màu khi hover lên thanh cuộn */
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px; /* Khoảng cách giữa bảng và nút */
  border: 1px solid #d1d1d1; /* Đường viền bảng */
  border-radius: 8px; /* Bo góc cho bảng */
  overflow: hidden; /* Ẩn các góc viền bên trong */
}

.user-table th,
.user-table td {
  padding: 12px 16px; /* Điều chỉnh khoảng cách bên trong */
  text-align: left;
  border-bottom: 1px solid #d1d1d1; /* Đường viền giữa các hàng */
}

.user-table th {
  background-color: #e8f0fe; /* Màu nền cho tiêu đề */
  font-weight: bold;
  color: #333; /* Màu chữ tối */
  font-size: 14px; /* Kích thước chữ tiêu đề */
}

.user-table tr {
  transition: background-color 0.3s; /* Hiệu ứng chuyển màu nền khi hover */
}

.user-table tr:hover {
  background-color: #d1e1f5; /* Màu nền sáng khi hover */
}

.user-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Màu nền cho hàng chẵn */
}

.user-table tr:nth-child(odd) {
  background-color: #ffffff; /* Màu nền cho hàng lẻ */
}

.user-table td {
  color: #444; /* Màu chữ tối cho dữ liệu */
  font-size: 14px; /* Kích thước chữ dữ liệu */
}

.user-table td:last-child {
  border-bottom: none; /* Xóa đường viền cho ô cuối cùng */
}

.action-button {
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
}

.edit-button,
.delete-button {
  padding: 12px 24px; /* Tăng padding để nút dài hơn */
  color: white; /* Màu chữ */
  font-weight: bold; /* Chữ đậm */
  font-size: 16px; /* Kích thước chữ lớn hơn */
  border: none; /* Không có viền */
  border-radius: 5px; /* Bo góc */
  cursor: pointer; /* Con trỏ khi hover */
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
  width: 100%; /* Đặt chiều rộng nút 100% */
  margin-bottom: 10px; /* Khoảng cách giữa các nút */
}

.edit-button {
  background-color: #007bff; /* Màu nền cho nút chỉnh sửa */
}

.edit-button:hover {
  background-color: #0056b3; /* Màu nền khi hover */
  transform: scale(1.05); /* Tăng kích thước khi hover */
}

.delete-button {
  background-color: #dc3545; /* Màu nền cho nút xóa */
}

.delete-button:hover {
  background-color: #c82333; /* Màu nền khi hover */
  transform: scale(1.05); /* Tăng kích thước khi hover */
}

.add-user-button {
  padding: 10px 20px;
  background-color: #28a745; /* Màu nền */
  width: 30%;
  color: white; /* Màu chữ */
  border: none; /* Không có viền */
  border-radius: 5px; /* Bo góc */
  cursor: pointer; /* Con trỏ khi hover */
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s; /* Smooth transition for hover effects */
  font-weight: bold; /* Chữ đậm */
  font-size: 16px; /* Kích thước chữ */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ */
}

.add-user-button:hover {
  background-color: #218838; /* Màu nền khi hover */
  transform: scale(1.05); /* Tăng kích thước khi hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Đổ bóng rõ hơn khi hover */
}
</style>
