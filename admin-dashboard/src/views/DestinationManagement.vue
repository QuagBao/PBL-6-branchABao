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
          <tr
            v-for="destination in paginatedDestinations"
            :key="destination.id"
          >
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
import DestinationManagementController from "@/controllers/DestinationManagementController";
import { ref, onMounted, computed } from "vue";

export default {
  setup() {
    const destinations = ref([]);
    const images = ref([]);
    const cities = ref([]);
    const new_images = ref([]);
    const image_ids_to_remove = ref([]);
    const previewImages = ref([]);
    const previewNewImages = ref([]);

    const itemsPerPage = 5;
    const currentPage = ref(1);

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
      previewImages.value = [];
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
      previewNewImages.value = [];
      image_ids_to_remove.value = [];
      loadDestinations();
    };

    const cancelAction = () => {
      actionStep.value = "read";
    };

    const paginatedDestinations = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return destinations.value.slice(startIndex, startIndex + itemsPerPage);
    });

    const totalPages = computed(() =>
      Math.ceil(destinations.value.length / itemsPerPage)
    );

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
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
      paginatedDestinations,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  },
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
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
}

/* Bảng thông tin */
.table-container {
  max-height: 85vh;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 15px;
}

.table-container::-webkit-scrollbar {
  width: 8px;
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #1877f2;
  border-radius: 10px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background-color: #145dbf;
}

.destination-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.destination-table th,
.destination-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.destination-table th {
  background-color: #f3f4f6;
  font-weight: bold;
  color: #333;
}

.destination-table tr:nth-child(even) {
  background-color: #f9fafb;
}

.destination-table tr:hover {
  background-color: #e4e6eb;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  display: block;
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
</style>
