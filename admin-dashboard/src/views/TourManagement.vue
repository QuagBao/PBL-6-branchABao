<template>
  <div class="tour-management">
    <h2>Tour Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showCreateForm">
        Add New Tour
      </button>
      <table class="tour-table">
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
          <button
            type="button"
            @click="addDestination"
            class="action-button add-button"
          >
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
            class="action-button add-button"
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
      actionStep.value = "update";
    };

    const submitUpdateTour = async () => {
      await confirmUpdate(currentTour.value);
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

.tour-management {
  padding: 20px;
  min-height: 100vh;
  overflow: auto;
  background: linear-gradient(135deg, #0a015a, #03e6b8);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #ffffff; /* Màu chữ sáng hơn cho tiêu đề */
}

/* Bảng thông tin */
.table-container {
  max-height: 85vh; /* Đặt chiều cao tối đa cho vùng chứa bảng */
  overflow-y: auto; /* Thêm thanh cuộn dọc */
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px; /* Bo góc cho vùng chứa */
  padding: 10px; /* Khoảng cách bên trong */
}

/* Tùy chỉnh thanh cuộn */
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

.tour-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
}

.tour-table th,
.tour-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
}

.tour-table th {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

.tour-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.tour-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.tour-table tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}

.tour-table td {
  color: #ffffff;
  font-size: 14px;
}

/* Ensure the form container takes up 100% width */
.destination-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 100%; /* Ensure it takes full width of the parent */
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

/* Limit dropdown to display a maximum of 10 items before scrolling */
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

/* Nút hành động */
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

/* Form */
.form-container {
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #0a015a, #03e6b8);
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
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f3f4f6;
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

/* Nút trong form */
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

.form-group select {
  width: 100%;
  padding: 10px;
  padding-right: 35px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f5f6f7;
  font-size: 14px;
  color: #333;
  appearance: none;
  -webkit-appearance: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%239ca3af' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
}

.form-group select:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
  outline: none;
}

.form-group select::-webkit-scrollbar {
  width: 10px;
}

.form-group select::-webkit-scrollbar-thumb {
  background-color: #1877f2;
  border-radius: 10px;
}

.form-group select::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.form-group select option {
  padding: 10px;
  color: #333;
  background-color: #fff;
}

.form-group select option:hover {
  background-color: #e4e6eb;
}
</style>
