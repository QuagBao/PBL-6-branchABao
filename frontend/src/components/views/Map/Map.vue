<script>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import AutoComplete from './components/AutoComplete.vue';
import AutoComplete from './Auto_Complete.vue';
import MapComponent from './Map_Component.vue';
import { ref, defineComponent } from 'vue';
export default defineComponent ({
  components: {
    AutoComplete,
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
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
  <div>
    <AutoComplete @location-selected="updateLocation" />
    <MapComponent :selectedLocation="location" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
