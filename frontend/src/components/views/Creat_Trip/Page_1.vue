<template>
    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid">
                        <div class="container-fluid frame-search">
                            <Input class="custom-search"
                                    :name_of_page="'Where do you want to go?'"
                                    :name="'Choose a city or town'" v-model="searchQuery"
                                    @enter="handleSearch"/>
                        </div>
                        <div class="container-fluid frame-item">
                            <div class="container-fluid item" :key="index"
                                v-for="(destination, index) in suggestedDestinations.slice(0, 4)">
                                <Img_Card :imageUrl="destination.images[0]" 
                                        :name="destination.name"
                                        @click="selectDestination(destination.id, destination.name)"/>
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
import Input from '../Input.vue';
import Img_Card from '../Img_Card.vue';
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
export default {
    name: "Create_Trip",
    components: {
        Input, Img_Card
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
import { useTripStore } from '@/store/useTripStore';

const tripStore = useTripStore();

const {
    searchQuery,
    suggestedDestinations,
    selectDestination,
    selectedDestination
} = CreateTripViewModel();

// Hàm xử lý khi nhấn Enter trong input
const handleSearch = () => {
    if (!searchQuery.value) {
        alert('Please enter a search query.');
        return;
    }

    // Tìm destination khớp với searchQuery
    const matchedDestination = suggestedDestinations.value.find(
        city => city.name.toLowerCase().trim() === searchQuery.value.toLowerCase().trim()
    );

    if (matchedDestination) {
        // Lưu kết quả vào selectedDestination
        selectDestination(matchedDestination.id, matchedDestination.name);
        tripStore.setSelectedDestination(selectedDestination.value);
        const test = tripStore.selectedDestination
        console.log('Selected Destination:', test);
        console.log('Selected Destination:', tripStore.selectedDestination);
        console.log('Selected Destination:', selectedDestination.value);
    } else {
        alert('No matching destination found.');
    }
};

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