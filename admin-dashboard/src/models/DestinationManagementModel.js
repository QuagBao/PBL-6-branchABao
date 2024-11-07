import axios from "axios";

export async function getDestinations() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/"
    );

    return response.data.map((destination) => ({
      id: destination.id,
      name: destination.name,
      description: destination.description,
      address: destination.address,
    }));
  } catch (error) {
    console.error("Error fetching destination:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getDestinationById(destinationID) {
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
    };
  } catch (error) {
    console.error("Error fetching destination:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function updateDestination(destination) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destination.id}`, // sử dụng user.id làm userId
      {
        name: destination.name,
        price_bottom: destination.price_bottom,
        price_top: destination.price_top,
        age: destination.age,
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        date_create: destination.date_create,
        city_id: destination.address.city_id,
        district: destination.address.district,
        ward: destination.address.ward,
        street: destination.address.street,
      }
    );

    if (response.status === 200) {
      console.log("City updated successfully");
      return { success: true, message: "City updated successfully" };
    }
  } catch (error) {
    console.error("Error updating city:", error);
    return { success: false, message: "Failed to update city" };
  }
}

export async function addDestination(destination) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/`, // sử dụng user.id làm userId
      {
        name: destination.name,
        price_bottom: destination.price_bottom,
        price_top: destination.price_top,
        age: destination.age,
        opentime: destination.opentime,
        duration: destination.duration,
        description: destination.description,
        date_create: destination.date_create,
        city_id: destination.address.city_id,
        district: destination.address.district,
        ward: destination.address.ward,
        street: destination.address.street,
      }
    );

    if (response.status === 200) {
      console.log("Destination add successfully");
      return { success: true, message: "Destination added successfully" };
    }
  } catch (error) {
    console.error("Error add destination:", error);
    return { success: false, message: "Failed to added destination" };
  }
}

export async function deleteDestination(destinationID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

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
