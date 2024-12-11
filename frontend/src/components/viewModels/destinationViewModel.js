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

  const buttons = ref([]);
  const selectedIndices = ref([]);

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

  const fetchTags = async () => {
    try {
      buttons.value = await fetchTagsAPI();
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchDestinationsData = async () => {
    isDestinationsLoading.value = true;
    try {
      let place;
      // Nếu đã có dữ liệu, chỉ lọc lại; nếu chưa, gọi API
      if (destinations.value.length || hotels.value.length || restaurants.value.length) {
        place = [...destinations.value, ...hotels.value, ...restaurants.value];
      } else {
        place = await fetchDestinationsByCity(cityId);
      }

      // Lọc dữ liệu theo tags
      const filteredPlace = filterItems(place);

      // Phân loại dữ liệu
      destinations.value = place.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);
      hotels.value = place.filter(destination => destination.hotel_id !== null);
      restaurants.value = place.filter(destination => destination.restaurant_id !== null);

      filteredDestinations.value = filteredPlace.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);
      filteredHotels.value = filteredPlace.filter(destination => destination.hotel_id !== null);
      filteredRestaurants.value = filteredPlace.filter(destination => destination.restaurant_id !== null);
      
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      isDestinationsLoading.value = false;
    }
  };

  const filterItems = (items) => {
    // Nếu items không tồn tại hoặc không phải là mảng, trả về mảng rỗng
    if (!Array.isArray(items)) return [];
    
    // Nếu không có tag nào được chọn, trả về toàn bộ danh sách
    if (!selectedIndices.value.length) return [...items];
  
    // Lọc các mục có ít nhất một tag trùng với tag đã chọn
    return items.filter(item => 
      Array.isArray(item.tags) && item.tags.some(tag => selectedIndices.value.includes(tag.id))
    );
  };

  const selectButton = async (index) => {
    const currentIndex = selectedIndices.value.indexOf(index);
    if (currentIndex === -1) {
      selectedIndices.value.push(index);
    } else {
      selectedIndices.value.splice(currentIndex, 1);
    }

    await fetchDestinationsData();
  };

  const fetchAllData = async () => {
    try {
      await fetchCityDetailsData();
      await fetchDestinationsData();
      await fetchTags();
    } catch (error) {
      console.error("Error fetching data in sequence:", error);
    }
  };

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
    fetchCityDetailsData,
    fetchTags,
    fetchDestinationsData,
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
    fetchAllData,
  };
}
