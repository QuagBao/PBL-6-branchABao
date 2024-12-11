<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Auto_Complete from './Auto_Complete.vue';
import MapComponent from './Map_Component.vue';
import { ref, defineComponent } from 'vue';
export default defineComponent ({
  components: {
    Auto_Complete,
    MapComponent
  },
  setup() {
    const location = ref([105.85242472181584, 21.029579719995272]);

    // Hàm cập nhật vị trí
    const updateLocation = (newLocation) => {
      location.value = [newLocation.lng, newLocation.lat];
    };

    // Trả về các biến và hàm cho template
    return { location, updateLocation };
  }
});
</script>

<template>
    <div>
        <AutoComplete @location-selected="updateLocation" />
        <MapComponent :selectedLocation="location" />
    </div>
</template>