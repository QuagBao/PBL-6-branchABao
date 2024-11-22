import { ref, computed, onMounted } from 'vue';
import { getHotelById } from '../models/destinationModel.js';
import { getReviewByDestinationId } from '../models/ReviewModel.js';
import { getUserById } from '../models/UserModel.js';


export default function(hotelID) {

  // Khởi tạo dữ liệu đánh giá
  const isLoading = ref(false);
  const isDropdownVisible = ref(false);
  const isMenuVisible = ref(false);
  const hotel = ref(null);
  const images = ref([]);
  const commentList = ref([]);


  const loadHotel = async () => {
    try {
      hotel.value = await getHotelById(hotelID);
      console.log(hotel.value);
      images.value = hotel.value.images;
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu khách sạn:", error);
    }
  };
  
  const getAllcomments = async () => {
    if (!hotel.value || !hotel.value.id) {
      console.error("Không thể lấy nhận xét: destination chưa được tải.");
      return;
    }
  
    try {
      console.log(hotel.value.id);
      commentList.value = await getReviewByDestinationId(hotel.value.id);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy nhận xét:", error);
    }
  };
  
  const loadUsersForComments = async () => {
    if (commentList.value.length === 0) {
      console.warn("Danh sách nhận xét trống, không thể tải thông tin người dùng.");
      return;
    }
  
    const userSet = new Set(); // Dùng Set để tránh gọi lại API cho các user_id trùng nhau
    try {
      commentList.value.forEach(comment => {
        if (comment.user_id) {
          userSet.add(comment.user_id);
        }
      });
  
      const userPromises = Array.from(userSet).map(userID => getUserById(userID));
      const userResults = await Promise.all(userPromises);
  
      const userMap = new Map();
      userResults.forEach(user => {
        if (user && user.id) {
          userMap.set(user.id, user);
        }
      });
  
      commentList.value.forEach(comment => {
        const user = userMap.get(comment.user_id);
        if (user) {
          comment.user = user; // Thêm thông tin user vào mỗi comment
        }
      });
  
      console.log("Danh sách nhận xét với thông tin người dùng:", commentList.value);
    } catch (error) {
      console.error("Có lỗi xảy ra khi tải thông tin người dùng:", error);
    }
  };
  
  const initializePage = async () => {
    try {
      await loadHotel();      // Đợi loadRestaurant hoàn tất
      await getAllcomments();      // Sau đó gọi getAllcomments
      await loadUsersForComments(); // Cuối cùng là loadUsersForComments
  
      isLoading.value = true; // Chuyển trạng thái sang loaded khi hoàn thành
    } catch (error) {
      console.error("Có lỗi xảy ra khi tải trang:", error);
    }
  };
  
  initializePage();


  const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
    console.log(isDropdownVisible);
  };

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
    console.log(isMenuVisible);
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
    currentImage,
    nextImage,
    prevImage,
    commentList,
    images,
    isMenuVisible,
    toggleMenu,
    hotel,
    isLoading,
  };
}

