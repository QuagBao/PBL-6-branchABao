<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid frame-title" style="width: 1480px;">
                <h1>Trip Saved</h1>
                <h5>Your selections have been saved to a trip.</h5>
            </div>

            <div class="container">
                <div class="container frame-name">
                    <Trips_Item class="custom"/>
                </div>
            </div>

            <div class="container-fluid frame-button px-5 py-2">
                <button class="button back" @click="goBack" >Back</button>
                <button type="submit" @click="goView" class="button next-button">View trip</button>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Trips_Item from '../Profile_Page/Trips_Item.vue';
import Trips_Item_no_date from '../Profile_Page/Trips_Item_no_date.vue';
export default {
    name: "Page_7_1",
    components: {
      Trips_Item, Trips_Item_no_date  
    },
    methods: {
        // Method for 'Back' button (to go to the previous page)
        goBack() {
            this.$router.push({name: 'Page_5'}); // This will take the user to the previous page in the history
        },
        goView() {
            this.$router.push({name: 'Detail_Trip'}); // This will take the user to the previous page in the history
        },
    }
}
</script>

<script setup>
import CreateTripViewModel from '../../viewModels/Create_Trip_ViewModel/CreateTripViewModel';
const {
    itineraryName, finishItinerary
} = CreateTripViewModel();
</script>

<style scoped>
.frame-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    color: #00B4D8;
}
.frame-title h1{
    font-weight: 900;
    font-size: 60px;
}
.frame-title h5{
    color: #13357B;
}
.frame-name{
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}
:deep(.custom .ava) {
    margin-top: -10px;
    margin-bottom: -9.5px;
    margin-left: 2.5px;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 45px;
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
</style>