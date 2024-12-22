import axios from "axios";

export async function get_ratings_of_cities() {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/dashboard/admin/get_ratings_of_cities"
    );

    return response.data.map((city) => ({
      city_id: city.city_id,
      city_name: city.city_name,
      average_rating: city.average_rating,
      total_review_count: city.total_review_count,
    }));
  } catch (error) {
    console.error("Error fetching analize:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}