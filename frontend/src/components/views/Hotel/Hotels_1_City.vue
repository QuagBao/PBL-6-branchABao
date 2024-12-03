<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button v-if="cityId" :cityID="parseInt(cityId, 10)"/>
    </div>

    <!-- Images -->
    <img src="@/assets/images/tms-hotel-da-nang-beach.jpg" alt="City 1" class="img-fluid">
    <!-- Search -->
    <div class="container-fluid search">
        <div class="container">
            <Form_Search    :name_of_page="'Find your perfect hotel to rest'"
                            :name="'Attraction, activities or destination'"/>
        </div>
    </div>

    <div class="content">
        <div class="row">
            <div class="col-5">
                <Filter_Option class="left-panel"/>
            </div>
            <div class="col-7 list-hotels">
                <Card_Item v-for="(item, index) in hotels"
                            :key="index"
                            :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
                            :name="item.name"
                            :rating="generateStars(item.rating)"
                            :reviewNumber="item.numOfReviews"
                            :tags="item.tag"
                            @click="navigateToDetailHotel(item.hotel_id)"/>
            </div>
        </div>
    </div>

    
 </template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../../viewModels/Hotel_City_ListViewModel';
import generateViewModel from '../../viewModels/generate_ratingViewModel';
import { useRoute } from 'vue-router';

const route = useRoute();
const cityId = route.params.id;

const {
    isMenuVisible, toggleMenu,
    buttons, selectedIndices, selectButton,
    hotels, getImageUrl,
    liked, toggleLikeStatus, heartFull, heartEmpty,
    currency, minPrice, maxPrice, setupSlider, updatePrice, handleCurrencyChange,
    activeOption, toggleOptions,
    searchQuery,
    updateSliderFromInput
} = destinationViewModel(cityId);

const {
    circles,
    rating,
    ratings,
    generateCircle,
    generateStars,
    totalRating,
  } = generateViewModel();

const navigateToDetailHotel = (hotel_id) => {
        window.location.assign(`/Detail/Hotel/${hotel_id}`);
    };
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Top_Button from '../Top_Button.vue';
    import Form_Search from '../Form_Search.vue';
    import Img_Card from '../Img_Card.vue';
    import Card_Item from '../Card_Item.vue';
    import Filter_Option from '../Filter_Option.vue';
    export default {
        name: "ThingsToDo_List",
        components: {
            Header, Scroll_Bar_Component, Top_Button, Form_Search,
            Img_Card, Card_Item, Filter_Option,
        }
    }
</script>

<style scoped>
body {
    background-color: #EDF6F9;
}
.img-fluid {
    margin-top: 200px;
    width: 100vw;
    padding: 0px;
    height: 600px;
    border-radius: 25px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.search{
    margin-top: -25%;
    margin-bottom: 250px;
}
.content{
    display: flex;
    flex-direction: column;
    color: #13357B;
    font-size: 28px;
    padding-top: 20px;
}
.content p{
    font-weight: 900;
    margin-top: 15px; 
}
.list-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}
.list-items-1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}
.list-hotels{
    display: grid;
    margin-top: 0px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    align-items: center;
    height: 100%;
}
.left-panel{
    position: sticky;
    top: 160px;
    width: 70%;
}
</style>

