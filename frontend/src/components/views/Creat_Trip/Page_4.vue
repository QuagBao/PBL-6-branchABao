<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid frame-title">
                        <h1>Da Nang</h1>
                    </div>
                    <div class="container-fluid line"></div>
                    <div class="container-fluid title desinations">
                        <span>Exploring the Lively Cultural Heritage and Natural Beauty of Central Viet Nam</span>
                        <div class="container-fluid context grid-items">
                            <Item v-for="(place, index) in suggestedDestinations" :key="index"
                                :imageUrl="place.imageUrl"
                                :name="place.name"
                                :rating="generateStars(place.rating)"
                                :id="place.id"/>
                        </div>
                    </div>
                    <div class="container-fluid line"></div>
                    <div class="container-fluid title restaurants">
                        <span>Local Restaurant Picks</span>
                        <span class="description">Here are some local favorites.</span>
                        <div class="container-fluid grid-items">
                            <Item v-for="(place, index) in suggestedDestinations" :key="index"
                                :imageUrl="place.imageUrl"
                                :name="place.name"
                                :rating="generateStars(place.rating)"
                                :id="place.id"/>
                        </div>
                    </div>
                    <div class="container-fluid line"></div>
                    <div class="container-fluid title hotels">
                        <span>Places to stay</span>
                        <span class="description">We've also recommended some places to stay during your trip.</span>
                        <div class="container-fluid grid-items">
                            <Item v-for="(place, index) in suggestedDestinations" :key="index"
                                :imageUrl="place.imageUrl"
                                :name="place.name"
                                :rating="generateStars(place.rating)"
                                :id="place.id"/>
                        </div>
                    </div>

                    <div class="container-fluid frame-button">
                        <button class="button back" @click="goBack" >Back</button>
                        <button class="button next" @click="goNext" >Next</button>
                    </div>
                    <Float_Button class="float-button"/>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Item from './Item.vue';
import Float_Button from './Float_Button.vue';
export default {
    name: "Page_4",
    components: {
        Item, Scroll_Bar_Component, Float_Button
    },
    methods: {
        // Method for 'Back' button (to go to the previous page)
        goBack() {
            this.$router.push({name: 'Page_3'}); // This will take the user to the previous page in the history
        },
        // Method for 'Next' button (to navigate to the next page)
        goNext() {
            this.$router.push({ name: 'Page_5' }); // Replace 'next-page' with the name of your target route
        },
    }
}
</script>

<script setup>
import CreateTripViewModel from '../../viewModels/Create_Trip_ViewModel/CreateTripViewModel';
const {
    searchQuery,
    suggestedDestinations,
    searchDestinations,
    generateStars,
    places
} = CreateTripViewModel();
</script>

<style scoped>
.frame-title{
    margin-top: 50px;
    color: #13357B;
}
.frame-title h1{
    font-weight: 900;
    font-size: 60px;
}
.title {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin: 30px 0;
}
.title span {
    font-size: 25px;
    font-weight: 900;
    color: #13357B;
}
.grid-items{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    gap: 35px;
    align-items: center;
}
.line {
    width: 95%;
    height: 1px;
    background-color: #13357B;
    margin-top: 30px;
    border-radius: 20px;
}
.description {
    font-size: 20px !important;
    font-weight: 500 !important;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 80px;
}
.button {
    padding: 10px 50px;
    border: none;
    border-radius: 30px;
    background-color: #00B4D8;
    color: #EDF6F9;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.2);
}
button:hover {
    background-color: #13357B;
    color: #EDF6F9
}
.float-button {
    position: fixed;
    bottom: 0px;
    left: 105px;
    z-index: 99;
}
</style>