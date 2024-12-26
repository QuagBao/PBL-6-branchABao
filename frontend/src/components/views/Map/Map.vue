<script>
import MapComponent from './Map_Component.vue';
import { ref, defineComponent } from 'vue';
export default defineComponent ({
  components: {
    MapComponent
  },
  setup() {
    const location = ref([108.23970942970374, 16.0475275245935]);

    return { location };
  }
});
</script>
<template>
  <div>
    <MapComponent :selectedLocations="[[108.22219989597711, 16.03931241040142], 
                                      [108.23940902229407, 16.04757907839837],
                                      [108.23887302128715, 16.04546624024942]]" />
  </div>
</template>
