<template>
  <div class="restaurant-management">
    <h2>Restaurant Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showCreateForm">
        Add New Restaurant
      </button>
      <table class="restaurant-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Destination Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Restaurant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="restaurant in restaurants" :key="restaurant.id">
            <td>{{ restaurant.restaurant.id }}</td>
            <td>{{ restaurant.name }}</td>
            <td>{{ restaurant.description }}</td>
            <td>
              {{ restaurant.address.street }}, {{ restaurant.address.ward }},
              {{ restaurant.address.district }},
              {{ getCityName(restaurant.address.city_id) }}
            </td>
            <td>
              <div>
                <!-- Restaurant Details Table -->
                <table class="restaurant-details">
                  <tbody>
                    <tr>
                      <td>Cuisine</td>
                      <td>{{ restaurant.restaurant.cuisine }}</td>
                    </tr>
                    <tr>
                      <td>Special diet</td>
                      <td>{{ restaurant.restaurant.special_diet }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              <button
                class="action-button edit-button"
                @click="showUpdateForm(restaurant.restaurant.id)"
              >
                Update Restaurant
              </button>
              <button
                class="action-button delete-button"
                @click="deleteRestaurant(restaurant.restaurant.id)"
              >
                Delete Restaurant
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create Restaurant</h3>
      <form @submit.prevent="submitAddRestaurant" class="form-style">
        <div class="form-group">
          <label>Destination ID:</label>
          <input
            type="text"
            v-model="restaurant.id"
            @blur="fetchDestinationName"
            required
          />
        </div>
        <div class="form-group">
          <label>Destination Name:</label>
          <input type="text" v-model="restaurant.name" required disabled />
        </div>
        <div class="form-group">
          <label>Cuisine:</label>
          <input type="text" v-model="restaurant.restaurant.cuisine" />
        </div>
        <div class="form-group">
          <label>Special diet:</label>
          <input type="text" v-model="restaurant.restaurant.special_diet" />
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
      <h3>Update Restaurant</h3>
      <form @submit.prevent="submitUpdateRestaurant" class="form-style">
        <div class="form-group">
          <label>Destination ID:</label>
          <input type="text" v-model="currentRestaurant.id" required disabled />
        </div>
        <div class="form-group">
          <label>Destination Name:</label>
          <input
            type="text"
            v-model="currentRestaurant.name"
            required
            disabled
          />
        </div>
        <div class="form-group">
          <label>Cuisine:</label>
          <input type="text" v-model="currentRestaurant.restaurant.cuisine" />
        </div>
        <div class="form-group">
          <label>Special diet:</label>
          <input
            type="text"
            v-model="currentRestaurant.restaurant.special_diet"
          />
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
import RestaurantManagementController from "@/controllers/RestaurantManagementController";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const restaurants = ref([]);
    const cities = ref([]);

    const {
      fetchRestaurants,
      actionStep,
      createRestaurant,
      updateRestaurant,
      confirmCreate,
      confirmUpdate,
      deleteRestaurant,
      getDestination,
      fetchCities,
    } = RestaurantManagementController();

    const restaurant = ref({
      id: 0,
      name: "",
      restaurant: {
        cuisine: "",
        special_diet: "",
        id: "",
      },
    });
    const currentRestaurant = ref({
      id: 0,
      name: "",
      hotel_id: 0,
      restaurant: {
        cuisine: "",
        special_diet: "",
        id: "",
      },
    });

    const fetchDestinationName = async () => {
      try {
        const destination = await getDestination(restaurant.value.id);
        if (destination && destination.name) {
          restaurant.value.name = destination.name;
        }
      } catch (error) {
        restaurant.value.name = "Destination not found";
      }
    };

    const loadCity = async () => {
      cities.value = await fetchCities();
    };
    onMounted(loadCity);

    const loadRestaurants = async () => {
      restaurants.value = await fetchRestaurants();
    };

    onMounted(loadRestaurants);

    const getCityName = (city_id) => {
      const city = cities.value.find((c) => c.id === city_id);
      return city ? city.name : "Unknown City";
    };

    const showCreateForm = () => {
      createRestaurant();
    };

    const submitAddRestaurant = async () => {
      await confirmCreate(restaurant.value);
      restaurant.value = { name: "", description: "" };
      actionStep.value = "read";
      loadRestaurants();
    };

    const showUpdateForm = async (restaurantID) => {
      const restaurantData = await updateRestaurant(restaurantID);
      currentRestaurant.value = { ...restaurantData };
      actionStep.value = "update";
    };

    const submitUpdateRestaurant = async () => {
      await confirmUpdate(currentRestaurant.value);
      actionStep.value = "read";
      loadRestaurants();
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    return {
      restaurants,
      actionStep,
      restaurant,
      currentRestaurant,
      showCreateForm,
      submitAddRestaurant,
      showUpdateForm,
      submitUpdateRestaurant,
      cancelAction,
      deleteRestaurant,
      fetchDestinationName,
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

.restaurant-management {
  padding: 20px;
  min-height: 100vh;
  overflow: auto;
  background: linear-gradient(135deg, #0a015a, #03e6b8);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #ffffff;
}

/* Bảng thông tin */
.table-container {
  max-height: 82vh;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.1);
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

.restaurant-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
}

.restaurant-table th,
.restaurant-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
}

.restaurant-table th {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

.restaurant-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.restaurant-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.restaurant-table tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}

.restaurant-table td {
  color: #ffffff;
  font-size: 14px;
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
