import axios from 'axios';


  export async function fetchDestinationsByCity(cityId) {
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

  export async function fetchAttractions(cityId) {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?is_popular=true&get_rating=true`);
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
export async function fetchHotelsByCity (cityId) {
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

// Hàm để lấy thông tin khách sạn từ API
export async function fetchHotels () {
  try {
    // Gọi API để lấy dữ liệu khách sạn
    const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/?is_popular=true`);
    

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

  export async function fetchRestaurantsByCity(cityId){
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

export async function fetchRestaurants(){
  try {
    // Gọi API để lấy dữ liệu khách sạn
    const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/?is_popular=true`);
    

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

export async function getDestinationById(destinationID) {
  try {
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destinationID}`
    );

    const destination = response.data;
    return {
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
    };
  } catch (error) {
    console.error("Error fetching destination:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getHotelById(hotelID) {
  try {
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/${hotelID}`
    );

    const hotel = response.data;
    return {
      id: hotel.id,
      name: hotel.name,
      price_bottom: hotel.price_bottom,
      price_top: hotel.price_top,
      age: hotel.age,
      opentime: hotel.opentime,
      duration: hotel.duration,
      description: hotel.description,
      date_create: hotel.date_create,
      address: hotel.address,
      images: hotel.images,
      hotel_id: hotel.hotel_id,
      hotel: hotel.hotel,
      restaurant_id: hotel.restaurant_id,
      restaurant: hotel.restaurant,
    };
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getRestaurantById(restaurantID) {
  try {
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurantID}`
    );

    const restaurant = response.data;
    return {
      id: restaurant.id,
      name: restaurant.name,
      price_bottom: restaurant.price_bottom,
      price_top: restaurant.price_top,
      age: restaurant.age,
      opentime: restaurant.opentime,
      duration: restaurant.duration,
      description: restaurant.description,
      date_create: restaurant.date_create,
      address: restaurant.address,
      images: restaurant.images,
      restaurant_id: restaurant.restaurant_id,
      restaurant: restaurant.restaurant,
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}