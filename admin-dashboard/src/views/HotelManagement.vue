<template>
  <div class="destination-management">
    <h2>Hotel Management</h2>
    <div v-if="actionStep === 'read'" class="table-container">
      <button class="action-button add-button" @click="showCreateForm">
        Add New Hotel
      </button>
      <table class="destination-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Destination Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Hotel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hotel in hotels" :key="hotel.id">
            <td>{{ hotel.hotel.id }}</td>
            <td>{{ hotel.name }}</td>
            <td>{{ hotel.description }}</td>
            <td>
              {{ hotel.address.street }}, {{ hotel.address.ward }},
              {{ hotel.address.district }},
              {{ getCityName(hotel.address.city_id) }}
            </td>
            <td>
              <div>
                <!-- Hotel Details Table -->
                <table class="hotel-details">
                  <tbody>
                    <tr>
                      <td>Property Amenities</td>
                      <td>{{ hotel.hotel.property_amenities }}</td>
                    </tr>
                    <tr>
                      <td>Room Features</td>
                      <td>{{ hotel.hotel.room_features }}</td>
                    </tr>
                    <tr>
                      <td>Room Types</td>
                      <td>{{ hotel.hotel.room_types }}</td>
                    </tr>
                    <tr>
                      <td>Hotel Class</td>
                      <td>{{ hotel.hotel.hotel_class }}</td>
                    </tr>
                    <tr>
                      <td>Hotel Styles</td>
                      <td>{{ hotel.hotel.hotel_styles }}</td>
                    </tr>
                    <tr>
                      <td>Languages</td>
                      <td>{{ hotel.hotel.Languages }}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{{ hotel.hotel.phone }}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{{ hotel.hotel.email }}</td>
                    </tr>
                    <tr>
                      <td>Website</td>
                      <td>
                        <a :href="hotel.hotel.website" target="_blank">{{
                          hotel.hotel.website
                        }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
            <td>
              <button
                class="action-button edit-button"
                @click="showUpdateForm(hotel.hotel.id)"
              >
                Update Hotel
              </button>
              <button
                class="action-button delete-button"
                @click="deleteHotel(hotel.hotel.id)"
              >
                Delete Hotel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="actionStep === 'create'" class="form-container">
      <h3>Create Hotel</h3>
      <form @submit.prevent="submitAddHotel" class="form-style">
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

        <h2>Hotel Detail:</h2>

        <div class="form-group">
          <label>Property Amenities:</label>
          <input type="text" v-model="hotel.hotel.property_amenities" />
        </div>
        <div class="form-group">
          <label>Room Features:</label>
          <input type="text" v-model="hotel.hotel.room_features" />
        </div>
        <div class="form-group">
          <label>Room Type:</label>
          <input type="text" v-model="hotel.hotel.room_types" />
        </div>
        <div class="form-group">
          <label>Hotel class:</label>
          <input type="number" v-model="hotel.hotel.hotel_class" />
        </div>
        <div class="form-group">
          <label>Hotel Styles:</label>
          <input type="text" v-model="hotel.hotel.hotel_styles" />
        </div>
        <div class="form-group">
          <label>Languages:</label>
          <input type="text" v-model="hotel.hotel.Languages" />
        </div>
        <div class="form-group">
          <label>Phone number:</label>
          <input type="text" v-model="hotel.hotel.phone" />
        </div>
        <div class="form-group">
          <label>Business Email:</label>
          <input type="text" v-model="hotel.hotel.email" />
        </div>
        <div class="form-group">
          <label>Business website:</label>
          <input type="text" v-model="hotel.hotel.website" />
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
      <form @submit.prevent="submitUpdateHotel" class="form-style">
        <div class="form-group">
          <label>Destination Name:</label>
          <input type="text" v-model="currentHotel.name" required />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="currentHotel.description" />
        </div>
        <div class="form-group">
          <label>Price bottom:</label>
          <input type="number" v-model="currentHotel.price_bottom" />
        </div>
        <div class="form-group">
          <label>Price top:</label>
          <input type="number" v-model="currentHotel.price_top" />
        </div>
        <div class="form-group">
          <label>Age:</label>
          <input type="number" v-model="currentHotel.age" />
        </div>
        <div class="form-group">
          <label>Open time:</label>
          <input type="time" v-model="currentHotel.opentime" />
        </div>
        <div class="form-group">
          <label>Duration:</label>
          <input type="number" v-model="currentHotel.duration" />
        </div>
        <div class="form-group">
          <label>Date Create:</label>
          <input type="date" v-model="currentHotel.date_create" />
        </div>
        <div class="form-group">
          <label>City:</label>
          <select v-model="currentHotel.address.city_id" class="form-control">
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>District:</label>
          <input type="text" v-model="currentHotel.address.district" />
        </div>
        <div class="form-group">
          <label>Ward:</label>
          <input type="text" v-model="currentHotel.address.ward" />
        </div>
        <div class="form-group">
          <label>Street:</label>
          <input type="text" v-model="currentHotel.address.street" />
        </div>

        <div class="form-group">
          <label>Current Images:</label>
          <div class="image-list">
            <div
              v-for="img in currentHotel.images"
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
        <div class="form-group">
          <label>Property Amenities:</label>
          <input type="text" v-model="currentHotel.hotel.property_amenities" />
        </div>
        <div class="form-group">
          <label>Room Features:</label>
          <input type="text" v-model="currentHotel.hotel.room_features" />
        </div>
        <div class="form-group">
          <label>Room Type:</label>
          <input type="text" v-model="currentHotel.hotel.room_features" />
        </div>
        <div class="form-group">
          <label>Hotel class:</label>
          <input type="number" v-model="currentHotel.hotel.hotel_class" />
        </div>
        <div class="form-group">
          <label>Hotel Styles:</label>
          <input type="text" v-model="currentHotel.hotel.hotel_styles" />
        </div>
        <div class="form-group">
          <label>Languages:</label>
          <input type="text" v-model="currentHotel.hotel.Languages" />
        </div>
        <div class="form-group">
          <label>Phone number:</label>
          <input type="text" v-model="currentHotel.hotel.phone" />
        </div>
        <div class="form-group">
          <label>Business Email:</label>
          <input type="text" v-model="currentHotel.hotel.email" />
        </div>
        <div class="form-group">
          <label>Business website:</label>
          <input type="text" v-model="currentHotel.hotel.website" />
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
import HotelManagementController from "@/controllers/HotelManagementController";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const hotels = ref([]);
    const cities = ref([]);
    const images = ref([]);
    const new_images = ref([]);
    const image_ids_to_remove = ref([]);
    const previewImages = ref([]);
    const previewNewImages = ref([]);

    const {
      fetchHotels,
      actionStep,
      createHotel,
      updateHotel,
      confirmCreate,
      confirmUpdate,
      deleteHotel,
      getDestination,
      fetchCities,
    } = HotelManagementController();

    const hotel = ref({
      id: 0,
      name: "",
      hotel: {
        property_amenities: "",
        room_features: "",
        room_types: "",
        hotel_class: 0,
        hotel_styles: "",
        Languages: "",
        phone: "",
        email: "",
        website: "",
        id: "",
      },
    });
    const currentHotel = ref({
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
      hotel_id: 0,
      hotel: {
        property_amenities: "",
        room_features: "",
        room_types: "",
        hotel_class: 0,
        hotel_styles: "",
        Languages: "",
        phone: "",
        email: "",
        website: "",
        id: "",
      },
    });

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

    const fetchDestinationName = async () => {
      try {
        const destination = await getDestination(hotel.value.id);
        if (destination && destination.name) {
          hotel.value.name = destination.name;
        }
      } catch (error) {
        hotel.value.name = "Destination not found";
      }
    };

    const loadCity = async () => {
      cities.value = await fetchCities();
    };
    onMounted(loadCity);

    const loadHotels = async () => {
      hotels.value = await fetchHotels();
    };

    onMounted(loadHotels);

    const getCityName = (city_id) => {
      const city = cities.value.find((c) => c.id === city_id);
      return city ? city.name : "Unknown City";
    };

    const showCreateForm = () => {
      createHotel();
    };

    const submitAddHotel = async () => {
      await confirmCreate(hotel.value, destination.value, images.value);
      hotel.value = { name: "", description: "" };
      previewImages.value = [];
      loadHotels();
    };

    const showUpdateForm = async (hotelID) => {
      const hotelData = await updateHotel(hotelID);
      currentHotel.value = { ...hotelData };
      actionStep.value = "update";
    };

    const submitUpdateHotel = async () => {
      await confirmUpdate(
        currentHotel.value,
        new_images.value,
        image_ids_to_remove.value
      );
      previewNewImages.value = [];
      image_ids_to_remove.value = [];
      loadHotels();
    };

    const cancelAction = () => {
      actionStep.value = "read";
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
      currentHotel.value.images = currentHotel.value.images.filter(
        (img) => img.id !== id
      );
    };

    return {
      hotels,
      actionStep,
      hotel,
      currentHotel,
      showCreateForm,
      submitAddHotel,
      showUpdateForm,
      submitUpdateHotel,
      cancelAction,
      deleteHotel,
      fetchDestinationName,
      cities,
      getCityName,
      handleImageUpload,
      destination,
      removeImage,
      handleNewImageUpload,
      removeNewImage,
      removeExistingImage,
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
  background: rgb(0, 4, 255);
  color: white;
  border: none;
  border-radius: 20%;
  cursor: pointer;
}
</style>
