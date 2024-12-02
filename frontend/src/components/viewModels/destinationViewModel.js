import { ref, computed, onMounted, watch } from 'vue';
import { fetchDestinationsByCity, fetchHotelsByCity, fetchRestaurantsByCity } from '../models/destinationModel';
import { fetchCityDetails } from '../models/CityModel';
import { getTags as fetchTagsAPI } from '../models/TagModel';

export default function (cityId) {
  const images = ref([]);
  const isMenuVisible = ref(false);
  const isReadMore = ref(false);
  const currentIndex = ref(0);
  const cityDetails = ref(null);
  const destinations = ref([]);
  const liked = ref({});
  const isHeartFilled = ref(false);
  const isLoading = ref(true);
  const hotels = ref([]);
  const restaurants = ref([]);

  const filteredDestinations = ref([]);
  const filteredHotels = ref([]);
  const filteredRestaurants = ref([]);

  const isDestinationsLoading = ref(false);
  const isHotelsLoading = ref(false);
  const isRestaurantsLoading = ref(false);

  // Fetch data functions
  const fetchCityDetailsData = async () => {
    try {
      const data = await fetchCityDetails(cityId);
      cityDetails.value = data || null;
      images.value = data?.images || [];
    } catch (error) {
      console.error('Error fetching city details:', error);
    }
  };

  const fetchDestinationsData = async () => {
    isDestinationsLoading.value = true;
    try {
      destinations.value = await fetchDestinationsByCity(cityId);
      filteredDestinations.value = destinations.value;
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      isDestinationsLoading.value = false;
    }
  };

  const fetchHotelsData = async () => {
    isHotelsLoading.value = true;
    try {
      hotels.value = await fetchHotelsByCity(cityId);
      filteredHotels.value = hotels.value;
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      isHotelsLoading.value = false;
    }
  };

  const fetchRestaurantsData = async () => {
    isRestaurantsLoading.value = true;
    try {
      restaurants.value = await fetchRestaurantsByCity(cityId);
      filteredRestaurants.value = restaurants.value;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      isRestaurantsLoading.value = false;
    }
  };

  const buttons = ref([]);
  const fetchTags = async () => {
    try {
      buttons.value = await fetchTagsAPI();
    } catch (error) {
      toast.error("Error fetching tags:", error);
    }
  };

  const selectedIndices = ref([]);

  const selectButton = (index) => {
    const currentIndex = selectedIndices.value.indexOf(index);
    if (currentIndex === -1) {
      selectedIndices.value.push(index);  // Thêm vào selectedIndices nếu chưa có
    } else {
      selectedIndices.value.splice(currentIndex, 1);  // Xóa khỏi selectedIndices nếu đã có
    }
  
    // Sau khi thay đổi selectedIndices, Vue sẽ tự động cập nhật filteredData
    console.log('Selected Indices:', selectedIndices.value);  // Để kiểm tra
    filterData();
  };


  // Return filtered data for all three categories
  const filterData = () => {
    const filterItems = (items) => {
      if (!items) {
        return []; // Nếu items là null hoặc undefined, trả về mảng rỗng
      }
  
      if (selectedIndices.value.length === 0) {
        return items; // Nếu không có tags nào được chọn, trả về toàn bộ danh sách
      }
  
      return items.filter((item) => {
        // Kiểm tra nếu ít nhất một tag trong item có id nằm trong selectedIndices
        return item.tags && item.tags.some((tag) => selectedIndices.value.includes(tag.id));
      });
    };
  
    // Lọc dữ liệu cho từng danh sách, đảm bảo mảng không phải null
    filteredDestinations.value = filterItems(destinations.value);
    filteredHotels.value = filterItems(hotels.value);
    filteredRestaurants.value = filterItems(restaurants.value);
    console.log('Filtered Destinations:', filteredDestinations.value);
    console.log('Filtered Hotels:', filteredHotels.value);
    console.log('Filtered Restaurants:', filteredRestaurants.value);
    
  };
  

  // Trigger data loading on mount
  onMounted(() => {
    fetchCityDetailsData();
    fetchDestinationsData();
    fetchHotelsData();
    fetchRestaurantsData();
    fetchTags();
    filterData();
  });

  // Watchers for updating UI immediately when data is loaded
  watch(destinations, (newDestinations) => {
    console.log('Destinations updated:', newDestinations);
  });

  watch(hotels, (newHotels) => {
    console.log('Hotels updated:', newHotels);
  });

  watch(restaurants, (newRestaurants) => {
    console.log('Restaurants updated:', newRestaurants);
  });

  watch(cityDetails, (newCityDetails) => {
    console.log('City details updated:', newCityDetails);
  });

  watch(selectedIndices, () => {
    filterData();
  });

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };

  const toggleHeart = () => {
    isHeartFilled.value = !isHeartFilled.value;
  };

  const toggleReadMore = () => {
    isReadMore.value = !isReadMore.value;
  };

  const getTruncatedDescription = computed(() => {
    return cityDetails.value
      ? cityDetails.value.description.split(' ').slice(0, 40).join(' ') + '...'
      : '';
  });

  const fullDescription = computed(() => cityDetails.value?.description || '');

  const toggleLikeStatus = (id) => {
    liked.value[id] = !liked.value[id];
    console.log(`Item ID: ${id}, Liked: ${liked.value[id]}`);
  };

  const currentImage = computed(() => {
    if (!images.value.length || currentIndex.value < 0 || currentIndex.value >= images.value.length) {
      return null;
    }
    return images.value[currentIndex.value];
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

  return {
    isMenuVisible,
    toggleMenu,
    currentImage,
    nextImage,
    prevImage,
    isHeartFilled,
    toggleHeart,
    getTruncatedDescription,
    toggleReadMore,
    isReadMore,
    fullDescription,
    buttons,
    selectedIndices,
    selectButton,
    images,
    liked,
    toggleLikeStatus,
    cityDetails,
    isLoading,
    destinations,
    hotels,
    restaurants,
    isDestinationsLoading,
    isHotelsLoading,
    isRestaurantsLoading,
    filteredDestinations,
    filteredHotels,
    filteredRestaurants,
  };
}
