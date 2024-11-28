import { deleteReview as deleteReviewAPI } from '../models/ReviewModel';
export default function(){
    const deleteReview = async (reviewID) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this review?"
        );
        if (confirmDelete) {
          try {
            const response = await deleteReviewAPI(reviewID);
            if (response.success) {
              toast.success(response.message);
              // Trigger a data refresh instead of a page reload if possible
            } else {
              toast.error("Failed to delete review:", response.message);
            }
          } catch (error) {
            toast.error("Error deleting review:", error);
          }
        }
    };
    return {
        deleteReview,
    }
}