import { ref, onMounted, watch, nextTick } from 'vue';
import { fetchHotels } from '../models/destinationModel.js';

import 'nouislider/dist/nouislider.css';

export default function () {

  const isMenuVisible = ref(false);
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  const searchQuery = ref('');

  const hotels = ref([]);
  const liked = ref({});

  onMounted(async () => {
    hotels.value = await fetchHotels();
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
