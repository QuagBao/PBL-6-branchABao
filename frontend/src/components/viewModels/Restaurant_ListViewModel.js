import { ref, onMounted, watch, nextTick } from 'vue';
import { fetchRestaurants } from '../models/destinationModel.js';


export default function () {

  const isMenuVisible = ref(false);
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  const searchQuery = ref('');

  const restaurants = ref([]);
  const liked = ref({});

  onMounted(async () => {
    restaurants.value = await fetchRestaurants();
  });

  const activeOption = ref(null);
  const toggleOptions = (option) => {
    activeOption.value = activeOption.value === option ? null : option;
  };

  

  return {
    isMenuVisible,
    toggleMenu,
    restaurants,
    liked,
    searchQuery,
    activeOption,
    toggleOptions,
  };
}
