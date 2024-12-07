<template>
    <!-- Header Section -->
    <div class="header-container">
        <Header/>
        <Top_Button v-if="cityDetails" :cityID="cityDetails.id"/>
    </div>

    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <!-- Carousel Section -->
                    <Carousel class="custom" :currentImage="currentImage" :images="images"/>

                    <!-- Save Button Section -->
                    <div class="save">
                        <Btn_Save/>
                    </div>
                    <!-- Discover Info Section -->
                     <div class="container-fluid">
                        <div class="container-fluid">
                            <div class="container-fluid d-flex flex-column gap-5">
                                <div class="info-destination d-flex flex-column gap-2">
                                    <p class="title">Discover</p> 
                                    <!-- Destination Name -->
                                    <div class="row">
                                        <div class="col-1"></div>
                                        <div class="col-11 name-of-desstination">{{ cityDetails?.name }}</div>
                                    </div>
                                    <!-- Description Section -->
                                    <div class="row">
                                        <div class="col-1"></div>
                                        <div class="col-11">
                                            <p class="description">
                                                {{ isReadMore ? fullDescription : getTruncatedDescription }}
                                            </p>
                                        </div>
                                    </div>
                                    <!-- Read More/ Less Button -->
                                    <div class="row">
                                        <div class="col-1"></div>
                                        <div class="col-11">
                                            <button class="read-more-or-less" @click="toggleReadMore">{{ isReadMore ? 'Read less' : 'Read more' }}</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="catagory">
                                    <!-- Category Section -->
                                    <p class="characteristic">Characteristic of {{ cityDetails?.name }}</p>
                                    <p class="title-catagory">Select a category to filter suggestion</p>    
                                </div>
                            </div>
                        </div>
                     </div>
                    
                    <!-- Category Buttons & Content Section -->
                    <div class="container-fluid content">
                        <div class="container btn-catagory">
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

                        <!-- Things to do Section -->
                        <div class="title-content">
                            <p class="p-5 things-to-do">Things to do</p>
                            <div class="container-fluid context">
                                <Cards v-for="(item, index) in filteredDestinations"
                                        :key="index"
                                        :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
                                        :name="item.name"
                                        :stars="generateStars(item.rating)"
                                        :rating="item.rating"
                                        :tags="item.tag"
                                        @click="navigateToDetailPlace(item.id)"/>
                            </div>
                        </div>

                        <!-- Restaurants Section -->
                        <div class="row title-content">
                            <p class="p-5 restaurants">Restaurants</p>
                            <div class="container-fluid context">
                                <Cards v-for="(item, index) in filteredRestaurants"
                                        :key="index"
                                        :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
                                        :name="item.name"
                                        :stars="generateStars(item.rating)"
                                        :rating="item.rating"
                                        :tags="item.tag"
                                        @click="navigateToDetailRestaurant(item.restaurant_id)"/>
                            </div>
                        </div>

                        <!-- Resort & Hotels Section -->
                        <div class="row title-content">
                            <p class="p-5 resorts">Resort & Hotels</p>
                            <div class="container-fluid context">
                                <Cards v-for="(item, index) in filteredHotels"
                                        :key="index"
                                        :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
                                        :name="item.name"
                                        :stars="generateStars(item.rating)"
                                        :rating="item.rating"
                                        :tags="item.tag"
                                        @click="navigateToDetailHotel(item.hotel_id)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from 'vue';
    import destinationViewModel from '../../viewModels/destinationViewModel.js';
    import generate_ratingViewModel from '@/components/viewModels/generate_ratingViewModel.js';
    import { useRoute } from 'vue-router';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';
    import 'swiper/css/scrollbar';

    const modules = [Navigation, Pagination, Scrollbar, A11y];
    
    // Route Params
    const route = useRoute();
    const cityId = route.params.id;

    // ViewModel Import & Initialization
    const {
        fetchCityDetailsData,
        fetchTags,
        fetchDestinationsData,
        isMenuVisible,
        toggleMenu,
        currentImage,
        isHeartFilled,
        toggleHeart,
        getTruncatedDescription,
        toggleReadMore,
        isReadMore,
        fullDescription,
        buttons,
        selectedIndices,
        selectButton,
        images,
        liked,
        toggleLikeStatus,
        cityDetails,
        isLoading,
        destinations,
        hotels,
        restaurants,
        isDestinationsLoading,
        isHotelsLoading,
        isRestaurantsLoading,
        filteredDestinations,
        filteredHotels,
        filteredRestaurants,
        fetchAllData,
    } = destinationViewModel(cityId);

    // Lifecycle Hook to Fetch Data on Mount
    onMounted(async () => {
        await fetchCityDetailsData();
        await fetchDestinationsData();
        await fetchTags();
    });

    watch(selectedIndices, async () => {
    await fetchDestinationsData();
  });

    // Rating Generation Function
    const { generateStars } = generate_ratingViewModel();

    // Navigation Functions
    const navigateToDetailPlace = (id) => window.location.assign(`/Detail/Place/${id}`);
    const navigateToDetailRestaurant = (restaurant_id) => window.location.assign(`/Detail/Restaurant/${restaurant_id}`);
    const navigateToDetailHotel = (hotel_id) => window.location.assign(`/Detail/Hotel/${hotel_id}`);
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue'; 
    import Top_Button from '../Top_Button.vue';
    import Btn_Save from './Btn_Save.vue';
    import Cards from './Cards.vue';
    import Carousel from '../Carousel.vue';

    export default {
        name: "Destination_View",
        components: {
            Header, Scroll_Bar_Component, Top_Button,
            Btn_Save, Cards, Carousel,
        }
    }
</script>

<style scoped>
*,*::before,*::after{
    box-sizing: border-box;
}
body{
    background-color: #EDF6F9;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
}
.header-container {
    display: flex;
    flex-direction: column; /* Sắp xếp theo chiều dọc */
    z-index: 1;
    width: 100%;
}
.save{
    display: flex;
    justify-content: center;
}

.info-destination{
    display: flex;
    justify-content: center;
    color: #13357B;
}

.title{
    font-size: 30px;
    font-weight: 900;
}
.name-of-desstination{
    font-size: 50px;
    font-weight: 700;
}

.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    margin-left: -0.5%;
    font-size: 18px;
    font-weight: 700;
    appearance: none;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
}
.read-more-or-less:hover{
    color: #729AE9;
}
.characteristic{
    color: #13357B;
    font-size: 30px;
    font-weight: 900;
}
.title-catagory{
    color: #13357B;
    font-size: 20px;
}
.title-content p{
    color: #13357B;
    font-size: 30px;
    font-weight: 900;
}

.context {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    width: 100%;
    height: 100%;
    gap:30px;
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
.content {
    margin-bottom: 30px;
}
:deep(.custom .carousel-control-next .carousel-control-next-icon) {
    margin-right: -10vw; /* Giá trị mới */
}
:deep(.custom .carousel-control-prev .carousel-control-prev-icon) {
    margin-left: -10vw; /* Giá trị mới */
}
</style>

<style>
.swiper .swiper-scrollbar {
    background-color: #EDF6F9 !important;
    border: 1px solid #13357B !important;
    height: 8px !important;
}

.swiper .swiper-scrollbar-drag {
    background-color: #13357B !important;
}
</style>