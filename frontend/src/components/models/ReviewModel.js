import axios from 'axios';

export async function getReviewByDestinationId(destinationID) {
    try {
      const response = await axios.get(
        `https://pbl6-travel-fastapi-azfpceg2czdybuh3.eastasia-01.azurewebsites.net/review/?destination_id=${destinationID}`
      );

      return response.data.map((review) => ({ 
        id: review.id,
        title: review.title,
        content: review.content,
        rating: review.rating,
        language: review.language,
        date_create: review.date_create,
        user_id: review.user_id,
        destination_id: review.destination_id,
        images: review.images,
      }));
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return []; // Hoặc bạn có thể xử lý khác tùy ý
    }
  }