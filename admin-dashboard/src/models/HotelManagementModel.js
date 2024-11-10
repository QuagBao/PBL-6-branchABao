import axios from "axios";

export async function getHotels() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/"
    );

    return response.data.map((hotel) => ({
      id: hotel.id,
      name: hotel.name,
      price_bottom: hotel.price_bottom,
      price_top: hotel.price_top,
      age: hotel.age,
      opentime: hotel.opentime,
      duration: hotel.duration,
      description: hotel.description,
      date_create: hotel.date_create,
      address: {
        city_id: hotel.address.city_id,
        district: hotel.address.district,
        ward: hotel.address.ward,
        street: hotel.address.street,
      },
      hotel_id: hotel.hotel_id,
      hotel: {
        property_amenities: hotel.hotel.property_amenities,
        room_features: hotel.hotel.room_features,
        room_types: hotel.hotel.room_types,
        hotel_class: hotel.hotel.hotel_class,
        hotel_styles: hotel.hotel.hotel_styles,
        Languages: hotel.hotel.Languages,
        phone: hotel.hotel.phone,
        email: hotel.hotel.email,
        website: hotel.hotel.website,
        id: hotel.hotel.id,
      },
    }));
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getHotelById(hotelID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
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
      address: {
        city_id: hotel.address.city_id,
        district: hotel.address.district,
        ward: hotel.address.ward,
        street: hotel.address.street,
      },
      hotel_id: hotel.hotel_id,
      hotel: {
        property_amenities: hotel.hotel.property_amenities,
        room_features: hotel.hotel.room_features,
        room_types: hotel.hotel.room_types,
        hotel_class: hotel.hotel.hotel_class,
        hotel_styles: hotel.hotel.hotel_styles,
        Languages: hotel.hotel.Languages,
        phone: hotel.hotel.phone,
        email: hotel.hotel.email,
        website: hotel.hotel.website,
        id: hotel.hotel.id,
      },
    };
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function updateHotel(hotel) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

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

export async function deleteDestination(hotelID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/hotel/${hotelID}`
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

export async function getDestinationName(destinationID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destinationID}`
    );

    const destination = response.data;
    return {
      id: destination.id,
      name: destination.name,
    };
  } catch (error) {
    console.error("Error fetching destination:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}
