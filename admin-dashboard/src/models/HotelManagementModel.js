import axios from "axios";

export async function getHotels() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/"
    );

    return response.data
      .filter((destination) => destination.hotel_id !== null)
      .map((destination) => ({
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
        hotel_id: destination.hotel_id,
        hotel: {
          property_amenities: destination.hotel.property_amenities,
          room_features: destination.hotel.room_features,
          room_types: destination.hotel.room_types,
          hotel_class: destination.hotel.hotel_class,
          hotel_styles: destination.hotel.hotel_styles,
          Languages: destination.hotel.Languages,
          phone: destination.hotel.phone,
          email: destination.hotel.email,
          website: destination.hotel.website,
          id: destination.hotel.id,
        },
      }));
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getHotelById(destinationID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/?id=${destinationID}`
    );

    const destination = response.data;
    return {
      id: destination[0].id,
      name: destination[0].name,
      price_bottom: destination[0].price_bottom,
      price_top: destination[0].price_top,
      age: destination[0].age,
      opentime: destination[0].opentime,
      duration: destination[0].duration,
      description: destination[0].description,
      date_create: destination[0].date_create,
      address: {
        city_id: destination[0].address.city_id,
        district: destination[0].address.district,
        ward: destination[0].address.ward,
        street: destination[0].address.street,
      },
      hotel: {
        property_amenities: destination[0].hotel.property_amenities,
        room_features: destination[0].hotel.room_features,
        room_types: destination[0].hotel.room_types,
        hotel_class: destination[0].hotel.hotel_class,
        hotel_styles: destination[0].hotel.hotel_styles,
        Languages: destination[0].hotel.Languages,
        phone: destination[0].hotel.phone,
        email: destination[0].hotel.email,
        website: destination[0].hotel.website,
        id: destination[0].hotel.id,
      },
    };
  } catch (error) {
    console.error("Error fetching destination:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function updateHotel(destination) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/hotel/${destination.hotel_id}`, // sử dụng user.id làm userId
      {
        property_amenities: destination.hotel.property_amenities,
        room_features: destination.hotel.room_features,
        room_types: destination.hotel.room_types,
        hotel_class: destination.hotel.hotel_class,
        hotel_styles: destination.hotel.hotel_styles,
        Languages: destination.hotel.Languages,
        phone: destination.hotel.phone,
        email: destination.hotel.email,
        website: destination.hotel.website,
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

export async function addHotel(destination) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/hotel/hotel/${destination.id}`, // sử dụng user.id làm userId
      {
        property_amenities: destination.hotel.property_amenities,
        room_features: destination.hotel.room_features,
        room_types: destination.hotel.room_types,
        hotel_class: destination.hotel.hotel_class,
        hotel_styles: destination.hotel.hotel_styles,
        Languages: destination.hotel.Languages,
        phone: destination.hotel.phone,
        email: destination.hotel.email,
        website: destination.hotel.website,
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
