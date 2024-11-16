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

export async function updateDestination(
  destination,
  new_images,
  image_ids_to_remove
) {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Tạo URL với các query parameters
    const url = new URL(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/${destination.id}`
    );
    url.searchParams.append("name", destination.name);
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
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const url = new URL(
      `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/destination/`
    );
    url.searchParams.append("name", destination.name);
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
      return { id, name };
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
