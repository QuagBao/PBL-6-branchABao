<template>
  <div class="user-management">
    <h2>User Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showAddUserForm">
        Add User
      </button>
      <table class="user-table">
        <thead>
          <tr>
            <th>Id</th>
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
            <td>{{ user.id }}</td>
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
              <button
                v-if="user.userInfo"
                class="action-button edit-button"
                @click="showUpdateForm(user.id)"
              >
                Edit user info
              </button>
              <button
                v-else
                class="action-button add-button"
                @click="showCreateForm(user.id)"
              >
                Create user info
              </button>
              <button
                class="action-button change-button"
                @click="changeStatus(user.id)"
              >
                Change user status
              </button>
              <button
                class="action-button delete-button"
                @click="deleteInfo(user.userInfo.id)"
              >
                Delete user info
              </button>
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

    <div v-if="actionStep === 'addUser'" class="form-container">
      <h3>Create User</h3>
      <form @submit.prevent="submitAddUser" class="form-style">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="newUser.username" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="newUser.email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" v-model="newUser.password" />
        </div>
        <div class="form-group">
          <label>Confirm Password:</label>
          <input type="password" v-model="newUser.confirmPassword" />
        </div>
        <div class="button-group">
          <button type="submit" class="create-button">Create</button>
          <button type="button" @click="cancelAction" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
    <!-- Create User info Form -->
    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create User Info</h3>
      <form @submit.prevent="submitCreateUser" class="form-style">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="currentUser.username" disabled />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="currentUser.email" disabled />
        </div>
        <div class="form-group">
          <label>Role:</label>
          <input type="text" v-model="currentUser.role" disabled />
        </div>

        <!-- User Info Section -->
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="currentUser.userInfo.description"></textarea>
        </div>
        <div class="form-group">
          <label>Phone Number:</label>
          <input type="text" v-model="currentUser.userInfo.phone_number" />
        </div>

        <!-- Image Section -->
        <div class="form-group">
          <label>Current Image:</label>
          <!-- Display current image if available -->
          <div v-if="currentUser.userInfo.image.url">
            <img
              :src="currentUser.userInfo.image.url"
              alt="Current Image"
              style="width: 150px; height: auto; margin-bottom: 10px"
            />
          </div>
          <label for="imageUpload">Upload New Image:</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            id="imageUpload"
          />
        </div>

        <!-- Address Section -->
        <div class="form-group">
          <label>City:</label>
          <select
            v-model="currentUser.userInfo.address.city_id"
            class="form-control"
          >
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>District:</label>
          <input type="text" v-model="currentUser.userInfo.address.district" />
        </div>
        <div class="form-group">
          <label>Ward:</label>
          <input type="text" v-model="currentUser.userInfo.address.ward" />
        </div>
        <div class="form-group">
          <label>Street:</label>
          <input type="text" v-model="currentUser.userInfo.address.street" />
        </div>

        <!-- Form Buttons -->
        <div class="button-group">
          <button type="submit" class="create-button">Create</button>
          <button type="button" @click="cancelAction" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Update User info Form -->
    <div v-if="actionStep === 'update'" class="form-container">
      <h3>Update User Info</h3>
      <form @submit.prevent="submitUpdateUser" class="form-style">
        <div class="form-group">
          <label>Username:</label>
          <input type="text" v-model="currentUser.username" disabled />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" v-model="currentUser.email" disabled />
        </div>
        <div class="form-group">
          <label>Role:</label>
          <input type="text" v-model="currentUser.role" disabled />
        </div>

        <!-- User Info Section -->
        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="currentUser.userInfo.description"></textarea>
        </div>
        <div class="form-group">
          <label>Phone Number:</label>
          <input type="text" v-model="currentUser.userInfo.phone_number" />
        </div>

        <!-- Image Section -->
        <div class="form-group">
          <label>Current Image:</label>
          <!-- Display current image if available -->
          <div v-if="currentUser.userInfo.image.url">
            <img
              :src="currentUser.userInfo.image.url"
              alt="Current Image"
              style="width: 150px; height: auto; margin-bottom: 10px"
            />
          </div>
          <label for="imageUpload">Upload New Image:</label>
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            id="imageUpload"
          />
        </div>

        <!-- Address Section -->
        <div class="form-group">
          <label>City:</label>
          <select
            v-model="currentUser.userInfo.address.city_id"
            class="form-control"
          >
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>District:</label>
          <input type="text" v-model="currentUser.userInfo.address.district" />
        </div>
        <div class="form-group">
          <label>Ward:</label>
          <input type="text" v-model="currentUser.userInfo.address.ward" />
        </div>
        <div class="form-group">
          <label>Street:</label>
          <input type="text" v-model="currentUser.userInfo.address.street" />
        </div>
        <!-- Form Buttons -->
        <div class="button-group">
          <button type="submit" class="update-button">Update</button>
          <button type="button" @click="cancelAction" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserManagementController from "@/controllers/UserManagementController";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const users = ref([]);
    const router = useRouter();
    const toast = useToast();
    const cities = ref([]);

    const itemsPerPage = 5;
    const currentPage = ref(1);

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

    const currentUser = ref({
      id: "",
      username: "",
      email: "",
      role: "",
      userInfo: {
        id: 0,
        description: "",
        phone_number: "",
        image: {
          id: 0,
          url: "",
        },
        address: {
          district: "",
          street: "",
          ward: "",
          city_id: 0,
          id: 0,
        },
      },
      status: "",
    });

    const newUser = ref({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const uploadedImageFile = ref(
      currentUser.value.userInfo.image.url
        ? currentUser.value.userInfo.image.url
        : null
    );

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
      if (currentUser.value.userInfo.image.url) {
        uploadedImageFile.value = currentUser.value.userInfo.image.url;
      } else {
        uploadedImageFile.value = "";
      }
    });

    const paginatedUsers = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return users.value.slice(startIndex, startIndex + itemsPerPage);
    });

    const totalPages = computed(() =>
      Math.ceil(users.value.length / itemsPerPage)
    );

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const showAddUserForm = () => {
      addUser();
    };

    const getCityName = (city_id) => {
      const city = cities.value.find((c) => c.id === city_id);
      return city ? city.name : "Unknown City";
    };

    const submitAddUser = async () => {
      await confirmAddUser(newUser.value);
      loadUsers();
    };

    const showCreateForm = async (userID) => {
      const user = await createInfo(userID);

      currentUser.value = {
        ...user,
        userInfo: {
          id: user.userInfo?.id || 0,
          description: user.userInfo?.description || "",
          phone_number: user.userInfo?.phone_number || "",
          image: {
            url: user.userInfo?.image?.url || "",
          },
          address: {
            district: user.userInfo?.address?.district || "",
            street: user.userInfo?.address?.street || "",
            ward: user.userInfo?.address?.ward || "",
            city_id: user.userInfo?.address?.city_id ?? 0,
          },
        },
        status: user.status || "",
      };
    };

    const showUpdateForm = async (userID) => {
      const user = await updateInfo(userID);

      currentUser.value = {
        ...user,
        userInfo: {
          id: user.userInfo?.id || 0,
          description: user.userInfo?.description || "",
          phone_number: user.userInfo?.phone_number || "",
          image: {
            url: user.userInfo?.image?.url || "",
          },
          address: {
            district: user.userInfo?.address?.district || "",
            street: user.userInfo?.address?.street || "",
            ward: user.userInfo?.address?.ward || "",
            city_id: user.userInfo?.address?.city_id ?? 0,
          },
        },
        status: user.status || "",
      };
      console.log(currentUser.value);
    };

    const submitCreateUser = async () => {
      await confirmCreateInfo(currentUser.value, uploadedImageFile.value);
      loadUsers();
    };

    const submitUpdateUser = async () => {
      await confirmUpdateInfo(currentUser.value, uploadedImageFile.value);
      loadUsers();
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedImageFile.value = file;
        currentUser.value.userInfo.image.url = URL.createObjectURL(file);
      }
    };

    return {
      users,
      actionStep,
      currentUser,
      newUser,
      showCreateForm,
      showUpdateForm,
      submitCreateUser,
      submitUpdateUser,
      cancelAction,
      deleteInfo,
      showAddUserForm,
      submitAddUser,
      handleImageUpload,
      changeStatus,
      cities,
      getCityName,
      paginatedUsers,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  },
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
</style>
