// cityModel.js
import { ref } from 'vue';

const topicsData = [
  {
    id: 1,
    name: "Culture",
    imageUrl: "/topics/culture.jpg"
  },
  {
    id: 2,
    name: "Great Food",
    imageUrl: "/topics/food.jpg"
  },
  {
    id: 3,
    name: "Hotel",
    imageUrl: "/topics/hotel.jpg"
  },
  {
    id: 4,
    name: "Must See Attraction",
    imageUrl: "/topics/must-see-attraction.jpg"
  },
  {
    id: 5,
    name: "Shopping",
    imageUrl: "/topics/shopping.jpg"
  }
];

// Tạo một `ref` để lưu trữ dữ liệu
export const topics = ref(topicsData);

// Hàm để lấy danh sách `topics`
export const fetchTopics = () => topics.value;
