<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div>

    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid frame-detail">
                        <div class="frame-title">
                            <div class="name-of-tour">
                                <h2>{{ tour?.name }}</h2>
                            </div>
                            <div class="name-of-business">
                                <p>By {{ user_create?.username }}</p>
                            </div>
                            <div class="frame-rating d-flex gap-3">
                                <div class="rating">
                                    <div v-for="(star, index) in generateStars(tour?.rating)" :key="index">
                                        <img :src="star" alt="Star" class="star"/>
                                    </div>
                                </div>
                                <div class="reviews">
                                    <p>/{{ tour?.numOfReviews }} reviews</p>
                                </div>
                            </div>
                        </div>
                        <div class="frame-image">
                            <div class="item-1">
                                <img class="img-1" :src="images && images[0] ? images[0].url : '/blue-image.jpg'" alt="">
                            </div>
                            <div class="item-2">
                                <img class="img-2" :src="images && images[1] ? images[1].url : '/blue-image.jpg'" alt="">
                            </div>
                            <div class="item-3">
                                <img class="img-3" :src="images && images[2] ? images[2].url : '/blue-image.jpg'" alt="">
                            </div>
                        </div>
                        <div class="frame-info">
                            <div class="detail">
                                <Info_Card :maxAge="maxAge" :duration="tour?.duration" :totalbottom="totalPriceBottom"/>
                            </div>
                            <div class="about">
                                <About :description="tour?.description"/>
                            </div>
                        </div>
                        <div class="frame-tinerary">
                            <div class="frame-schedule">
                                <Schedule :destinations="tour?.destinations"/>
                            </div>
                            <div class="frame-map">
                                <p>Map</p>
                            </div>
                        </div>
                        <div class="frame-contribute">
                            <Contribute :commentList="reviews"
                                        :tour_id="Number(tourID)"
                                        :user="user?.id||0"/>
                                        
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
import { useRoute } from 'vue-router';
import generateViewModel from '../../../viewModels/generate_ratingViewModel';

const route = useRoute();
const tourID = route.params.id;

const {
    loadCities,
    loadTours,
    loadTourById,
    loadTourByCityId,
    loadUser,
    loadReviewByTourId,
    loadCurrentUser,
} = TourViewModel();

const {
    generateStars,
} = generateViewModel();

const tour = ref();
const cities = ref([]);
const user_create = ref(null);
const images = ref([]);
const maxAge = ref(null);
const reviews = ref([]);
const user = ref(null);
const totalPriceBottom = ref(0);

onMounted(async () => {
    // Load data
    tour.value = await loadTourById(tourID);
    cities.value = await loadCities();
    user_create.value = await loadUser(tour.value.user_id);
    reviews.value = await loadReviewByTourId(tourID);
    user.value = await loadCurrentUser();
    // Add images from destinations to the images array
    if (tour.value?.destinations?.length) {
        totalPriceBottom.value = tour.value.destinations.reduce((sum, destination) => {
            return sum + (destination.price_bottom || 0); // Add price_bottom if it exists
        }, 0);
        tour.value.destinations.forEach(destination => {
            
            if (destination.images?.length) {
                destination.images.forEach(image => {
                    images.value.push(image); // Add each image to the global images array
                });
            }
            if (destination.age !== undefined) {
                maxAge.value = maxAge.value === null
                    ? destination.age
                    : Math.max(maxAge.value, destination.age);
            }

        });
    }
});

const getCity = (city_id) => {
    return cities.value.find(city => city.id === city_id);
};
</script>
<script>
import Header from '../../Header.vue';
import Top_Button from '../../Top_Button.vue';
import Scroll_Bar_Component from '../../Scroll_Bar_Component.vue';
import Info_Card from './Info_Card.vue';
import About from './About.vue';
import Schedule from './Schedule.vue';
import Contribute from './Contribute.vue';
export default {
    name: "Detail_Tour",
    components: {
        Header, Top_Button, Info_Card, About, Schedule, Contribute
    }
}
</script>

<style scoped>
.frame-detail{
    margin-top: 200px;
    color: #13357B;
}
.name-of-tour h2{
    font-weight: 900;
}
.name-of-business p {
    text-decoration: underline;
    text-underline-offset: 2px;
}
.rating{
    display: flex;
    margin: 0px 0 0 10px;
}
.rating img{
    width: 20px;
    height: 20px;
}
.reviews p{
    font-size: 20px;
}
.frame-image{
    display: grid;
    overflow: hidden;
    grid-template-columns: 60% 40%;
    grid-template-rows: minmax(0, 315px) minmax(0, 315px);
    grid-template-areas:
        "left top"
        "left bottom";
    gap: 10px;
    border-radius: 15px;
}
.item-1 {
    grid-area: left;
    position: relative;
}
.img-1, .img-2, .img-3 {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.frame-info{
    display: grid;
    grid-template-columns: 45% 52.8%;
    gap: 30px;
}
.frame-tinerary {
    margin: 20px 0 30px 0;
    display: grid;
    grid-template-columns: 45% 52.8%;
    gap: 30px;
}
.frame-map {
    border-radius: 15px;
    background-color: #EDF6F9;
    padding: 30px;
    color: #13357B;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);    
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
}
</style>