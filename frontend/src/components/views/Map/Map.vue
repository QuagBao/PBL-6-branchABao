<script>
import MapComponent from './Map_Component.vue';
import { ref, defineComponent } from 'vue';
import { getMapbyID } from '../../viewModels/mapViewModel.js';
import { onMounted } from 'vue';

export default defineComponent({
  components: {
    MapComponent
  },
  props: {
    destinationID: Number,
    required: true,
  },
  setup(props) {
    const selectedLocation = ref([]);

    const fetchLocations = async () => {
      try {
        console.log('Destination ID:', props.destinationID);
        const locations = await getMapbyID(props.destinationID);
        if (locations.length > 0) {
          selectedLocation.value = [[locations[0].longitude, locations[0].latitude]];
          selectedLocation.value = JSON.parse(JSON.stringify(selectedLocation.value));
        }
        console.log('Selected Location:', selectedLocation.value);
        console.log('Selected Location to MapComponent:', selectedLocation.value);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    onMounted(() => {
      fetchLocations().then(() => {
        console.log("Selected Location to MapComponent:", selectedLocation.value);
      });
    });

    return { selectedLocation };
  }
});
</script>

<template>
  <div>
    <MapComponent :selectedLocations="selectedLocation" />
  </div>
</template>
