import { ref, computed, onMounted, watch } from 'vue';
import { fetchDestinationsByCity, fetchHotelsByCity, fetchRestaurantsByCity } from '../models/destinationModel';
import { fetchCityDetails } from '../models/CityModel';

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
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      isRestaurantsLoading.value = false;
    }
  };

  // Trigger data loading on mount
  onMounted(() => {
    fetchCityDetailsData();
    fetchDestinationsData();
    fetchHotelsData();
    fetchRestaurantsData();
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

  const buttons = ref(['Drink', 'Museum', 'Outdoor', 'Adventure', 'Beach', 'Hotel', 'Food', 'F&B', 'Movie']);
  const selectedIndices = ref([]);

  const selectButton = (index) => {
    const currentIndex = selectedIndices.value.indexOf(index);
    if (currentIndex === -1) {
      selectedIndices.value.push(index);
    } else {
      selectedIndices.value.splice(currentIndex, 1);
    }
  };


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
  };
}
