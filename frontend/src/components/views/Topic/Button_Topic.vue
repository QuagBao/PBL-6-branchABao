<template>
    <Swiper class="swiper"
            :slides-per-view="2"
            :spaceBetween="10"
            :pagination="{ clickable: true }"
            :navigation="true"
            :modules="modules">
            <SwiperSlide class="swiper-slide" v-for="(item, index) in visibleButtons" 
                        :key="index">
                <button class="button-item" 
                        :class="{ selected: selectedIndex === (currentIndexButton + index) }" 
                        @click="selectButton(index)">
                    {{ item }}
                </button>
            </SwiperSlide>
    </Swiper>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import destinationViewModel from '../../viewModels/Topic_ListViewModel';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

const { visibleButtons, selectedIndex, currentIndexButton, selectButton } = destinationViewModel();

const modules = [Navigation, Pagination, Scrollbar, A11y];

const onSwiper = (swiper) => {
    window.swiper = swiper;
};
</script>


<style scoped>

.swiper {
    width: 100%;
    max-width: 1450px; /* Set a max-width to ensure enough space for 3 slides */
}

.swiper-slide {
    color: #13357B;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
}
::v-deep(.swiper-button-next),
::v-deep(.swiper-button-prev) {
    color: #13357B !important;
    border: none;
    cursor: pointer;
}
button{
    color: #13357B;
    width: 60%;
    padding: 15px 0px;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    background-color: #CAF0F8;
    transition: background-color 0.3s ease;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}

.button-item:hover {
    background-color: #0077b6;
    color: #EDF6F9 
}     
.button-item.selected {
    background-color: #13357B;
    color: #EDF6F9;
}
</style>