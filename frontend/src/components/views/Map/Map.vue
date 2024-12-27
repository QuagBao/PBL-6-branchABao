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
    destinationID: [Number, Array],
    required: true,
  },
  setup(props) {
    const selectedLocation = ref([]);

    const fetchLocations = async () => {
      console.log('Destination ID:', props.destinationID);
      const destListID = Array.isArray(props.destinationID) ? props.destinationID : [props.destinationID];
      try {
        for (const destinationID of destListID) {
          const location = await getMapbyID(destinationID);
          console.log('Location:', location);
          if (location &&  location ) {
            selectedLocation.value.push([location[0].longitude, location[0].latitude]);
          } else {
            console.warn(`Invalid data for destination ID: ${destinationID}`);
          }
        }
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
