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

  const fetchDestinations = async (cityId) => {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?city_id=${cityId}&sort_by_reviews=false&get_rating=true`);
      return response.data.map(destination => ({
        id: destination.id,
        name: destination.name,
        rating: destination.rating,
        numOfReviews: destination.numOfReviews,
        images: destination.images?.map(image => image.url) || [], // Lấy danh sách URL của các hình ảnh
        address: {
          district: destination.address?.district || '',
          street: destination.address?.street || '',
          ward: destination.address?.ward || '',
        },
        priceRange: {
          bottom: destination.price_bottom,
          top: destination.price_top,
        },
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        hotel_id : destination.hotel_id,
        restaurant_id : destination.restaurant_id,
      }));
    } catch (error) {
      console.error('Error fetching destinations:', error);
      return [];
    }
  };

  

// Hàm để lấy thông tin khách sạn từ API
const fetchHotels = async () => {
  try {
    // Gọi API để lấy dữ liệu khách sạn
    const response = await fetch(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/hotels/`);
    
    // Kiểm tra xem phản hồi có thành công không
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Chuyển đổi phản hồi thành định dạng JSON
    const hotelData = await response.json();

    // In ra dữ liệu khách sạn để kiểm tra
    

    // Chuyển đổi dữ liệu thành định dạng có thể sử dụng trong Vue
    return {
      id: hotelData.id,
      name: hotelData.name,
      address: hotelData.address,
      price: hotelData.price,
      phone: hotelData.phone,
      email: hotelData.email,
      website: hotelData.website,
      features: hotelData.features || [], // Nếu không có features, sử dụng mảng rỗng
      amenities: hotelData.amenities || [], // Nếu không có amenities, sử dụng mảng rỗng
      description: hotelData.description,
      rating: hotelData.rating,
      numOfReviews: hotelData.numOfReviews,
      imgURL: hotelData.imgURL || [] // Nếu không có imgURL, sử dụng mảng rỗng
    };
  } catch (error) {
    // In ra lỗi nếu có
    console.error("Có lỗi xảy ra khi lấy dữ liệu chi tiết khách sạn:", error);
    return null; // Trả về null hoặc xử lý theo cách khác nếu cần
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
    fetchCityDetails,
    fetchDestinations,
    fetchHotels
  };
}