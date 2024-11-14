<template>
  <div class="city-management">
    <h2>City Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showCreateForm">
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
      loadCities();
    };

    const showUpdateForm = async (cityID) => {
      const cityData = await updateCity(cityID);
      currentCity.value = { ...cityData };
      actionStep.value = "update";
    };

    const submitUpdateCity = async () => {
      await confirmUpdate(currentCity.value);
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
  height: calc(100vh - 90px);
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
  max-height: 80vh;
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

.city-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
}

.city-table th,
.city-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
}

.city-table th {
  background-color: rgba(255, 255, 255, 0.15); /* Light overlay on gradient */
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

.city-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15); /* Light overlay when hovering */
}

.city-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.city-table tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}

.city-table td {
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

.form-container {
  width: 60%;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(
    135deg,
    #0a015a,
    #03e6b8
  ); /* Light background for a subtle contrast */
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15); /* Lighter shadow */
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 500;
  color: #eef1f5; /* Facebook-style font color */
  font-weight: 600;
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
  background-color: #333333; /* Consistent hover for all buttons */
}
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>
