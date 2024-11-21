import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
export default function () {
  
  const heartFull = new URL('@/assets/svg/heart-full.svg', import.meta.url).href;
  const heartEmpty = new URL('@/assets/svg/heart-none.svg', import.meta.url).href;
  
  

  const fetchCityDetails = async (cityId) => {
    try {
      const response = await fetch(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/${cityId}`);
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

  const fetchDestinations = async (cityId) => {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?city_id=${cityId}&is_popular=true&get_rating=true`);
      const filteredDestinations = response.data.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);

    // Chỉ map qua các destination đã lọc
      return filteredDestinations.map(destination => ({
        id: destination.id,
        name: destination.name,
        price_bottom: destination.price_bottom,
        price_top: destination.price_top,
        age: destination.age,
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        date_create: destination.date_create,
        address: {
          city_id: destination.address.city_id,
          district: destination.address.district,
          ward: destination.address.ward,
          street: destination.address.street,
        },
        images: destination.images,
        rating: destination.rating,
        numOfReviews: destination.numOfReviews,
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  };

  

// Hàm để lấy thông tin khách sạn từ API
const fetchHotels = async (cityId) => {
  try {
    // Gọi API để lấy dữ liệu khách sạn
    const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/?city_id=${cityId}&is_popular=true`);
    

    // In ra dữ liệu khách sạn để kiểm tra

    return response.data.map((destination) => ({
      id: destination.id,
      name: destination.name,
      price_bottom: destination.price_bottom,
      price_top: destination.price_top,
      age: destination.age,
      opentime: destination.opentime,
      duration: destination.duration,
      description: destination.description,
      date_create: destination.date_create,
      address: {
        city_id: destination.address.city_id,
        district: destination.address.district,
        ward: destination.address.ward,
        street: destination.address.street,
      },
      images: destination.images,
      hotel_id: destination.hotel_id,
      hotel: destination.hotel,
      restaurant_id: destination.restaurant_id,
      restaurant: destination.restaurant,
      rating: destination.rating,
      numOfReviews: destination.numOfReviews,
    }));
  } catch (error) {
    // In ra lỗi nếu có
    console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết khách sạn:", error);
    return null; // Trả về null hoặc xử lý theo cách khác nếu cần
  }
};

  const buttons = ['Drink', 'Museum', 'Outdoor', 'Adventure', 'Beach', 'Hotel', 'Food', 'F&B', 'Movie'];

  // Hàm để lấy thông tin khách sạn từ API
const fetchRestaurants = async (cityId) => {
  try {
    // Gọi API để lấy dữ liệu khách sạn
    const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/?city_id=${cityId}&is_popular=true`);
    

    // In ra dữ liệu khách sạn để kiểm tra

    return response.data.map((destination) => ({
      id: destination.id,
      name: destination.name,
      price_bottom: destination.price_bottom,
      price_top: destination.price_top,
      age: destination.age,
      opentime: destination.opentime,
      duration: destination.duration,
      description: destination.description,
      date_create: destination.date_create,
      address: {
        city_id: destination.address.city_id,
        district: destination.address.district,
        ward: destination.address.ward,
        street: destination.address.street,
      },
      images: destination.images,
      hotel_id: destination.hotel_id,
      hotel: destination.hotel,
      restaurant_id: destination.restaurant_id,
      restaurant: destination.restaurant,
      rating: destination.rating,
      numOfReviews: destination.numOfReviews,
    }));
  } catch (error) {
    // In ra lỗi nếu có
    console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết nhà hàng:", error);
    return null; // Trả về null hoặc xử lý theo cách khác nếu cần
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
    const fullStar = new URL('@/assets/svg/star_full.svg', import.meta.url).href;
    const halfStar = new URL('@/assets/svg/star_half.svg', import.meta.url).href;
    const emptyStar = new URL('@/assets/svg/star_none.svg', import.meta.url).href;

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
    generateStars,
    fetchCityDetails,
    fetchDestinations,
    fetchHotels,
    fetchRestaurants,
  };
}