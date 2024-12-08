<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button v-if="cityId" :cityID="parseInt(cityId, 10)"/>
    </div>

    <div class="contaner-fluid">
        <div class="contaner-fluid">
            <div class="contaner-fluid">
                <div class="contaner-fluid frame-1 d-flex flex-column gap-5">
                    <!-- Images -->
                    <div class="overall">
                        <div class="image-container">
                            <div class="base"></div>
                            <img :src="city?.images?.[0]?.url || '/blue-image.jpg'" alt="City 1" class="img-fluid">
                        </div>
                        <div class="overall-container p-5">
                            <div class="text-container p-5 d-flex flex-column">
                                <h1>Things to do in {{ city?.name || 'Loading...' }}</h1>
                                <p>Check out must-see sights and activities:</p>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid d-flex flex-column gap-5 ">
                        <div class="container-fluid btn-catagory d-flex justify-content-center">
                            <Swiper class="swiper"
                                    :slides-per-view="4"
                                    :spaceBetween="10"
                                    :scrollbar="{ draggable: true }"
                                    :modules="modules">
                                <SwiperSlide v-for="item in buttons" :key="item.id">
                                    <button class="button-category" 
                                            :class="{ selected: selectedIndices.includes(item.id) }" 
                                            @click="selectButton(item.id)">
                                        {{ item.name }}
                                    </button>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div class=" title-content">
                            <p class="title p-5">Top Attraction in {{ city?.name || 'Loading...' }}</p>
                            <div class="container-fluid list-items-1">
                                <Info_Card v-for="(item, index) in filteredDestinations"
                                            :key="index"
                                            :destID="item.id"
                                            :imageUrl="item.images[0].url||'/blue-image.jpg'"
                                            :name="item.name"
                                            :stars="generateStars(item.rating)"
                                            :review-number="item.numOfReviews"
                                            :tags="item.tag"
                                            :description="item.description"
                                            @click="navigateToDetailPlace(item.id)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </template>

<script setup>
import destinationViewModel from '../../viewModels/ThingToDo_City_ListViewModel';
import generateViewModel from '../../viewModels/generate_ratingViewModel';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const modules = [Navigation, Pagination, Scrollbar, A11y];

const route = useRoute();
const cityId = route.params.id; // Lấy cityId từ route params

const {
    isMenuVisible,
    toggleMenu,
    fetchCityDetailsData,
    fetchTags,
    fetchDestinationsData,
    buttons,
    selectedIndices,
    selectButton,
    
    destinations,
    filteredDestinations,
    city,
    liked,
    toggleLikeStatus,
    heartFull,
    heartEmpty,
    truncatedDescription,
} = destinationViewModel(cityId);

onMounted(() => {
    fetchCityDetailsData();
    fetchDestinationsData();
    fetchTags();
});

const {
    circles,
    rating,
    ratings,
    generateCircle,
    generateStars,
    totalRating,
  } = generateViewModel();
const navigateToDetailPlace = (id) => {
    window.location.assign(`/Detail/Place/${id}`);
};
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Top_Button from '../Top_Button.vue';
    import Info_Card from './Info_Card.vue';
    import Btn_Catagory from './Btn_Catagory.vue';
    export default {
        name: "ThingsToDo_List",
        components: {
            Header, Scroll_Bar_Component, 
            Top_Button, Info_Card, Btn_Catagory
        }
    }
</script>

<style scoped>
.overall{
    display: flex;
    margin-top: 200px;
    color: #13357B;
}
.image-container{
    display: flex;
}
.base{
    margin: 0 0 0 90px;
    min-width: 600px;
    min-height: 600px;
    background-color: #D5DEF7;
}
.img-fluid {
    position: absolute;
    margin: 25px 0 0 115px;
    width: 600px;
    padding: 0px;
    height: 550px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.text-container{
    gap: 50px;
    font-size: 30px;
}
.text-container h1{
    font-size: 50px;
    font-weight: 900;
}
.title-content {
    margin-bottom: 30px;
}
.title-content p{
    color: #13357B;
    font-size: 30px;
    font-weight: 900;
}
.list-items-1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}
.swiper {
    width: 100%;
    max-width: 1450px; /* Set a max-width to ensure enough space for 3 slides */
}

.swiper-slide {
    color: #13357B;
    background-color: #EDF6F9;
    text-align: center;
    margin: 20px 0; 
}
.button-category{
    color: #13357B;
    width: 80%;
    padding: 8px 16px;
    border: 1px solid #13357B;
    border-radius: 40px;
    cursor: pointer;
    background-color: #EDF6F9;
    transition: background-color 0.3s ease;
}
.button-category:hover {
    background-color: #0077b6;
    color: #EDF6F9 
}     
.button-category.selected {
    background-color: #13357B;
    color: #EDF6F9;
}
</style>

<style>
.swiper .swiper-scrollbar {
    background-color: #EDF6F9 !important;
    border: 1px solid #13357B !important;
    height: 6px !important;
}

.swiper .swiper-scrollbar-drag {
    background-color: #13357B !important;
}
</style>

