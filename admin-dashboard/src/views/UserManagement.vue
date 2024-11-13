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
          <tr v-for="user in users" :key="user.id">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const users = ref([]);
    const router = useRouter();
    const toast = useToast();
    const cities = ref([]);
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
        uploadedImageFile.value = currentUser.value.userInfo.image.url; // Load actual image URL initially
      } else {
        uploadedImageFile.value = ""; // Replace with actual placeholder URL if needed
      }
    });

    const showAddUserForm = () => {
      addUser();
    };

    const getCityName = (city_id) => {
      const city = cities.value.find((c) => c.id === city_id);
      return city ? city.name : "Unknown City";
    };

    const submitAddUser = async () => {
      confirmAddUser(newUser.value);
    };

    const showCreateForm = async (userID) => {
      const user = await createInfo(userID);

      // Kiểm tra và khởi tạo userInfo nếu null
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

      // Kiểm tra và khởi tạo userInfo nếu null
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

    const submitCreateUser = () => {
      // Logic to handle user creation
      confirmCreateInfo(currentUser.value, uploadedImageFile.value);
    };

    const submitUpdateUser = () => {
      // Logic to handle user update
      confirmUpdateInfo(currentUser.value, uploadedImageFile.value);
    };

    const cancelAction = () => {
      actionStep.value = "read"; // Cancel action and return to list view
    };
    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        uploadedImageFile.value = file;
        currentUser.value.userInfo.image.url = URL.createObjectURL(file); // Temporary URL for preview
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
    };
  },
};
</script>

<style scoped>
* {
  font-family: Arial, sans-serif;
}

.user-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  overflow: auto; /* Thêm cuộn nếu nội dung vượt quá chiều cao tối đa */
  background: linear-gradient(
    135deg,
    #0a015a,
    #03e6b8
  ); /* Gradient background */
  color: #ffffff; /* Light color for text contrast */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #ffffff; /* White text for title */
}

.table-container {
  max-height: 82vh;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
  border-radius: 5px;
  padding: 10px;
}

.table-container::-webkit-scrollbar {
  width: 12px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #005b8c;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #0078d4;
}

.user-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
}

.user-table th,
.user-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
}

.user-table th {
  background-color: rgba(255, 255, 255, 0.15); /* Light overlay on gradient */
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

.user-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15); /* Light overlay when hovering */
}

.user-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.user-table tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}

.user-table td {
  color: #ffffff;
  font-size: 14px;
}

.action-button {
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button {
  background-color: #0078d4;
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
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(
    135deg,
    #0a015a,
    #03e6b8
  ); /* Gradient for consistency */
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
  color: #eef1f5;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="time"],
input[type="date"],
input[type="file"],
textarea {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  color: #333;
  border: 1px solid #d1d5db; /* Light border */
  border-radius: 6px; /* Rounded corners */
  background-color: #f3f4f6; /* Light background for inputs */
  outline: none;
  transition: border-color 0.2s ease;
}

input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="number"]::placeholder,
input[type="time"]::placeholder,
input[type="date"]::placeholder,
input[type="file"]::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
input[type="file"]:focus,
textarea:focus {
  border-color: #1877f2;
}

button {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 48%;
}

.create-button {
  background-color: #42b72a;
  color: #ffffff;
}

.update-button {
  background-color: #1877f2;
  color: #ffffff;
}

.cancel-button {
  background-color: #e41e1e;
  color: #ffffff;
}

button:hover {
  background-color: #333333;
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
</style>
