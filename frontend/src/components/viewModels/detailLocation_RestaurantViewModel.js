import { ref, computed, onMounted } from 'vue';
import { RatingModel, mockComments, ImageModel, getRestaurantById } from '../models/detailLocation_RestaurantModel.js';

export default function(restaurantID) {

  // Khởi tạo dữ liệu đánh giá
  const ratingModel = new RatingModel(3422, 2122, 5622, 2100, 300);
  const isLoading = ref(false);
  const isDropdownVisible = ref(false);
  const isMenuVisible = ref(false);
  const restaurant = ref(null);
  const images = ref([]);


  const loadRestaurant = async () => {
    try {
      restaurant.value = await getRestaurantById(restaurantID);
      console.log(restaurant.value);
      images.value = restaurant.value.images;
      isLoading.value = true;
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu nhà hàng:", error);
    }
  };
  loadRestaurant();


  const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
    console.log(isDropdownVisible);
  };

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
    console.log(isMenuVisible);
  };

  // Tạo danh sách sao
  const generateStars = (rating) => {
    const fullStar = new URL('@/assets/svg/star_full.svg', import.meta.url).href;
    const halfStar = new URL('@/assets/svg/star_half.svg', import.meta.url).href;
    const emptyStar = new URL('@/assets/svg/star_none.svg', import.meta.url).href;

    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(fullStar);
      } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
        stars.push(halfStar);
      } else {
        stars.push(emptyStar);
      }
    }
    return stars;
  };

  // Tạo danh sách hình tròn
  const generateCircle = (rating) => {
    const fullCircle = new URL('@/assets/svg/circle-full.svg', import.meta.url).href;
    const halfCircle = new URL('@/assets/svg/circle-half.svg', import.meta.url).href;
    const emptyCircle = new URL('@/assets/svg/circle-none.svg', import.meta.url).href;

    let circles = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        circles.push(fullCircle);
      } else if ((rating > i - 1 && rating - i + 1 >= 0.5) && rating < i) {
        circles.push(halfCircle);
      } else {
        circles.push(emptyCircle);
      }
    }
    return circles;
  };

  // Tính toán tỷ lệ phần trăm và rating tổng
  const stars = ref(generateStars(ratingModel.getAverageRating()));
  const circles = ref(generateCircle(ratingModel.getAverageRating()));

  // Tính tỷ lệ phần trăm cho mỗi loại đánh giá
  const ratings = {
    'Excellent': {
      count: ratingModel.excellent,
      percentage: ratingModel.getPercentage(ratingModel.excellent),
    },
    'Very Good': {
      count: ratingModel.veryGood,
      percentage: ratingModel.getPercentage(ratingModel.veryGood),
    },
    'Medium': {
      count: ratingModel.medium,
      percentage: ratingModel.getPercentage(ratingModel.medium),
    },
    'Bad': {
      count: ratingModel.bad,
      percentage: ratingModel.getPercentage(ratingModel.bad),
    },
    'Terrible': {
      count: ratingModel.terrible,
      percentage: ratingModel.getPercentage(ratingModel.terrible),
    },
  };

  const rating = ref(ratingModel.getAverageRating());
  const totalRating = ref(ratingModel.getTotal());

  // Danh sách bình luận
  const commentList = ref(mockComments);


  // Hàm lấy bình luận
  const getAllcomments = async () => {
    console.log("Comment: ", commentList.value);
  };

  // Chuyển đổi hình ảnh
  const currentIndex = ref(0);

  const currentImage = computed(() => {
    if (!images.value.length || currentIndex.value < 0 || currentIndex.value >= images.value.length) {
      return null;
    }
    console.log("Current image: ", images.value[currentIndex.value].url);
    return images.value[currentIndex.value].url;
  });

  const nextImage = () => {
    if (images.value.length) {
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    }
  };

  const prevImage = () => {
    if (images.value.length) {
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
    }
  };

  // Fetch dữ liệu ảnh và bình luận
  getAllcomments();

  return {
    isDropdownVisible,
    toggleDropdown,
    totalRating,
    stars,
    currentImage,
    nextImage,
    prevImage,
    circles,
    rating,
    ratings,
    commentList,
    generateStars,
    generateCircle,
    images,
    isMenuVisible,
    toggleMenu,
    restaurant,
    isLoading,
  };
}

