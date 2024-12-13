<template>
    <div class="user-management">
      <h2>User Management</h2>
      <div class="table-container">
        <button class="action-button add-button" @click="showAddUserForm">
          Add User
        </button>
        <table class="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Description</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td v-if="user.userInfo && user.userInfo.description">
                {{ user.userInfo.description }}
              </td>
              <td v-else>N/A</td>
              <td v-if="user.userInfo && user.userInfo.phone_number">
                {{ user.userInfo.phone_number }}
              </td>
              <td v-else>N/A</td>
              <td v-if="user.userInfo && user.userInfo.address">
                {{ user.userInfo.address.street }},
                {{ user.userInfo.address.ward }},
                {{ user.userInfo.address.district }},
                {{ getCityName(user.userInfo.address.city_id) }}
              </td>
              <td v-else>N/A</td>
              <td>{{ user.role }}</td>
              <td>{{ user.status }}</td>
              <td>
                <div class="dropdown">
                  <button 
                    class="action-button dropdown-toggle"
                    @click="toggleDropdown(user.id)"
                  >
                    <span class="icon">☰</span>
                  </button>
                  <div class="dropdown-menu" v-if="activeDropdown === user.id">
                    <button
                      class="dropdown-item"
                      v-if="user.userInfo"
                      @click="showUpdateForm(user.id)"
                    >
                      Edit user info
                    </button>
                    <button
                      class="dropdown-item"
                      v-else
                      @click="showCreateForm(user.id)"
                    >
                      Create user info
                    </button>
                    <button
                      class="dropdown-item"
                      @click="changeStatus(user.id)"
                    >
                      Change user status
                    </button>
                    <button
                      class="dropdown-item"
                      @click="deleteInfo(user.userInfo.id)"
                    >
                      Delete user info
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="prevPage">
            Previous
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button :disabled="currentPage === totalPages" @click="nextPage">
            Next
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import UserManagementController from "@/controllers/UserManagementController";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const users = ref([]);
const cities = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const activeDropdown = ref(null);

const router = useRouter();
const toast = useToast();

const {
  fetchUsers,
  actionStep,
  createInfo,
  updateInfo,
  confirmCreateInfo,
  confirmUpdateInfo,
  deleteInfo,
  addUser,
  confirmAddUser,
  changeStatus,
  fetchCities,
} = UserManagementController();

const loadUsers = async () => {
  users.value = await fetchUsers();
  if (users.value.length === 0) {
    toast.error("No users found, redirecting to login...");
    router.push("/login");
  }
};

const loadCity = async () => {
  cities.value = await fetchCities();
};

onMounted(loadCity);

onMounted(async () => {
  await loadUsers();
});

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const showAddUserForm = () => {
  window.location.assign(`/users/create`);
};

const getCityName = (city_id) => {
  const city = cities.value.find((c) => c.id === city_id);
  return city ? city.name : "Unknown City";
};

const showCreateForm = async (userID) => {
  window.location.assign(`/users/createInfo/${userID}`);
};

const showUpdateForm = async (userID) => {
  window.location.assign(`/users/updateInfo/${userID}`);
};

const cancelAction = () => {
  actionStep.value = "read";
};

const toggleDropdown = (userId) => {
  activeDropdown.value = activeDropdown.value === userId ? null : userId;
};
</script>

  
  <style scoped>
  * {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #ffffff; /* Nền trắng */
    color: #333333; /* Chữ đen */
    line-height: 1.6;
  }
  
  .user-management {
    padding: 20px;
    min-height: 80vh;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333333;
    text-align: center;
  }
  
  .table-container {
    max-height: 70vh;
    overflow-y: auto;
  }
  
  .table-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .table-container::-webkit-scrollbar-track {
    background: #f0f0f0;
  }
  
  .table-container::-webkit-scrollbar-thumb {
    background-color: #888888;
    border-radius: 4px;
  }
  
  .user-table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
    border: 1px solid #dddddd;
    font-size: 14px;
  }
  
  .user-table th,
  .user-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #dddddd;
  }
  
  .user-table th {
    background-color: #f8f9fa;
    color: #333333;
    font-weight: bold;
  }
  
  .user-table tr:nth-child(odd) {
    background-color: #f7f7f7;
  }
  
  .user-table tr:nth-child(even) {
    background-color: #ffffff;
  }
  
  .user-table tr:hover {
    background-color: #e9ecef;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    color: #ffffff;
    transition: background-color 0.2s;
  }
  
  .action-button {
    padding: 8px 12px;
    margin: 0 5px;
    border-radius: 5px;
    color: #ffffff;
    font-weight: bold;
    transition: background-color 0.3s, transform 0.2s;
    margin: 10px;
  }
  
  .edit-button {
    background-color: #007bff;
  }
  
  .edit-button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .add-button {
    background-color: #28a745;
  }
  
  .add-button:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  .delete-button {
    background-color: #dc3545;
  }
  
  .delete-button:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
  
  .change-button {
    background-color: #3114db;
  }
  
  .change-button:hover {
    background-color: #110670;
    transform: scale(1.05);
  }
  
  .form-container {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #dddddd;
    border-radius: 6px;
    background-color: #ffffff;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333333;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    font-size: 14px;
    color: #333333;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus,
  textarea:focus,
  select:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .create-button {
    background-color: #28a745;
  }
  
  .update-button {
    background-color: #007bff;
  }
  
  .cancel-button {
    background-color: #dc3545;
  }
  
  .cancel-button:hover {
    background-color: #c82333;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  .form-group {
    position: relative;
    width: 100%;
  }
  
  .form-group select {
    width: 100%;
    padding: 10px;
    padding-right: 35px; /* Thêm khoảng trống để chứa mũi tên */
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #f5f6f7; /* Màu nền nhẹ giống Facebook */
    font-size: 14px;
    color: #333;
    appearance: none;
    -webkit-appearance: none; /* Đồng nhất trên các trình duyệt */
    transition: border-color 0.3s, box-shadow 0.3s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%239ca3af' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 10px 6px;
  }
  
  .form-group select:focus {
    border-color: #1877f2; /* Màu xanh đậm Facebook khi focus */
    box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
    outline: none;
  }
  
  /* CSS cho thanh cuộn màu xanh đậm */
  .form-group select::-webkit-scrollbar {
    width: 10px;
  }
  
  .form-group select::-webkit-scrollbar-thumb {
    background-color: #1877f2; /* Màu xanh dương đậm */
    border-radius: 10px;
  }
  
  .form-group select::-webkit-scrollbar-track {
    background: #e0e0e0; /* Màu nền cho track thanh cuộn */
  }
  
  /* Style cho các options bên trong select */
  .form-group select option {
    padding: 10px;
    color: #333;
    background-color: #fff;
  }
  
  .form-group select option:hover {
    background-color: #e4e6eb; /* Màu nền khi hover */
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  
  .pagination button {
    padding: 5px 10px;
    background-color: #007bff;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .pagination span {
    font-weight: bold;
  }

  .dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: blue;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  background: rgb(0, 238, 255);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  min-width: 150px;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  text-align: left;
  background: none;
  color: #333;
  border: none;
  width: 100%;
}

.dropdown-item:hover {
  background: #0056b3;
  color: white;
}
  </style>
  