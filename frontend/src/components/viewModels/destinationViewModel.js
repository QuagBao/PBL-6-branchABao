import { ref, computed, onMounted, watch } from 'vue';
import DestinationModel from '../models/destinationModel';

export default function (cityId) {
  const model = DestinationModel();
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


  watch(images, (newImages) => {
    console.log('Images updated:', images);
  });

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };

  const toggleHeart = () => {
    isHeartFilled.value = !isHeartFilled.value;
  };
  const imageList = computed(() => {
    // Get the images array from cityDetails, or return an empty array if not present
      return cityDetails.value?.images?.map(image => image.url) || [];
  });
  const currentImage = computed(() => {
    const images = cityDetails.value?.images || [];
    if (!images.length || currentIndex.value < 0 || currentIndex.value >= images.length) {
      return null;
    }
    return images[currentIndex.value].url;
  });

  // Chuyển đến ảnh tiếp theo
  const nextImage = () => {
    const images = cityDetails.value?.images || [];
    if (images.length) {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    }
  };

  // Chuyển đến ảnh trước đó
  const prevImage = () => {
    const images = cityDetails.value?.images || [];
    if (images.length) {
      currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
    }
  };

  const toggleReadMore = () => {
    isReadMore.value = !isReadMore.value;
  };

  // Fetch city details and populate relevant data
  onMounted(async () => {
    isLoading.value = true; // Bắt đầu trạng thái tải

    cityDetails.value = await model.fetchCityDetails(cityId);
    
    isLoading.value = false; // Kết thúc trạng thái tải
});

onMounted(async () =>{
  destinations.value = await model.fetchDestinations(cityId);
})

onMounted(async () =>{
  restaurants.value = await model.fetchRestaurants(cityId);
})

onMounted(async () =>{
  hotels.value = await model.fetchHotels(cityId);
})

  // Function to get truncated description
  const getTruncatedDescription = computed(() => {
    return cityDetails.value
      ? cityDetails.value.description.split(' ').slice(0, 40).join(' ') + '...'
      : '';
  });

  const fullDescription = computed(() => cityDetails.value?.description || '');

  // Button selection logic
  const buttons = ref(model.buttons);
  const selectedIndices = ref([]);

  const selectButton = (index) => {
    const currentIndex = selectedIndices.value.indexOf(index);
    if (currentIndex === -1) {
      selectedIndices.value.push(index);
    } else {
      selectedIndices.value.splice(currentIndex, 1);
    }
  };

  const generateStars = (rating) => {
    return model.generateStars(rating);
  };

  const getImageUrl = (imageUrl) => {
    return new URL(imageUrl, import.meta.url).href;
  };

  const toggleLikeStatus = (id) => {
    liked.value[id] = !liked.value[id];
    console.log(`Item ID: ${id}, Liked: ${liked.value[id]}`);
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
    imageList,
    generateStars,
    getImageUrl,
    liked,
    toggleLikeStatus,
    heartFull: model.heartFull,
    heartEmpty: model.heartEmpty,
    cityDetails,
    isLoading,
    destinations,
    hotels,
    restaurants,
  };
}
