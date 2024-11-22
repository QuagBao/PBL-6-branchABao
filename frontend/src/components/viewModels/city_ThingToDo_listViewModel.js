import { ref, computed, onMounted } from 'vue';
import { fetchDestinationsByCity} from '../models/destinationModel';
import { fetchCityDetails } from '../models/CityModel';
import generate_ratingViewModel from './generate_ratingViewModel'; 

export default function (cityId) {
  const { generateStars } = generate_ratingViewModel();

  const isMenuVisible = ref(false);
  

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  


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

  const attractions = ref([]);
  const city = ref(null);
  
  const liked = ref({});

  onMounted(async () => {
    attractions.value = await fetchDestinationsByCity(cityId);
    
  });

  onMounted(async () =>{
    city.value = await fetchCityDetails(cityId);
  })

  const toggleLikeStatus = (id) => {
    liked.value[id] = !liked.value[id];
    console.log(`Item ID: ${id}, Liked: ${liked.value[id]}`);
  };
  const truncatedDescription = (description) => {
    if (description.length > 200) {
      return description.slice(0, 200) + '...';
    }
    return description;
  };

  const heartFull = new URL('@/assets/svg/heart-full.svg', import.meta.url).href;
  const heartEmpty = new URL('@/assets/svg/heart-none.svg', import.meta.url).href;

  return {
    isMenuVisible,
    toggleMenu,
    
    buttons,
    selectedIndices,
    selectButton,
    
    attractions,
    city,
    generateStars,
    liked,
    toggleLikeStatus,
    heartFull,
    heartEmpty,
    truncatedDescription,
  };
}