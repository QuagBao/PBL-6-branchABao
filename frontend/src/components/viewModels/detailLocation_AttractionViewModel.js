import { ref, computed, onMounted } from 'vue';
import { RatingModel, mockComments, ImageModel, getDestinationById } from '../models/detailLocation_AttractionModel.js';

export default function(destinationID) {
  class DescriptionModel {
    constructor(fullDescription) {
        this.fullDescription = fullDescription;
    }

    getTruncatedDescription() {
        return this.fullDescription.split(' ').slice(0, 40).join(' ') + '...';
    }

    getDescription(isReadMore) {
        return isReadMore.value ? this.fullDescription : this.getTruncatedDescription();
    }
}

  // Khởi tạo dữ liệu đánh giá
  const ratingModel = new RatingModel(3422, 2122, 5622, 2100, 300);
  const isLoading = ref(false);
  const isDropdownVisible = ref(false);
  const isMenuVisible = ref(false);
  const isReadMore = ref(false);
  const destination = ref(null);
  const descriptionModel = ref(null);
  const truncatedDescription = ref('');
  const images = ref([]);


  const loadDestination = async () => {
    try {
      destination.value = await getDestinationById(destinationID);
      console.log(destination.value);
      if (destination.value && destination.value.description) {
        // Khởi tạo DescriptionModel với mô tả đầy đủ lấy từ API
        descriptionModel.value = new DescriptionModel(destination.value.description);
        truncatedDescription.value = descriptionModel.value.getTruncatedDescription();
      
      }
      images.value = destination.value.images;
      isLoading.value = true;
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu thành phố:", error);
    }
  };
  loadDestination();

  const toggleReadMore = () => {
    isReadMore.value = !isReadMore.value;
    truncatedDescription.value = descriptionModel.value.getDescription(isReadMore);
  };

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
    truncatedDescription,
    toggleReadMore,
    isReadMore,
    destination,
    isLoading,
  };
}

