import axios from "axios";

export async function getRestaurants() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/"
    );

    return response.data.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
      price_bottom: restaurant.price_bottom,
      price_top: restaurant.price_top,
      age: restaurant.age,
      opentime: restaurant.opentime,
      duration: restaurant.duration,
      description: restaurant.description,
      date_create: restaurant.date_create,
      address: {
        city_id: restaurant.address.city_id,
        district: restaurant.address.district,
        ward: restaurant.address.ward,
        street: restaurant.address.street,
      },
      restaurant_id: restaurant.restaurant_id,
      restaurant: {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
        id: restaurant.restaurant.id,
      },
    }));
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getRestaurantById(restaurantID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
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
      address: {
        city_id: restaurant.address.city_id,
        district: restaurant.address.district,
        ward: restaurant.address.ward,
        street: restaurant.address.street,
      },
      restaurant_id: restaurant.restaurant_id,
      restaurant: {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
        id: restaurant.restaurant.id,
      },
    };
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function updateRestaurant(restaurant) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurant.restaurant_id}`, // sử dụng user.id làm userId
      {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/restaurant/${restaurant.id}`, // sử dụng user.id làm userId
      {
        cuisine: restaurant.restaurant.cuisine,
        special_diet: restaurant.restaurant.special_diet,
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

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
