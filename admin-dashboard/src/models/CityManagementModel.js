import axios from "axios";

export async function getCities() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/"
    );

    return response.data.map((city) => ({
      id: city.id,
      name: city.name,
      description: city.description,
    }));
  } catch (error) {
    console.error("Error fetching city:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function getCityById() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/"
    );

    const city = response.data;
    return {
      id: city.id,
      name: city.name,
      description: city.description,
    };
  } catch (error) {
    console.error("Error fetching city:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}

export async function updateCity(city) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/${city.id}`, // sử dụng user.id làm userId
      {
        name: city.name,
        description: city.description,
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

export async function addCity(city) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/`, // sử dụng user.id làm userId
      {
        name: city.name,
        description: city.description,
      }
    );

    if (response.status === 200) {
      console.log("City add successfully");
      return { success: true, message: "City added successfully" };
    }
  } catch (error) {
    console.error("Error add city:", error);
    return { success: false, message: "Failed to added city" };
  }
}

export async function deleteCity(cityID) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.delete(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/city/${cityID}`
    );

    if (response.status === 200) {
      console.log("City delete successfully");
      return { success: true, message: "City delete successfully" };
    }
  } catch (error) {
    console.error("Error deleting city:", error);
    return { success: false, message: "Failed to deleting city" };
  }
}
