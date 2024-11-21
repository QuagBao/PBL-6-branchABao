import axios from "axios";

export async function fetchTours() {
  try {

    // Gửi yêu cầu để lấy danh sách người dùng
    const response = await axios.get(
      "https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/tour/?is_popular=true"
    );

    return response.data.map((tour) => ({
      id: tour.id,
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      user_id: tour.user_id,
      city_id: tour.city_id,
      destinations: tour.destinations,
      rating: tour.rating,
      numOfReviews: tour.numOfReviews,
    }));
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return []; // Hoặc bạn có thể xử lý khác tùy ý
  }
}