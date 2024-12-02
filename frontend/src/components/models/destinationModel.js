import axios from 'axios';

  export async function fetchDestinationsByCity(cityId) {
    try {
      const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?city_id=${cityId}&is_popular=true&get_rating=true`);
      const filteredDestinations = response.data.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);

    // Chỉ map qua các destination đã lọc
      return response.data.map(destination => ({
        id: destination.id,
        name: destination.name,
        user_id: destination.user_id,
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
        hotel_id: destination.hotel_id,
        hotel: destination.hotel,
        restaurant_id: destination.restaurant_id,
        restaurant: destination.restaurant,
        tags: destination.tags,
        images: destination.images,
        rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
        user_id: destination.user_id,
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
        tags: destination.tags,
        rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
      user_id: destination.user_id,
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
      tags: destination.tags,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
      user_id: destination.user_id,
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
      tags: destination.tags,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
      user_id: destination.user_id,
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
      tags: destination.tags,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
      user_id: destination.user_id,
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
      tags: destination.tags,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
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
      user_id: destination.user_id,
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
      tags: destination.tags,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
      numOfReviews: destination.numOfReviews,
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
      user_id: hotel.user_id,
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
      tags: hotel.tags,
      rating: hotel.rating ? parseFloat(hotel.rating.toFixed(1)) : null,
      numOfReviews: hotel.numOfReviews,
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
      user_id: restaurant.user_id,
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
      tags: restaurant.tags,
      rating: restaurant.rating ? parseFloat(restaurant.rating.toFixed(1)) : null,
      numOfReviews: restaurant.numOfReviews,
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function fetchDestinations() {
  try {
    const response = await axios.get(`https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/`);

    return response.data.map(destination => ({
      id: destination.id,
      name: destination.name,
      user_id: destination.user_id,
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
      hotel_id: destination.hotel_id,
      hotel: destination.hotel,
      restaurant_id: destination.restaurant_id,
      restaurant: destination.restaurant,
      tags: destination.tags,
      images: destination.images,
      rating: destination.rating ? parseFloat(destination.rating.toFixed(1)) : null,
      numOfReviews: destination.numOfReviews,
    }));
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return [];
  }
};

export async function updateDestination(
  destination,
  new_images,
  image_ids_to_remove
) {
  try {

    // Tạo URL với các query parameters
    const url = new URL(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destination.id}`
    );
    url.searchParams.append("name", destination.name);
    url.searchParams.append("user_id", destination.user_id);
    url.searchParams.append("price_bottom", destination.price_bottom);
    url.searchParams.append("price_top", destination.price_top);
    url.searchParams.append("age", destination.age);
    url.searchParams.append("opentime", destination.opentime);
    url.searchParams.append("duration", destination.duration);
    url.searchParams.append("description", destination.description);
    url.searchParams.append("date_create", destination.date_create);
    url.searchParams.append("city_id", destination.address.city_id);
    url.searchParams.append("district", destination.address.district);
    url.searchParams.append("ward", destination.address.ward);
    url.searchParams.append("street", destination.address.street);

    let formData = null;
    if (
      (new_images && new_images.length > 0) ||
      (image_ids_to_remove && image_ids_to_remove.length > 0)
    ) {
      formData = new FormData();

      // Thêm new_images nếu có dữ liệu
      if (new_images && new_images.length > 0) {
        new_images.forEach((file) => {
          formData.append("new_images", file);
        });
      }

      // Thêm image_ids_to_remove nếu có dữ liệu
      if (image_ids_to_remove && image_ids_to_remove.length > 0) {
        image_ids_to_remove.forEach((id) => {
          formData.append("image_ids_to_remove", id);
        });
      }
    }

    // Gửi PUT request với dữ liệu từ FormData
    const response = await axios.put(url.toString(), formData || undefined, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Destination updated successfully");
      return { success: true, message: "Destination updated successfully" };
    }
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    return { success: false, message: "Failed to update destination" };
  }
}

export async function addDestination(destination, images) {
  try {

    const url = new URL(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/`
    );
    url.searchParams.append("name", destination.name);
    url.searchParams.append("user_id", destination.user_id);
    url.searchParams.append("price_bottom", destination.price_bottom);
    url.searchParams.append("price_top", destination.price_top);
    url.searchParams.append("age", destination.age);
    url.searchParams.append("opentime", destination.opentime);
    url.searchParams.append("duration", destination.duration);
    url.searchParams.append("description", destination.description);
    url.searchParams.append("date_create", destination.date_create);
    url.searchParams.append("city_id", destination.address.city_id);
    url.searchParams.append("district", destination.address.district);
    url.searchParams.append("ward", destination.address.ward);
    url.searchParams.append("street", destination.address.street);

    let formData = null;
    if (images && images.length > 0) {
      formData = new FormData();
      images.forEach((file) => {
        formData.append("images", file);
      });
    }

    // Gửi PUT request với dữ liệu từ FormData
    const response = await axios.post(url.toString(), formData || undefined, {
      headers: {
        "Content-Type": "multipart/form-data", // Đảm bảo gửi đúng content type
      },
    });

    if (response.status === 200) {
      const { id, name } = response.data;
      console.log("Destination created successfully", { id, name });
      return { id, name, success: true };
    }
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    return { success: false, message: "Failed to update destination" };
  }
}

export async function deleteDestination(destinationID) {
  try {

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destinationID}`
    );

    if (response.status === 200) {
      console.log("City delete successfully");
      return { success: true, message: "Destination delete successfully" };
    }
  } catch (error) {
    console.error("Error deleting destination:", error);
    return { success: false, message: "Failed to deleting destination" };
  }
}

export async function updateHotel(hotel) {
  try {

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/${hotel.hotel_id}`, // sử dụng user.id làm userId
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
      console.log("Hotel updated successfully");
      return { success: true, message: "Hotel updated successfully" };
    }
  } catch (error) {
    console.error("Error updating hotel:", error);
    return { success: false, message: "Failed to update hotel" };
  }
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

export async function deleteHotel(hotelID) {
  try {

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/${hotelID}`
    );

    if (response.status === 200) {
      console.log("Hotel delete successfully");
      return { success: true, message: "Hotel delete successfully" };
    }
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return { success: false, message: "Failed to deleting hotel" };
  }
}

export async function updateRestaurant(restaurant) {
  try {

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurant.restaurant_id}`, // sử dụng user.id làm userId
      {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
        feature: restaurant.restaurant.feature,
        meal: restaurant.restaurant.meal,
      }
    );

    if (response.status === 200) {
      console.log("Restaurant updated successfully");
      return { success: true, message: "Restaurant updated successfully" };
    }
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return { success: false, message: "Failed to update restaurant" };
  }
}

export async function addRestaurant(restaurant) {
  try {

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurant.id}`, // sử dụng user.id làm userId
      {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
        feature: restaurant.restaurant.feature,
        meal: restaurant.restaurant.meal,
      }
    );

    if (response.status === 200) {
      console.log("Restaurant add successfully");
      return { success: true, message: "Restaurant added successfully" };
    }
  } catch (error) {
    console.error("Error add restaurant:", error);
    return { success: false, message: "Failed to added restaurant" };
  }
}

export async function deleteRestaurant(restaurantID) {
  try {

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurantID}`
    );

    if (response.status === 200) {
      console.log("Restaurant delete successfully");
      return { success: true, message: "Restaurant delete successfully" };
    }
  } catch (error) {
    console.error("Error deleting Restaurant:", error);
    return { success: false, message: "Failed to deleting Restaurant" };
  }
}