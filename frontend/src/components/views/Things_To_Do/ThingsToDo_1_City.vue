<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button v-if="cityDetails && cityDetails.name" :name="cityDetails.name"/>
    </div>

    <!-- Images -->
    <div class="container-fluid overall">
        <div class="image-container">
            <div class="base"></div>
            <img :src="city?.images?.[0]?.url || '/blue-image.jpg'" alt="City 1" class="img-fluid">
        </div>
        <div class="overall-container">
            <div class="text-container">
                <h1>Things to do in {{ city?.name || 'Loading...' }}</h1>
                <p>Check out must-see sights and activities:</p>
            </div>
        </div>
    </div>

    <div class="container-fluid catagory">
        <Btn_Catagory/>
    </div>

    <div class="container-fluid p-4">
        <div class="container p-2">
            <h1 class="title">Top Attraction in {{ city?.name || 'Loading...' }}</h1>
        </div>
    </div>

    <div class="container-fluid context list-items-1">
        <Info_Card v-for="(item, index) in attractions"
                :key="index"
                :imageUrl="item.images[0].url||'/blue-image.jpg'"
                :name="item.name"
                :rating="generateStars(item.rating)"
                :review-number="item.numOfReviews"
                :tags="item.tag"
                :description="item.description"
                @click="navigateToDetailPlace(item.id)"/>
    </div>
 </template>

<script setup>
import destinationViewModel from '../../viewModels/city_ThingToDo_ListViewModel';
import { useRoute } from 'vue-router';

const route = useRoute();
const cityId = route.params.id; // Lấy cityId từ route params

const {
    images,
    isMenuVisible,
    toggleMenu,
    buttons,
    selectedIndices,
    selectButton,
    attractions,
    city,
    generateStars,
    getImageUrl,
    liked,
    toggleLikeStatus,
    heartFull,
    heartEmpty,
} = destinationViewModel(cityId);
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
body {
    background-color: #EDF6F9;
}
.overall{
    display: flex;
    margin-top: 200px;
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
.overall-container{
    display: flex;
    flex-direction: column;
    margin: 100px 0 0 100px;
    color: #13357B;
}
.text-container{
    display: flex;
    flex-direction: column;
    gap: 50px;
    font-size: 30px;
    justify-content: center;
    align-items: center;
}
.text-container h1{
    width: 550px;
    font-size: 50px;
    font-weight: 900;
}
.title{
    color: #13357B;
    font-size: 40px;
    font-weight: 900;
    margin-top: 70px;
}
.list-items-1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}
.catagory{
    margin: 40px 0 -10px 0;
}
</style>

