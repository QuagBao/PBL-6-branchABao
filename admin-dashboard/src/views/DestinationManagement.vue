<template>
  <div class="destination-management">
    <h2>Destination Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showCreateForm">
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
              {{ destination.address.district }},
              {{ getCityName(destination.address.city_id) }}
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
          <label>City:</label>
          <select v-model="destination.address.city_id" class="form-control">
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
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

export default {
  setup() {
    const destinations = ref([]);
    const images = ref([]);
    const cities = ref([]);
    const new_images = ref([]);
    const image_ids_to_remove = ref([]);
    const previewImages = ref([]);
    const previewNewImages = ref([]);

    const {
      fetchDestinations,
      actionStep,
      createDestination,
      updateDestination,
      confirmCreate,
      confirmUpdate,
      deleteDestination,
      fetchCities,
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
      images: [],
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
      images: [],
    });

    const loadDestinations = async () => {
      destinations.value = await fetchDestinations();
    };

    const loadCity = async () => {
      cities.value = await fetchCities();
    };

    onMounted(loadCity);
    onMounted(loadDestinations);

    const getCityName = (city_id) => {
      const city = cities.value.find((c) => c.id === city_id);
      return city ? city.name : "Unknown City";
    };

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
      const files = event.target.files;
      Array.from(files).forEach((file) => {
        images.value.push(file);
        previewImages.value.push(URL.createObjectURL(file)); // Thêm URL preview vào mảng
      });
    };

    const removeImage = (index) => {
      images.value.splice(index, 1); // Xoá file ảnh khỏi mảng
      URL.revokeObjectURL(previewImages.value[index]); // Giải phóng bộ nhớ của URL preview
      previewImages.value.splice(index, 1); // Xoá URL preview khỏi mảng
    };

    const handleNewImageUpload = (event) => {
      const files = event.target.files;
      Array.from(files).forEach((file) => {
        new_images.value.push(file);
        previewNewImages.value.push(URL.createObjectURL(file)); // Thêm URL preview vào mảng
      });
    };

    const removeNewImage = (index) => {
      new_images.value.splice(index, 1); // Remove new image by index
      URL.revokeObjectURL(previewNewImages.value[index]); // Giải phóng bộ nhớ của URL preview
      previewNewImages.value.splice(index, 1); // Xoá URL preview khỏi mảng
    };

    const removeExistingImage = (id) => {
      image_ids_to_remove.value.push(id); // Add image id to removal list
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
      actionStep.value = "read";
      loadDestinations();
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
      handleNewImageUpload,
      removeImage,
      removeNewImage,
      removeExistingImage,
      images,
      new_images,
      image_ids_to_remove,
      cities,
      getCityName,
      previewImages,
      previewNewImages,
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

.table-container::-webkit-scrollbar-thumb {
  background-color: #005b8c;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #0078d4;
}

.destination-table {
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  margin-bottom: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  overflow: hidden;
}

.destination-table th,
.destination-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #d1d1d1;
}

.destination-table th {
  background-color: rgba(255, 255, 255, 0.15);
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
}

.destination-table tr:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.destination-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.destination-table tr:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.1);
}

.destination-table td {
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

.change-button {
  background-color: #3114db;
}

.change-button:hover {
  background-color: #110670;
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

.image-list {
  display: flex;
  flex-wrap: wrap;
}

.image-item {
  margin: 5px;
  position: relative;
}

.image-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.image-item button {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>
