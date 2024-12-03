import { ref, onMounted, watch, nextTick } from 'vue';
import { fetchHotelsByCity } from '../models/destinationModel.js';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default function (cityId) {

  const isMenuVisible = ref(false);
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  const searchQuery = ref('');

  const hotels = ref([]);
  const liked = ref({});

  onMounted(async () => {
    hotels.value = await fetchHotelsByCity(cityId);
  });

  const activeOption = ref(null);
  const toggleOptions = (option) => {
    activeOption.value = activeOption.value === option ? null : option;
  };

  

  return {
    isMenuVisible,
    toggleMenu,
    hotels,
    liked,
    searchQuery,
    activeOption,
    toggleOptions,
  };
}
