import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
export default function () {
  
  const heartFull = new URL('@/assets/heart-full.svg', import.meta.url).href;
  const heartEmpty = new URL('@/assets/heart-none.svg', import.meta.url).href;
  
  

  const fetchCityDetails = async (cityId) => {
    try {
      const response = await fetch(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/${cityId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Chuyển đổi dữ liệu thành định dạng có thể sử dụng trong Vue
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        images: data.images.map(image => ({
          id: image.id,
          url: image.url,
        })),
      };
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết thành phố:", error);
      return null; // Return null or handle as needed
    }
  };

  const buttons = ['Drink', 'Museum', 'Outdoor', 'Adventure', 'Beach', 'Hotel', 'Food', 'F&B', 'Movie'];

  const fetchEntertainments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/entertainments');
      return response.data.map(entertainment => ({
        id: entertainment.id,
        name: entertainment.name,
        reviewNumber: entertainment.reviewNumber,
        tag: entertainment.tag,
        rating: entertainment.rating,
        imageUrl: entertainment.imageUrl,
      }));
    } catch (error) {
      console.error('Error fetching entertainments:', error);
      return [];
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/images');
      return response.data.map(image => ({
        id: image.id,
        imageUrl: image.imageUrl,
      }));
    } catch (error) {
      console.error('Error fetching entertainments:', error);
      return [];
    }
  };


  const generateStars = (rating) => {
    const fullStar = new URL('@/assets/star_full.svg', import.meta.url).href;
    const halfStar = new URL('@/assets/star_half.svg', import.meta.url).href;
    const emptyStar = new URL('@/assets/star_none.svg', import.meta.url).href;

    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(fullStar);
      } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  };

  return {
    fetchImages,
    heartFull,
    heartEmpty,
    buttons,
    fetchEntertainments,
    generateStars,
    fetchCityDetails
  };
}