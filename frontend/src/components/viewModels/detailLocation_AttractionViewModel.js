import { ref, computed } from 'vue';

import { RatingModel, mockComments, ImageModel, descriptionModel } from '../models/detailLocation_AttractionModel.js';

// Khởi tạo dữ liệu đánh giá
const ratingModel = new RatingModel(3422, 2122, 5622, 2100, 300);

const isDropdownVisible= ref(false)
const isMenuVisible = ref(false)
const isReadMore = ref(false);

const truncatedDescription = ref(descriptionModel.getTruncatedDescription());


  const toggleReadMore = () => {
    isReadMore.value = !isReadMore.value;
    truncatedDescription.value = descriptionModel.getDescription(isReadMore);
  };

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
  console.log(isDropdownVisible);
}

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
  console.log(isMenuVisible);
}

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
  const fullCircle = new URL('@/assets/svg/star_full.svg', import.meta.url).href;
  const halfCircle = new URL('@/assets/svg/star_half.svg', import.meta.url).href;
  const emptyCircle = new URL('@/assets/svg/star_none.svg', import.meta.url).href;

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
const images = ref([]);
const images_1 = ref([]);
const fetchImages_1 = async () => {
  const rawImages = await ImageModel.fetchImages();
  // Chuyển đổi các đối tượng ImageModel thành một mảng các URL đơn giản
  images_1.value = rawImages.map(image => image.imageUrl);
  console.log("List Images: ", images_1.value);
};

const fetchImages = async () => {
  images.value = await ImageModel.fetchImages();
  console.log( "Images: " ,images.value);
};

  const getAllcomments = async () => {
    console.log("Comment: ",commentList.value);
  };

  const currentIndex = ref(0);

  const currentImage = computed(() => {
    // Kiểm tra xem images có rỗng hay currentIndex nằm ngoài giới hạn không
    if (!images.value.length || currentIndex.value < 0 || currentIndex.value >= images.value.length) {
      return null; // Hoặc một giá trị mặc định, ví dụ: '/cities/default.jpg'
    }
    console.log("Current image: ", images.value[currentIndex.value].imageUrl);  
    return images.value[currentIndex.value].imageUrl;
  });

  const nextImage = () => {
    if (images.value.length) {  // Kiểm tra images không rỗng
      currentIndex.value = (currentIndex.value + 1) % images.value.length;
    }
  };
  
  const prevImage = () => {
    if (images.value.length) { // Kiểm tra images không rỗng
      currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
    }
  };

fetchImages();
fetchImages_1();
getAllcomments();
export {
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
  images_1,
  isMenuVisible,
  toggleMenu,
  truncatedDescription,
  toggleReadMore,
  isReadMore,
};
