import { ref, computed, onMounted, watch } from 'vue';
import SignInModel from '../models/SignInModel';
import { getDestinationById } from '../models/destinationModel.js';
import RatingViewModel from './generate_ratingViewModel.js';
import { addReview } from '../models/ReviewModel';

export default function(destinationID) {
  // Menu visibility toggle
  const user = ref(null);
  const token = sessionStorage.getItem('access_token');
  const loadUser = async () => {
    const signInModel = new SignInModel("", "");
    try{
      const userResult = await signInModel.fetchCurrentUser(token);
      if(userResult.success){
        user.value = userResult.user;
      } else {
        console.error('Cannot get user:', error);
      }
    } catch (error) {
      console.error('An error occurred during authentication:', error);
      return { success: false, message: error.message || 'An error occurred' };
    }
    
  }

  const destination = ref();
  const loadDestination = async () => {
    try {
      destination.value = await getDestinationById(destinationID);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu destination:", error);
    }
  };

  loadDestination();
  loadUser();

  // Star rating assets
  const { fullStar, halfStar, emptyStar } = RatingViewModel();

  // Rating states
  const currentRating = ref(0);
  const hoveredRating = ref(0);

  // Status labels for ratings
  const statuses = ['Terrible', 'Bad', 'Medium', 'Very Good', 'Excellent'];

  // Computed property for rating status
  const ratingStatus = computed(() => {
    const rating = hoveredRating.value || currentRating.value; // Prioritize hover value
    return rating > 0 && rating <= statuses.length ? statuses[rating - 1] : '';
  });

  // Hover and leave rating logic
  const hoverRating = (index) => {
    hoveredRating.value = index; // Set hovered rating
  };

  const leaveRating = () => {
    hoveredRating.value = 0; // Reset hover state
  };

  // Set rating on click
  const setRating = (index) => {
    currentRating.value = index;
  };


  const photos = ref([]);
  const photoPreviews = ref([]);
  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      photos.value.push(file);

      // Generate preview URL for the uploaded file
      const reader = new FileReader();
      reader.onload = (e) => {
        photoPreviews.value.push(e.target.result); // Add the image preview URL
      };
      reader.readAsDataURL(file);
    });
  };

  const companions = [
    { value: 'Solo', label: 'Solo' },
    { value: 'Family', label: 'Family' },
    { value: 'Couple', label: 'Couple' },
    { value: 'Friends', label: 'Friends' },
    { value: 'Company', label: 'Company' },
    { value: 'Other', label: 'Other' },
  ];
  
  // Selected companion
  const selectedCompanion = ref('');
  
  // Function to handle selection
  const selectCompanion = (value) => {
    selectedCompanion.value = value;
    console.log('Selected companion:', value);
  };

  const today = new Date();
  const formatToday = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

// Khởi tạo giá trị ban đầu
const rawSelectedDate = ref(today);
const visitDate = ref(formatToday(today));

  // Xử lý khi chọn ngày
  const onDateChange = (selectedDate) => {
    if (selectedDate) {
      const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Lưu giá trị dạng chuẩn (YYYY-MM-DD)
      visitDate.value = formatDate(selectedDate);

      console.log('Selected Date (YYYY-MM-DD):', visitDate.value); // Log để kiểm tra
    }
  };
  const reviewText = ref('');
  const reviewTitle = ref('');
  const language = ref('');

  // Submit review
  const submitReview = async () => {
    console.log({
      userName: user.value.username,
      place: destination.value.name,
      language: language.value,
      title: reviewTitle.value,
      photos: photos.value,
      rating: currentRating.value,
      visitDate: visitDate.value,
      review: reviewText.value,
      companion: selectedCompanion.value,
    });
    try{
      const result = await addReview(reviewTitle.value,reviewText.value,currentRating.value,user.value.id,destination.value.id,language.value,selectedCompanion.value,visitDate.value, photos.value);
      if (result.success) {
        window.history.back();
      }
    } catch(error){
      console.log("error");
    }
  };

  return {
    destination,
    fullStar,
    halfStar,
    emptyStar,
    visitDate,
    rawSelectedDate,
    onDateChange,
    reviewText,
    currentRating,
    ratingStatus,
    hoverRating,
    leaveRating,
    setRating,
    hoveredRating,
    reviewTitle,
    photos,
    language,
    handlePhotoUpload,
    submitReview,
    photoPreviews,
    companions,
    selectedCompanion,
    selectCompanion,
  };
}
