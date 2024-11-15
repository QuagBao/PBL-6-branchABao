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
          <button type="submit" class="action-button add-button">Create</button>
          <button
            type="button"
            @click="cancelAction"
            class="action-button delete-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <div v-if="actionStep === 'update'" class="form-container">
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
          <button type="submit" class="action-button edit-button">
            Update
          </button>
          <button
            type="button"
            @click="cancelAction"
            class="action-button delete-button"
          >
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
/* Global styles */
* {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #ffffff;
  color: #333333;
  line-height: 1.6;
  font-size: 16px;
}

/* Tour Management Section */
.tour-management {
  padding: 20px;
  min-height: 100vh;
  background-color: #ffffff;
}

h2 {
  margin-bottom: 20px;
  color: #222222;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;
  text-align: center;
}

/* Table Container */
.table-container {
  max-height: 85vh;
  overflow-y: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Custom Scrollbar */
.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #cccccc;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-track {
  background: #f0f0f0;
}

/* Modern Table Styling */
.tour-table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border: 1px solid #dddddd;
}

.tour-table th,
.tour-table td {
  padding: 12px 16px;
  text-align: left;
}

.tour-table th {
  background-color: #f0f0f0;
  font-weight: bold;
  color: #222222;
}

.tour-table tr:nth-child(even) {
  background-color: #fafafa;
}

.tour-table tr:nth-child(odd) {
  background-color: #ffffff;
}

.tour-table tr:hover {
  background-color: #e9f4ff;
}

.tour-table td {
  color: #555555;
  font-size: 14px;
}

/* Form Styles */
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="time"],
input[type="date"],
textarea,
select {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333333;
  transition: border-color 0.2s ease-in-out;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
input[type="number"]:focus,
textarea:focus,
select:focus {
  border-color: #1877f2;
  box-shadow: 0 0 4px rgba(24, 119, 242, 0.2);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

/* Action Buttons */
button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #0078d4;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.action-button {
  padding: 8px 12px;
  margin: 0 5px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;
  font-weight: 700;
}

.action-button:hover {
  filter: brightness(0.9);
}

.edit-button {
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-button {
  background-color: #28a745;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.delete-button {
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.edit-button:hover,
.add-button:hover,
.delete-button:hover {
  transform: scale(1.1); /* Phóng to 1.1 lần */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Tạo hiệu ứng nổi */
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

/* Dropdown Styling */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%239ca3af' d='M0 0l5 5 5-5H0z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
}

select::-webkit-scrollbar {
  width: 8px;
}

select::-webkit-scrollbar-thumb {
  background-color: #1877f2;
  border-radius: 4px;
}

select::-webkit-scrollbar-track {
  background: #f5f5f5;
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
</style>
