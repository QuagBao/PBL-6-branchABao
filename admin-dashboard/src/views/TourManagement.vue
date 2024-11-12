<template>
  <div class="destination-management">
    <h2>Tour Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="add-destination-button" @click="showCreateForm">
        Add New Tour
      </button>
      <table class="destination-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tour Name</th>
            <th>Description</th>
            <th>User ID</th>
            <th>City ID</th>
            <th>Duration</th>
            <th>Tour Detail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tour in tours" :key="tour.id">
            <td>{{ tour.id }}</td>
            <td>{{ tour.name }}</td>
            <td>{{ tour.description }}</td>
            <td>{{ tour.user_id }}</td>
            <td>{{ tour.city_id }}</td>
            <td>{{ tour.duration }}</td>
            <td>
              <div>
                <table class="tours-details">
                  <tbody>
                    <tr
                      v-for="destination in tour.destinations"
                      :key="destination.id"
                    >
                      <td>{{ destination.id }}</td>
                      <td>{{ destination.name }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              <button
                class="action-button edit-button"
                @click="showUpdateForm(tour.id)"
              >
                Update Tour
              </button>
              <button
                class="action-button delete-button"
                @click="deleteTour(tour.id)"
              >
                Delete Tour
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create Tour</h3>
      <form @submit.prevent="submitAddTour" class="form-style">
        <div class="form-group">
          <label>Tour Name:</label>
          <input type="text" v-model="tour.name" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" v-model="tour.description" />
        </div>
        <div class="form-group">
          <label>User id:</label>
          <input type="text" v-model="tour.user_id" />
        </div>
        <div class="form-group">
          <label>City id:</label>
          <input type="text" v-model="tour.city_id" />
        </div>
        <div class="form-group">
          <label>Destinations:</label>
          <div
            v-for="(destination, index) in tour.destination_ids"
            :key="index"
            class="destination-group"
          >
            <select v-model="tour.destination_ids[index]" required>
              <option disabled value="">Select a destination</option>
              <option
                v-for="dest in destinations"
                :key="dest.id"
                :value="dest.id"
              >
                {{ dest.name }}
              </option>
            </select>
            <button
              type="button"
              @click="removeDestination(index)"
              class="remove-button"
            >
              -
            </button>
          </div>
          <button type="button" @click="addDestination" class="add-button">
            + Add Destination
          </button>
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
      <h3>Update Hotel Info</h3>
      <form @submit.prevent="submitUpdateTour" class="form-style">
        <div class="form-group">
          <label>Tour Name:</label>
          <input type="text" v-model="currentTour.name" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <input type="text" v-model="currentTour.description" />
        </div>
        <div class="form-group">
          <label>User id:</label>
          <input type="text" v-model="currentTour.user_id" />
        </div>
        <div class="form-group">
          <label>City id:</label>
          <input type="text" v-model="currentTour.city_id" />
        </div>
        <div class="form-group">
          <label>Destinations:</label>
          <div
            v-for="(destination, index) in currentTour.destination_ids"
            :key="index"
            class="destination-group"
          >
            <select v-model="currentTour.destination_ids[index]" required>
              <option disabled value="">Select a destination</option>
              <option
                v-for="dest in destinations"
                :key="dest.id"
                :value="dest.id"
              >
                {{ dest.name }}
              </option>
            </select>
            <button
              type="button"
              @click="removeDestination_update(index)"
              class="remove-button"
            >
              -
            </button>
          </div>
          <button
            type="button"
            @click="addDestination_update"
            class="add-button"
          >
            + Add Destination
          </button>
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
import TourManagementController from "@/controllers/TourManagementController";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const tours = ref([]);
    const destinations = ref([]);

    const {
      fetchTours,
      actionStep,
      createTour,
      updateTour,
      confirmCreate,
      confirmUpdate,
      deleteTour,
      getDestination,
    } = TourManagementController();

    const tour = ref({
      name: "",
      description: "",
      user_id: "",
      city_id: "",
      destination_ids: [],
    });
    const currentTour = ref({
      id: 0,
      name: "",
      description: "",
      user_id: "",
      city_id: "",
      destination_ids: [],
    });
    const currentTourDetail = ref({
      id: 0,
      name: "",
      description: "",
      user_id: "",
      city_id: "",
      destinations: [],
    });

    const fetchDestination = async () => {
      destinations.value = await getDestination();
    };

    const loadTours = async () => {
      tours.value = await fetchTours();
    };

    onMounted(loadTours);
    onMounted(fetchDestination);

    const addDestination = () => {
      tour.value.destination_ids.push("");
    };

    const removeDestination = (index) => {
      tour.value.destination_ids.splice(index, 1);
    };

    const addDestination_update = () => {
      currentTour.value.destination_ids.push("");
    };

    const removeDestination_update = (index) => {
      currentTour.value.destination_ids.splice(index, 1);
    };

    const showCreateForm = () => {
      createTour();
    };

    const submitAddTour = async () => {
      await confirmCreate(tour.value);
      actionStep.value = "read";
      loadTours();
    };

    const showUpdateForm = async (tourID) => {
      const tourData = await updateTour(tourID);
      currentTourDetail.value = { ...tourData };
      currentTour.value.id = currentTourDetail.value.id;
      currentTour.value.name = currentTourDetail.value.name;
      currentTour.value.description = currentTourDetail.value.description;
      currentTour.value.user_id = currentTourDetail.value.user_id;
      currentTour.value.city_id = currentTourDetail.value.city_id;
      currentTour.value.destination_ids =
        currentTourDetail.value.destinations.map(
          (destination) => destination.id
        );
      console.log(currentTourDetail.value);
      console.log(currentTour.value);
      actionStep.value = "update";
    };

    const submitUpdateTour = async () => {
      await confirmUpdate(currentTour.value);
      actionStep.value = "read";
      loadTours();
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    return {
      tours,
      actionStep,
      tour,
      currentTour,
      showCreateForm,
      submitAddTour,
      showUpdateForm,
      submitUpdateTour,
      cancelAction,
      deleteTour,
      fetchDestination,
      addDestination,
      removeDestination,
      destinations,
      addDestination_update,
      removeDestination_update,
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

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="time"],
input[type="datetime-local"],
textarea,
select {
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
input[type="datetime-local"]::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

/* Focus effect for input fields */
input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
input[type="time"]:focus,
input[type="datetime-local"]:focus,
textarea:focus,
select:focus {
  border-color: #0078d4; /* Microsoft blue color on focus */
  background-color: #ffffff; /* White background on focus */
}

/* Dropdown appearance */
select {
  appearance: none; /* Remove default dropdown icon */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%239ca3af' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
}

/* Style for the container of each destination selection */
.destination-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

/* Style for dropdown with custom scroll and font size */
.destination-group select {
  flex: 7; /* 70% width */
  padding: 12px;
  font-size: 16px;
  color: #333;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f3f4f6;
  outline: none;
  transition: border-color 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%239ca3af' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
  height: auto; /* Allow height to adjust with the option list */
  overflow-y: auto; /* Enable vertical scroll */
}

/* Custom scroll style for dropdown */
.destination-group select::-webkit-scrollbar {
  width: 10px;
}
.destination-group select::-webkit-scrollbar-thumb {
  background-color: #0078d4; /* Dark blue scrollbar */
  border-radius: 4px;
}
.destination-group select::-webkit-scrollbar-track {
  background: #f3f4f6;
}

/* Limit dropdown to display maximum 10 items before scrolling */
.destination-group select option {
  max-height: 3.5vh; /* Approximate height per item for visibility */
}
.destination-group select {
  max-height: calc(3.5vh * 10); /* Max height to show 10 items */
}

/* Style for the remove button, taking up 30% of the container width */
.destination-group .remove-button {
  flex: 3; /* 30% width */
  padding: 10px;
  font-size: 14px;
  color: white;
  background-color: #d9534f; /* Red background for remove button */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

/* Hover and focus effect for the remove button */
.destination-group .remove-button:hover {
  background-color: #c9302c; /* Darker red on hover */
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
