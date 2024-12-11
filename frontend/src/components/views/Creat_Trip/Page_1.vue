<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid">
                        <div class="container-fluid frame-search">
                            <Form_Search class="custom-search"
                                        :name_of_page="'Where do you want to go?'"
                                        :name="'Choose a city or town'"/>
                        </div>
                        <div class="container-fluid frame-item">
                            <div class="container-fluid item" :key="index"
                                v-for="(destination, index) in suggestedDestinations.slice(0, 4)">
                                <Img_Card :imageUrl="destination.images[0]" 
                                        :name="destination.name"/>
                            </div>
                        </div>
                        <div class="container-fluid frame-button">
                            <button @click="goNext" class="next">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Form_Search from '../Form_Search.vue';
import Img_Card from '../Img_Card.vue';
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
export default {
    name: "Create_Trip",
    components: {
        Form_Search, Img_Card
    }, 
    methods: {
        goNext () {
            this.$router.push({ name: 'Page_2_1' });
        }
    }
}

</script>

<script setup>
import CreateTripViewModel from '../../viewModels/Create_Trip_ViewModel/CreateTripViewModel';
import router from '@/router';

const {
    searchQuery,
        suggestedDestinations,
        searchDestinations
} = CreateTripViewModel();
</script>

<style scoped>
.frame-search{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}
/* Custom style for Form_Search in this component */
/* Use :deep to apply styles inside Form_Search component */
:deep(.custom-search .form-control) {
    background-color: #CAF0F8; /* Change input background color */
    font-size: 20px;
}
:deep(.custom-search .form-control::placeholder) {
    color: #00B4D8;
    font-size: 20px;
}
/* Customize the title text color */
:deep(.custom-search .title) {
    font-size: 60px;
    color: #00B4D8; /* Dark green color */
}
:deep(.custom-search button) {
    opacity: 0;
}
.frame-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    margin-top: 50px;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: right;
    margin-top: 50px;
    margin-bottom: 40px;
}
button {
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
}
</style>