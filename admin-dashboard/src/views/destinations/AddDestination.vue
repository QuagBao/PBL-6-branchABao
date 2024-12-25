<template>
  <div class="destination-management">
    <h2>Destination Management</h2>
    <div class="form-container">
      <h3>Create Destination</h3>
      <form @submit.prevent="submitAddDestination" class="form-style">
        <!-- Basic Information -->
        <div class="form-group">
          <label>Destination Name:</label>
          <input type="text" v-model="destination.name" required />
        </div>
        <div class="form-group">
          <label>User create:</label>
          <select v-model="destination.user_id" class="form-control">
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" v-model="destination.description" />
        </div>

        <!-- Toggleable Additional Information -->
        <button type="button" class="toggle-button" @click="toggleMoreInfo">
          More Information <span>{{ isMoreInfoVisible ? '▲' : '▼' }}</span>
        </button>
        
        <div v-if="isMoreInfoVisible" class="additional-info">
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
        </div>

        <!-- Action Buttons -->
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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DestinationManagementController from '@/controllers/DestinationManagementController';

const destinations = ref([]);
const images = ref([]);
const cities = ref([]);
const users = ref([]);
const previewImages = ref([]);
const isMoreInfoVisible = ref(false);

const { confirmCreate, fetchCities, fetchUsers, } = DestinationManagementController();

const destination = ref({
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
});

onMounted(async () => {
  cities.value = await fetchCities();
  users.value = await fetchUsers();
});

const submitAddDestination = async () => {
  await confirmCreate(destination.value, images.value);
};

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

const cancelAction = () => {
  window.history.back();
};

const toggleMoreInfo = () => {
  isMoreInfoVisible.value = !isMoreInfoVisible.value;
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
  