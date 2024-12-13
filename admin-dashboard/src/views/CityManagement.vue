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
          <tr v-for="city in paginatedCities" :key="city.id">
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
        <div class="form-group">
          <label>Images:</label>
          <input type="file" @change="handleImageUpload" multiple />
          <div class="image-list">
            <div
              v-for="(img, index) in previewImages"
              :key="index"
              class="image-item"
            >
              <img :src="img" alt="Image Preview" />
              <button @click.prevent="removeImage(index)">-</button>
            </div>
          </div>
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
        <div class="form-group">
          <label>Current Images:</label>
          <div class="image-list">
            <div
              v-for="img in currentCity.images"
              :key="img.id"
              class="image-item"
            >
              <img :src="img.url" alt="Existing Image" />
              <button @click.prevent="removeExistingImage(img.id)">-</button>
            </div>
          </div>
          <label>Upload New Images:</label>
          <input type="file" @change="handleNewImageUpload" multiple />
          <div class="image-list">
            <div
              v-for="(img, index) in previewNewImages"
              :key="index"
              class="image-item"
            >
              <img :src="img" alt="Image Preview" />
              <button @click.prevent="removeNewImage(index)">-</button>
            </div>
          </div>
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

<script setup>
import CityManagementController from "@/controllers/CityManagementController";
import { ref, computed, onMounted } from "vue";

const cities = ref([]);
const itemsPerPage = 5;
const currentPage = ref(1);

// Image handling
const images = ref([]);
const new_images = ref([]);
const image_ids_to_remove = ref([]);
const previewImages = ref([]);
const previewNewImages = ref([]);

// City data
const city = ref({ name: "", description: "", images: [] });
const currentCity = ref({ id: "", name: "", description: "", images: [] });

const {
  fetchCities,
  actionStep,
  createCity,
  updateCity,
  confirmCreate,
  confirmUpdate,
  deleteCity,
} = CityManagementController();

// Load cities on component mount
const loadCities = async () => {
  cities.value = await fetchCities();
};

onMounted(loadCities);

// Pagination
const paginatedCities = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return cities.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(cities.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// CRUD operations
const showCreateForm = () => {
  createCity();
};

const submitAddCity = async () => {
  await confirmCreate(city.value, images.value);
  city.value = { name: "", description: "", images: [] };
  previewImages.value = [];
  loadCities();
};

const showUpdateForm = async (cityID) => {
  const cityData = await updateCity(cityID);
  currentCity.value = { ...cityData };
  actionStep.value = "update";
};

const submitUpdateCity = async () => {
  await confirmUpdate(
    currentCity.value,
    new_images.value,
    image_ids_to_remove.value
  );
  previewNewImages.value = [];
  image_ids_to_remove.value = [];
  loadCities();
};

const cancelAction = () => {
  actionStep.value = "read";
};

const removeCity = async (cityID) => {
  await deleteCity(cityID);
  loadCities();
};

// Image handling functions
const handleImageUpload = (event) => {
  const files = event.target.files;
  Array.from(files).forEach((file) => {
    images.value.push(file);
    previewImages.value.push(URL.createObjectURL(file));
  });
};

const removeImage = (index) => {
  images.value.splice(index, 1);
  URL.revokeObjectURL(previewImages.value[index]);
  previewImages.value.splice(index, 1);
};

const handleNewImageUpload = (event) => {
  const files = event.target.files;
  Array.from(files).forEach((file) => {
    new_images.value.push(file);
    previewNewImages.value.push(URL.createObjectURL(file));
  });
};

const removeNewImage = (index) => {
  new_images.value.splice(index, 1);
  URL.revokeObjectURL(previewNewImages.value[index]);
  previewNewImages.value.splice(index, 1);
};

const removeExistingImage = (id) => {
  image_ids_to_remove.value.push(id);
  currentCity.value.images = currentCity.value.images.filter(
    (img) => img.id !== id
  );
};

// Return exposed values and methods
</script>


<style scoped>
/* Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #ffffff; /* White background */
  color: #333333; /* Black text */
  line-height: 1.6;
}

.city-management {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333333;
  text-align: center;
}

/* Table Styling */
.table-container {
  overflow-x: auto;
}

.city-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #ddd; /* Light border */
}

.city-table th,
.city-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd; /* Light border between rows */
}

.city-table th {
  background-color: #f8f8f8; /* Light gray header */
  color: #333333;
  font-weight: bold;
}

.city-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Alternate row colors */
}

.city-table tr:nth-child(odd) {
  background-color: #ffffff; /* Alternate row colors */
}

.city-table tr:hover {
  background-color: #f1f1f1; /* Row hover effect */
}

/* Button Styling */
button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333333;
  color: #ffffff;
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
  gap: 10px;
  justify-content: flex-end;
}

body {
  background-color: #f9f9f9; /* Light background for entire page */
  color: #333333; /* Dark text for contrast */
  line-height: 1.6;
}

.form-container {
  max-width: 500px; /* Restrict width for better responsiveness */
  margin: 40px auto; /* Center form */
  padding: 20px 30px; /* Comfortable padding */
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Smooth rounded corners */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

/* Form Group Styling */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #4a4a4a; /* Dark gray for labels */
  margin-bottom: 6px; /* Space between label and input */
  font-weight: 600;
}

/* Input and Textarea Styling */
input,
textarea {
  width: 100%; /* Full width */
  padding: 12px 14px; /* Comfortable padding */
  font-size: 14px; /* Readable font size */
  border: 1px solid #d1d5db; /* Light border */
  border-radius: 6px; /* Rounded corners */
  background-color: #f7f8fa; /* Slightly lighter background */
  color: #333333;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af; /* Light gray for placeholders */
}

input:focus,
textarea:focus {
  border-color: #1877f2; /* Blue border on focus */
  box-shadow: 0 0 3px rgba(24, 119, 242, 0.5); /* Subtle glow */
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

/* Hình ảnh */
.image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-item {
  position: relative;
  width: 100px;
  height: 100px;
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.image-item button {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px;
  font-size: 12px;
  transition: transform 0.2s;
}

.image-item button:hover {
  transform: scale(1.1);
}
</style>
