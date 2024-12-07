<template>
    <div class="container-fluid">
        <div class="container-fluid p-2">
            <div class="container-fluid frame-title" style="width: 1480px;">
                <h1>Tell us what you’re interested in</h1>
                <h5>Select all that apply</h5>
            </div>
            <div class="container frame-items">
                <button v-for="topic in topics" :key="topic" 
                        class="item"
                        :class="{ 'selected': selectedTopics.includes(topic) }"
                        @click="toggleTopic(topic)">
                    {{ topic }}
                </button>
            </div>
            <div class="container-fluid frame-button px-5 py-2">
                <button class="button back" @click="goBack" >Back</button>
                <button class="button next" @click="goNext" >Next</button>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Calendar from './Calendar.vue';
export default {
    name: "Page_3",
    components: {
        Calendar,
    },
    
    methods: {
        // Method for 'Back' button (to go to the previous page)
        goBack() {
            this.$router.push({name: 'Page_2'}); // This will take the user to the previous page in the history
        },
        // Method for 'Next' button (to navigate to the next page)
        goNext() {
            this.$router.push({ name: 'Page_4' }); // Replace 'next-page' with the name of your target route
        },
    }
}
</script>

<script setup>
import CreateTripViewModel from '../../viewModels/Create_Trip_ViewModel/CreateTripViewModel';
const {
    topics,
    selectedTopics,
    toggleTopic
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
.frame-items {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 50px;
}
.item {
    border-radius: 50px;
    background-color: #EDF6F9;
    color: #13357B;
    border: 2px solid #13357B;
}
.item.selected {
    background-color: #13357B;
    color: #EDF6F9;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 40px;
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
.frame-dates {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    color: #13357B;
    font-size: 20px;
    text-decoration: underline;
    text-underline-offset: 7px;
}
</style>