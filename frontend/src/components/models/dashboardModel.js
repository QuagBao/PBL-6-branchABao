// cityModel.js
import { ref } from 'vue';

// Initialize cities as a reactive reference
const cities = ref([]);
const topics = ref([]);
const tours = ref([]);

const vietnamRegions = {
  "Hà Nội": "Northern Vietnam",
  "Hà Giang": "Northern Vietnam",
  "Cao Bằng": "Northern Vietnam",
  "Bắc Kạn": "Northern Vietnam",
  "Tuyên Quang": "Northern Vietnam",
  "Lào Cai": "Northern Vietnam",
  "Điện Biên": "Northern Vietnam",
  "Lai Châu": "Northern Vietnam",
  "Sơn La": "Northern Vietnam",
  "Yên Bái": "Northern Vietnam",
  "Hòa Bình": "Northern Vietnam",
  "Thái Nguyên": "Northern Vietnam",
  "Lạng Sơn": "Northern Vietnam",
  "Quảng Ninh": "Northern Vietnam",
  "Bắc Giang": "Northern Vietnam",
  "Phú Thọ": "Northern Vietnam",
  "Vĩnh Phúc": "Northern Vietnam",
  "Bắc Ninh": "Northern Vietnam",
  "Hải Dương": "Northern Vietnam",
  "Hải Phòng": "Northern Vietnam",
  "Hưng Yên": "Northern Vietnam",
  "Thái Bình": "Northern Vietnam",
  "Nam Định": "Northern Vietnam",
  "Ninh Bình": "Northern Vietnam",
  "Thanh Hóa": "North Central Vietnam",
  "Nghệ An": "North Central Vietnam",
  "Hà Tĩnh": "North Central Vietnam",
  "Quảng Bình": "Central Vietnam",
  "Quảng Trị": "Central Vietnam",
  "Thừa Thiên Huế": "Central Vietnam",
  "Đà Nẵng": "Central Vietnam",
  "Quảng Nam": "Central Vietnam",
  "Quảng Ngãi": "Central Vietnam",
  "Bình Định": "Central Vietnam",
  "Phú Yên": "Central Vietnam",
  "Khánh Hòa": "Central Vietnam",
  "Ninh Thuận": "Central Vietnam",
  "Bình Thuận": "Central Vietnam",
  "Kon Tum": "Central Vietnam",  
  "Gia Lai": "Central Vietnam",  
  "Đắk Lắk": "Central Vietnam",  
  "Đắk Nông": "Central Vietnam", 
  "Lâm Đồng": "Central Vietnam", 
  "TP Hồ Chí Minh": "Southern Vietnam",
  "Bà Rịa - Vũng Tàu": "Southern Vietnam",
  "Bình Dương": "Southern Vietnam",
  "Bình Phước": "Southern Vietnam",
  "Đồng Nai": "Southern Vietnam",
  "Tây Ninh": "Southern Vietnam",
  "An Giang": "Southern Vietnam",
  "Bạc Liêu": "Southern Vietnam",
  "Bến Tre": "Southern Vietnam",
  "Cà Mau": "Southern Vietnam",
  "Cần Thơ": "Southern Vietnam",
  "Đồng Tháp": "Southern Vietnam",
  "Hậu Giang": "Southern Vietnam",
  "Kiên Giang": "Southern Vietnam",
  "Long An": "Southern Vietnam",
  "Sóc Trăng": "Southern Vietnam",
  "Tiền Giang": "Southern Vietnam",
  "Trà Vinh": "Southern Vietnam",
  "Vĩnh Long": "Southern Vietnam"
};

// Function to fetch cities from the API
export const fetchCities = async () => {
  try {
    const response = await fetch('https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform the data into a format usable by Vue
    cities.value = data.map(city => ({
      id: city.id,
      name: city.name,
      description: city.description,
      images: city.images.map(image => image.url),
      region: vietnamRegions[city.name] || "Unknown Region",
    }));

    return cities.value;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu thành phố:", error);
    return []; // Return an empty array or handle as needed
  }
};

// Function to get the current list of cities
export const getCities = () => cities.value;

// Function to fetch topic from the API
export const fetchTopics = async () => {
  try {
    const response = await fetch('http://localhost:3000/topics');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform the data into a format usable by Vue
    topics.value = data.map(topic => ({
      id: topic.id,
      name: topic.name,
      imageUrl: topic.imageUrl,
    }));

    return topics.value;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu chủ đề:", error);
    return []; // Return an empty array or handle as needed
  }
};

// Function to get the current list of topic
export const getTopics = () => topics.value;

// Function to fetch tours from the API
export const fetchTours = async () => {
  try {
    const response = await fetch('http://localhost:3000/tours');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Transform the data into a format usable by Vue
    tours.value = data.map(tour => ({
      id: tour.id,
      name: tour.name,
      location: tour.location,
      reviewNumber: tour.reviewNumber,
      rating: tour.rating,
      imageUrl: tour.imageUrl,
    }));

    return tours.value;
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy dữ liệu tour:", error);
    return []; // Return an empty array or handle as needed
  }
};

// Function to get the current list of tours
export const getTours = () => tours.value;