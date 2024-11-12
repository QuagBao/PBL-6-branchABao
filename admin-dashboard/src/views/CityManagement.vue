<template>
  <div class="city-management">
    <h2>City Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="add-city-button" @click="showCreateForm">
        Add New City
      </button>
      <table class="city-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>City Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in cities" :key="city.id">
            <td>{{ city.id }}</td>
            <td>{{ city.name }}</td>
            <td>{{ city.description }}</td>
            <td>
              <button
                class="action-button edit-button"
                @click="showUpdateForm(city.id)"
              >
                Update City
              </button>
              <button
                class="action-button delete-button"
                @click="deleteCity(city.id)"
              >
                Delete City
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create City</h3>
      <form @submit.prevent="submitAddCity" class="form-style">
        <div class="form-group">
          <label>City Name:</label>
          <input type="text" v-model="city.name" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="city.description" required />
        </div>
        <div class="button-group">
          <button type="submit" class="create-button">Create</button>
          <button type="button" @click="cancelAction" class="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div v-if="actionStep === 'update'" class="form-container">
      <h3>Update City Info</h3>
      <form @submit.prevent="submitUpdateCity" class="form-style">
        <div class="form-group">
          <label>ID:</label>
          <input type="text" v-model="currentCity.id" disabled />
        </div>
        <div class="form-group">
          <label>City Name:</label>
          <input type="text" v-model="currentCity.name" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="currentCity.description" required />
        </div>
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
import CityManagementController from "@/controllers/CityManagementController";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const cities = ref([]);

    const {
      fetchCities,
      actionStep,
      createCity,
      updateCity,
      confirmCreate,
      confirmUpdate,
      deleteCity,
    } = CityManagementController();

    const city = ref({ name: "", description: "" });
    const currentCity = ref({ id: "", name: "", description: "" });

    const loadCities = async () => {
      cities.value = await fetchCities();
    };

    onMounted(loadCities);

    const showCreateForm = () => {
      createCity();
    };

    const submitAddCity = async () => {
      await confirmCreate(city.value);
      city.value = { name: "", description: "" };
      actionStep.value = "read";
      loadCities();
    };

    const showUpdateForm = async (cityID) => {
      const cityData = await updateCity(cityID);
      currentCity.value = { ...cityData };
      actionStep.value = "update";
    };

    const submitUpdateCity = async () => {
      await confirmUpdate(currentCity.value);
      actionStep.value = "read";
      loadCities();
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    return {
      cities,
      actionStep,
      city,
      currentCity,
      showCreateForm,
      submitAddCity,
      showUpdateForm,
      submitUpdateCity,
      cancelAction,
      deleteCity,
    };
  },
};
</script>

<style scoped>
* {
  font-family: Arial, sans-serif;
}

.city-management {
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

.city-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px; /* Khoảng cách giữa bảng và nút */
  border: 1px solid #d1d1d1; /* Đường viền bảng */
  border-radius: 8px; /* Bo góc cho bảng */
  overflow: hidden; /* Ẩn các góc viền bên trong */
}

.city-table th,
.city-table td {
  padding: 12px 16px; /* Điều chỉnh khoảng cách bên trong */
  text-align: left;
  border-bottom: 1px solid #d1d1d1; /* Đường viền giữa các hàng */
}

.city-table th {
  background-color: #e8f0fe; /* Màu nền cho tiêu đề */
  font-weight: bold;
  color: #333; /* Màu chữ tối */
  font-size: 14px; /* Kích thước chữ tiêu đề */
}

.city-table tr {
  transition: background-color 0.3s; /* Hiệu ứng chuyển màu nền khi hover */
}

.city-table tr:hover {
  background-color: #d1e1f5; /* Màu nền sáng khi hover */
}

.city-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Màu nền cho hàng chẵn */
}

.city-table tr:nth-child(odd) {
  background-color: #ffffff; /* Màu nền cho hàng lẻ */
}

.city-table td {
  color: #444; /* Màu chữ tối cho dữ liệu */
  font-size: 14px; /* Kích thước chữ dữ liệu */
}

.city-table td:last-child {
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
.delete-button,
.add-button {
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

.add-button {
  background-color: #28a745; /* Màu nền cho nút chỉnh sửa */
}

.add-button:hover {
  background-color: #02270b; /* Màu nền khi hover */
  transform: scale(1.05); /* Tăng kích thước khi hover */
}

.delete-button {
  background-color: #dc3545; /* Màu nền cho nút xóa */
}

.delete-button:hover {
  background-color: #c82333; /* Màu nền khi hover */
  transform: scale(1.05); /* Tăng kích thước khi hover */
}

.add-city-button {
  padding: 10px 20px;
  background-color: #28a745; /* Màu nền */
  width: 30%;
  color: white; /* Màu chữ */
  border: none; /* Không có viền */
  border-radius: 8px; /* Bo góc nhẹ */
  cursor: pointer; /* Con trỏ khi hover */
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s; /* Smooth transition for hover effects */
  font-weight: bold; /* Chữ đậm */
  font-size: 16px; /* Kích thước chữ */
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06); /* Đổ bóng thêm tầng */
}

.add-city-button:hover {
  background-color: #218838; /* Màu nền khi hover */
  transform: scale(1.07); /* Tăng kích thước khi hover */
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08); /* Đổ bóng rõ hơn khi hover */
}

/* Center form container */
.form-container {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

/* Form layout */
.form-style {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Form groups for label and input alignment */
.form-group {
  display: flex;
  margin-right: 10px;
  flex-direction: column;
  margin-bottom: 10px;
}

/* Labels */
.form-group label {
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}

/* Input fields and textarea styling */
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
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

/* Placeholder color for inputs */
input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="number"]::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

/* Focus effect for input fields */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
textarea:focus {
  border-color: #0078d4; /* Microsoft blue color on focus */
  background-color: #ffffff; /* White background on focus */
}

/* Textarea resizing */
textarea {
  resize: vertical;
  height: 80px;
  padding: 12px;
  font-size: 14px;
}

/* Button styling */
button {
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s ease, filter 0.2s ease;
  width: 40%;
}

/* Button container */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 1rem;
}

/* Button colors */
.create-button {
  background-color: #28a745; /* Green for create */
  color: white;
}

.update-button {
  background-color: #0078d4; /* Microsoft blue for update */
  color: white;
}

.cancel-button {
  background-color: #dc3545; /* Red for cancel */
  color: white;
}

/* Hover effect for buttons */
button:hover {
  transform: scale(1.05);
  filter: brightness(90%);
}
</style>
