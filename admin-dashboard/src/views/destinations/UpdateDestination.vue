<template>
  <div class="destination-management">
    <h2>Destination Management</h2>
    <div class="form-container">
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
          <label>User create:</label>
          <select v-model="currentDestination.user_id" class="form-control">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="currentDestination.description" />
        </div>
        <!-- Toggleable Additional Information -->
        <button type="button" class="toggle-button" @click="toggleMoreInfo">
          More Information <span>{{ isMoreInfoVisible ? '▲' : '▼' }}</span>
        </button>
        <div v-if="isMoreInfoVisible" class="additional-info">
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
          <div class="form-group" v-if="currentDestination && currentDestination.address">
            <label>City:</label>
            <select
              v-model="currentDestination.address.city_id"
              class="form-control"
            >
              <option v-for="city in cities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
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
        </div>
        <div class="form-group">
          <label>Current Images:</label>
          <div class="image-list">
            <div
              v-for="img in currentDestination.images"
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
import { ref, onMounted } from 'vue';
import DestinationManagementController from '@/controllers/DestinationManagementController';
import { useRoute } from "vue-router";
const route = useRoute();
const destinationID = route.params.id;  

const cities = ref([]);
const users = ref([]);
const new_images = ref([]);
const image_ids_to_remove = ref([]);
const previewNewImages = ref([]);
const isMoreInfoVisible = ref(false);

const {
  updateDestination,
  confirmUpdate,
  fetchCities,
  fetchUsers,
} = DestinationManagementController();

const currentDestination = ref({
  id: 0,
  name: '',
  user_id: 0,
  price_bottom: 0,
  price_top: 0,
  age: 0,
  opentime: '',
  duration: 0,
  description: '',
  date_create: '',
  address: {
    city_id: 0,
    district: '',
    ward: '',
    street: '',
  },
  images: [],
  hotel_id: 0,
  hotel: {
    property_amenities: '',
    room_features: '',
    room_types: '',
    hotel_class: 0,
    hotel_styles: '',
    languages: '',
    phone: '',
    email: '',
    website: '',
    id: '',
  },
  restaurant_id: 0,
  restaurant: {
    cuisine: '',
    special_diet: '',
    feature: '',
    meal: '',
    id: '',
  },
});

const toggleMoreInfo = () => {
  isMoreInfoVisible.value = !isMoreInfoVisible.value;
};

const loadCity = async () => {
  cities.value = await fetchCities();
};

const loadUsers = async () => {
  users.value = await fetchUsers();
};

onMounted(async () => {
  await loadUsers();
  await loadCity();
  await showUpdateForm(destinationID);
});

const showUpdateForm = async (destinationID) => {
  const destinationData = await updateDestination(destinationID);
  currentDestination.value = {
    ...destinationData,
    address: destinationData.address || { city_id: null, district: '', ward: '', street: '' },
  };
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
  currentDestination.value.images = currentDestination.value.images.filter(
    (img) => img.id !== id
  );
};

const submitUpdateDestination = async () => {
  await confirmUpdate(
    currentDestination.value,
    new_images.value,
    image_ids_to_remove.value
  );
};

const cancelAction = () => {
  window.history.back();
};
</script>
  
  
<style scoped>
* {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.destination-management {
  padding: 20px;
  min-height: 90vh;
  background-color: #ffffff;
  color: #333;
}

h2 {
font-size: 24px;
color: #2c3e50;
text-align: center;
margin-bottom: 20px;
}

/* Form */
.form-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
h3 {
font-size: 20px;
margin-bottom: 15px;
color: #34495e;
}

.form-style {
display: flex;
flex-direction: column;
gap: 15px;
}

.form-group {
display: flex;
flex-direction: column;
gap: 5px;
}

label {
font-size: 14px;
color: #555;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #f9fafb;
  color: #333;
  outline: none;
  transition: border-color 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #1877f2;
  box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
}

button:hover {
  filter: brightness(0.9);
}

input:focus, select:focus {
outline: none;
border-color: #0078d7;
box-shadow: 0 0 5px rgba(0, 120, 215, 0.5);
}

.toggle-button {
background: none;
border: none;
color: #0078d7;
cursor: pointer;
font-size: 14px;
margin-bottom: 10px;
}

.toggle-button:hover {
text-decoration: underline;
}

.additional-info {
margin-top: 10px;
border-top: 1px solid #ddd;
padding-top: 10px;
}

.image-list {
display: flex;
gap: 10px;
}

.image-item img {
width: 50px;
height: 50px;
object-fit: cover;
border-radius: 5px;
border: 1px solid #ddd;
}

.image-item button {
background: #e74c3c;
color: white;
border: none;
padding: 5px;
border-radius: 50%;
cursor: pointer;
font-size: 10px;
position: relative;
top: -5px;
left: -5px;
}

.image-item button:hover {
background: #c0392b;
}

/* CSS cho các action button */
.action-buttons {
  display: flex;
  justify-content: flex-end; /* Đẩy các nút về phía phải */
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-top: 10px; /* Tạo khoảng cách giữa nút và phần phía trên */
}

.action-buttons button {
  background-color: transparent;
  border: 1px solid #007bff; /* Màu viền cho nút */
  color: #007bff; /* Màu chữ cho nút */
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 5px; /* Bo tròn góc cho nút */
  cursor: pointer;
  display: flex;
  align-items: center;
}

.action-buttons button i {
  margin-right: 5px; /* Khoảng cách giữa icon và chữ */
}

.action-buttons button:hover {
  background-color: #007bff;
  color: #fff; /* Màu chữ khi hover */
}

/* Căn nút ở góc phải trong phần Hotel Information và Restaurant Information */
.detail-card .action-buttons,
.info-card .action-buttons {
  position: absolute; /* Vị trí tuyệt đối so với phần tử cha */
  right: 0;
  top: 10px;
  display: flex;
  gap: 10px;
}

/* Điều chỉnh nút khi không có dữ liệu */
.no-data .action-buttons {
  justify-content: flex-end;
}

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

/* Nút hành động */
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
  background-color: #ec870b;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.view-button {
  background-color: #0fb6e0;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.edit-button:hover,
.add-button:hover,
.delete-button:hover,
.view-button:hover {
  transform: scale(1.1); /* Phóng to 1.1 lần */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Tạo hiệu ứng nổi */
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
  