<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div>

    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid frame-list">
                        <div class="frame-filter">
                            <Filter/>
                        </div>
                        <div class="frame-list-items">
                            <Tour_Item 
                                v-for="tour in tours"
                                :key="tour.id"
                                :tour="tour"
                                :city="getCity(tour.city_id)"
                                @click="navigateToDetailTour(tour.id)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TourViewModel from '../../../viewModels/TourViewModel';
import { ref, computed, onMounted, watch } from 'vue';
const {
    loadCities,
    loadTours,
    loadTourById,
    loadTourByCityId
} = TourViewModel();

const tours = ref([]);
const cities = ref([]);
onMounted(async () => {
    tours.value =  await loadTours();
    cities.value = await loadCities();
});

const getCity = (city_id) => {
    return cities.value.find(city => city.id === city_id);
}
const navigateToDetailTour = (tour_id) =>{
        window.location.assign(`/tour/${tour_id}`);
    };
</script>
<script>
import Header from '../../Header.vue';
import Top_Button from '../../Top_Button.vue';
import Scroll_Bar_Component from '../../Scroll_Bar_Component.vue';
import Filter from './Filter.vue';
import Tour_Item from './Tour_Item.vue';
export default {    
    name: "List_Tour",
    components: {
        Header, Top_Button, Filter, Tour_Item
    }
}
</script>



<style scoped>
.frame-list {
    margin-top: 200px;
    display: grid;
    grid-template-columns: 20% 75%;
    gap: 100px;
}
.frame-list-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 60px;
    margin-bottom: 30px;
}

</style>