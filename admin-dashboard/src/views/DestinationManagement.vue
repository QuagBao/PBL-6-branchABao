<template>
  <div class="destination-management">
    <h2>Destination Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="add-destination-button" @click="showCreateForm">
        Add New Destination
      </button>
      <table class="destination-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Destination Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="destination in destinations" :key="destination.id">
            <td>{{ destination.id }}</td>
            <td>{{ destination.name }}</td>
            <td>{{ destination.description }}</td>
            <td v-if="destination.address">
              {{ destination.address.street }}, {{ destination.address.ward }},
              {{ destination.address.district }}
            </td>
            <td>
              <button
                class="action-button edit-button"
                @click="showUpdateForm(destination.id)"
              >
                Update Destination
              </button>
              <button
                class="action-button delete-button"
                @click="deleteDestination(destination.id)"
              >
                Delete Destination
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create Destination</h3>
      <form @submit.prevent="submitAddDestination" class="form-style">
        <div class="form-group">
          <label>Destination Name:</label>
          <input type="text" v-model="destination.name" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="destination.description" />
        </div>
        <div class="form-group">
          <label>Price bottom:</label>
          <input type="number" v-model="destination.price_bottom" />
        </div>
        <div class="form-group">
          <label>Price top:</label>
          <input type="number" v-model="destination.price_top" />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="number" v-model="destination.age" />
        </div>
        <div class="form-group">
          <label>Open time:</label>
          <input type="time" v-model="destination.opentime" />
        </div>
        <div class="form-group">
          <label>Duration:</label>
          <input type="number" v-model="destination.duration" />
        </div>
        <div class="form-group">
          <label>Date Create:</label>
          <input type="date" v-model="destination.date_create" />
        </div>
        <div class="form-group">
          <label>City ID:</label>
          <input type="number" v-model="destination.address.city_id" />
        </div>
        <div class="form-group">
          <label>District:</label>
          <input type="text" v-model="destination.address.district" />
        </div>
        <div class="form-group">
          <label>Ward:</label>
          <input type="text" v-model="destination.address.ward" />
        </div>
        <div class="form-group">
          <label>Street:</label>
          <input type="text" v-model="destination.address.street" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="file" @change="handleImageUpload" multiple />
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
      <h3>Update Destination Info</h3>
      <form @submit.prevent="submitUpdateDestination" class="form-style">
        <div class="form-group">
          <label>ID:</label>
          <input type="text" v-model="currentDestination.id" disabled />
        </div>
        <div class="form-group">
          <label>Destination Name:</label>
          <input type="text" v-model="currentDestination.name" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="currentDestination.description" />
        </div>
        <div class="form-group">
          <label>Price bottom:</label>
          <input type="number" v-model="currentDestination.price_bottom" />
        </div>
        <div class="form-group">
          <label>Price top:</label>
          <input type="number" v-model="currentDestination.price_top" />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="number" v-model="currentDestination.age" />
        </div>
        <div class="form-group">
          <label>Open time:</label>
          <input type="time" v-model="currentDestination.opentime" />
        </div>
        <div class="form-group">
          <label>Duration:</label>
          <input type="number" v-model="currentDestination.duration" />
        </div>
        <div class="form-group">
          <label>Date Create:</label>
          <input type="date" v-model="currentDestination.date_create" />
        </div>
        <div class="form-group">
          <label>City ID:</label>
          <input type="number" v-model="currentDestination.address.city_id" />
        </div>
        <div class="form-group">
          <label>District:</label>
          <input type="text" v-model="currentDestination.address.district" />
        </div>
        <div class="form-group">
          <label>Ward:</label>
          <input type="text" v-model="currentDestination.address.ward" />
        </div>
        <div class="form-group">
          <label>Street:</label>
          <input type="text" v-model="currentDestination.address.street" />
        </div>

        <div class="form-group">
          <label>Image:</label>
          <input type="file" @change="handleImageUpload" multiple />
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
import DestinationManagementController from "@/controllers/DestinationManagementController";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const destinations = ref([]);
    const toast = useToast();
    const images = ref([]);

    const {
      fetchDestinations,
      actionStep,
      createDestination,
      updateDestination,
      confirmCreate,
      confirmUpdate,
      deleteDestination,
    } = DestinationManagementController();

    const destination = ref({
      name: "",
      price_bottom: 0,
      price_top: 0,
      age: 0,
      opentime: "",
      duration: 0,
      description: "",
      date_create: "",
      address: {
        city_id: 0,
        district: "",
        ward: "",
        street: "",
      },
    });
    const currentDestination = ref({
      id: 0,
      name: "",
      price_bottom: 0,
      price_top: 0,
      age: 0,
      opentime: "",
      duration: 0,
      description: "",
      date_create: "",
      address: {
        city_id: 0,
        district: "",
        ward: "",
        street: "",
      },
    });

    const loadDestinations = async () => {
      destinations.value = await fetchDestinations();
    };

    onMounted(loadDestinations);

    const showCreateForm = () => {
      createDestination();
    };

    const submitAddDestination = async () => {
      await confirmCreate(destination.value, images.value);
      destination.value = { name: "", description: "" };
      actionStep.value = "read";
      loadDestinations();
    };

    const showUpdateForm = async (destinationID) => {
      const destinationData = await updateDestination(destinationID);
      currentDestination.value = { ...destinationData };
      actionStep.value = "update";
    };

    const handleImageUpload = (event) => {
      const files = event.target.files; // Lấy tất cả các tệp đã chọn
      if (files.length > 0) {
        images.value = Array.from(files); // Chuyển đổi mảng tệp thành mảng và lưu vào images
      }
    };

    const submitUpdateDestination = async () => {
      await confirmUpdate(currentDestination.value, images.value);
      actionStep.value = "read";
      loadDestinations;
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    return {
      destinations,
      actionStep,
      destination,
      currentDestination,
      showCreateForm,
      submitAddDestination,
      showUpdateForm,
      submitUpdateDestination,
      cancelAction,
      deleteDestination,
      handleImageUpload,
      images,
    };
  },
};
</script>

