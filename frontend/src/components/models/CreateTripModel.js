import axios from 'axios';

export default function () {
  
  const heartFull = new URL('@/assets/svg/heart-full.svg', import.meta.url).href;
  const heartEmpty = new URL('@/assets/svg/heart-none.svg', import.meta.url).href;
  
  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/"
      );
      return response.data.map(city => ({
        id: city.id,
        name: city.name,
        location: city.location,
        reviewNumber: city.reviewNumber,
        rating: city.rating,
        images: city.images.map(image => image.url),
      }));
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu thành phố:", error);
      return []; // Return an empty array or handle as needed
    }
  }
  const fetchTags = async () => {
    try {
      const response = await axios.get(
        "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/tag/"
      );
      return response.data.map(tag => ({
        id: tag.id,
        name: tag.name,
      }));
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu thành phố:", error);
      return []; // Return an empty array or handle as needed
    }
  }
  const fetchEntertainments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/entertainments');
      return response.data.map(entertainment => ({
        id: entertainment.id,
        name: entertainment.name,
        reviewNumber: entertainment.reviewNumber,
        tag: entertainment.tag,
        rating: entertainment.rating,
        description: entertainment.description,
        imageUrl: entertainment.imageUrl,
        destinationType: entertainment.destinationType,
      }));
    } catch (error) {
      console.error('Error fetching entertainments:', error);
      return [];
    }
  };
  const generateStars = (rating) => {
    const fullCircle = new URL('@/assets/svg/star_full.svg', import.meta.url).href;
    const halfCircle = new URL('@/assets/svg/star_half.svg', import.meta.url).href;
    const emptyCircle = new URL('@/assets/svg/star_none.svg', import.meta.url).href;

    let circles = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
        circles.push(fullCircle);
        } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
            circles.push(halfCircle);
        } else {
            circles.push(emptyCircle);
        }
    }
    return circles;
  };
  return {
    heartFull,
    heartEmpty,
    fetchCities,
    fetchEntertainments,
    fetchTags,
    generateStars
  };
}

export async function addHotel(hotel) {
  try {

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/${hotel.id}`, // sử dụng user.id làm userId
      {
        property_amenities: hotel.hotel.property_amenities,
        room_features: hotel.hotel.room_features,
        room_types: hotel.hotel.room_types,
        hotel_class: hotel.hotel.hotel_class,
        hotel_styles: hotel.hotel.hotel_styles,
        Languages: hotel.hotel.Languages,
        phone: hotel.hotel.phone,
        email: hotel.hotel.email,
        website: hotel.hotel.website,
      }
    );

    if (response.status === 200) {
      console.log("Hotel add successfully");
      return { success: true, message: "Hotel added successfully" };
    }
  } catch (error) {
    console.error("Error add hotel:", error);
    return { success: false, message: "Failed to added hotel" };
  }
}