<style scoped>
* {
  font-family: Arial, sans-serif;
}

.destination-management {
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

.destination-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px; /* Khoảng cách giữa bảng và nút */
  border: 1px solid #d1d1d1; /* Đường viền bảng */
  border-radius: 8px; /* Bo góc cho bảng */
  overflow: hidden; /* Ẩn các góc viền bên trong */
}

.destination-table th,
.destination-table td {
  padding: 12px 16px; /* Điều chỉnh khoảng cách bên trong */
  text-align: left;
  border-bottom: 1px solid #d1d1d1; /* Đường viền giữa các hàng */
}

.destination-table th {
  background-color: #e8f0fe; /* Màu nền cho tiêu đề */
  font-weight: bold;
  color: #333; /* Màu chữ tối */
  font-size: 14px; /* Kích thước chữ tiêu đề */
}

.destination-table tr {
  transition: background-color 0.3s; /* Hiệu ứng chuyển màu nền khi hover */
}

.destination-table tr:hover {
  background-color: #d1e1f5; /* Màu nền sáng khi hover */
}

.destination-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Màu nền cho hàng chẵn */
}

.destination-table tr:nth-child(odd) {
  background-color: #ffffff; /* Màu nền cho hàng lẻ */
}

.destination-table td {
  color: #444; /* Màu chữ tối cho dữ liệu */
  font-size: 14px; /* Kích thước chữ dữ liệu */
}

.destination-table td:last-child {
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

.add-destination-button {
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

.add-destination-button:hover {
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
input[type="time"],
input[type="date"],
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
input[type="time"]::placeholder,
input[type="date"]::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

/* Focus effect for input fields */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
input[type="time"]::placeholder,
input[type="date"]::placeholder,
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
