<template>
    <div class="frame-day">        
        <button class="day nav-link" v-if="day_1.length > 0" @click="toggleDay(1)">Day 1</button>
        <button class="day nav-link" v-if="day_2.length > 0" @click="toggleDay(2)">Day 2</button>
        <button class="day nav-link" v-if="day_3.length > 0" @click="toggleDay(3)">Day 3</button>
        <button class="day nav-link" v-if="day_4.length > 0" @click="toggleDay(4)">Day 4</button>
        <button class="day nav-link" v-if="day_5.length > 0" @click="toggleDay(5)">Day 5</button>
        <button class="day nav-link" v-if="day_6.length > 0" @click="toggleDay(6)">Day 6</button>
        <button class="day nav-link" v-if="day_7.length > 0" @click="toggleDay(7)">Day 7</button>
        <button class="day nav-link" v-if="day_0.length > 0" @click="toggleDay(8)">Place to stay</button>
    </div>
    <div class="frame-list d-flex flex-column gap-5" v-if="day_1.length > 0">
        <div class="item-days d-flex flex-column gap-3" v-if="day_1.length > 0">
            <div class="title">
                <h2>Day 1</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(1)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[1]">
                <Itinerary_Item
                    v-for="destination in day_1"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_2.length > 0">
            <div class="title">
                <h2>Day 2</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(2)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[2]">
                <Itinerary_Item
                    v-for="destination in day_2"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_3.length > 0">
            <div class="title">
                <h2>Day 3</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(3)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[3]">
                <Itinerary_Item
                    v-for="destination in day_3"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_4.length > 0">
            <div class="title">
                <h2>Day 4</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(4)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[4]">
                <Itinerary_Item
                    v-for="destination in day_4"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_5.length > 0">
            <div class="title">
                <h2>Day 5</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(5)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[5]">
                <Itinerary_Item
                    v-for="destination in day_5"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_6.length > 0">
            <div class="title">
                <h2>Day 6</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(6)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[6]">
                <Itinerary_Item
                    v-for="destination in day_6"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_7.length > 0">
            <div class="title">
                <h2>Day 7</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(7)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[7]">
                <Itinerary_Item
                    v-for="destination in day_7"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3" v-if="day_0.length > 0">
            <div class="title">
                <h2>Place to stay</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" @click="toggleDay(8)">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3" v-if="visibleDays[8]">
                <Itinerary_Item
                    v-for="destination in day_0"
                    :key="destination.id"
                    :destination="destination"
                    @click="navigate(destination)"
                />
            </div>
        </div>
    </div>
    <div v-else>
        <h2 class="title">No itinerary yet</h2>
    </div>
    
</template>

<script setup>
import { ref, computed } from 'vue';
import Itinerary_Item from './Itinerary_Item.vue';

const props = defineProps({
  trip: Object
});

const day_0 = ref([]);
const day_1 = ref([]);
const day_2 = ref([]);
const day_3 = ref([]);
const day_4 = ref([]);
const day_5 = ref([]);
const day_6 = ref([]);
const day_7 = ref([]);

//Định nghĩa emit sự kiện và tính toán destListID
const emit = defineEmits(['update-dest-list-id']);
const destListID = computed(() => props.trip.destinations.map(destination => destination.id));
// Gửi dl khi tính toán xong
emit('update-dest-list-id', destListID.value);

const visibleDays = ref({1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true});

const toggleDay = (day) => {
    visibleDays.value[day] = !visibleDays.value[day];
};

const sortDestinations = () => {
    if (props.trip && props.trip.destinations) {
        console.log('props.trip.destinations:', destListID.value);
        props.trip.destinations.forEach(destination => {
            switch (destination.day) {
                case 0:
                    day_0.value.push(destination);
                    break;
                case 1:
                    day_1.value.push(destination);
                    break;
                case 2:
                    day_2.value.push(destination);
                    break;
                case 3:
                    day_3.value.push(destination);
                    break;
                case 4:
                    day_4.value.push(destination);
                    break;
                case 5:
                    day_5.value.push(destination);
                    break;
                case 6:
                    day_6.value.push(destination);
                    break;
                case 7:
                    day_7.value.push(destination);
                    break;
            }
        });

        day_0.value.sort((a, b) => a.order - b.order);
        day_1.value.sort((a, b) => a.order - b.order);
        day_2.value.sort((a, b) => a.order - b.order);
        day_3.value.sort((a, b) => a.order - b.order);
        day_4.value.sort((a, b) => a.order - b.order);
        day_5.value.sort((a, b) => a.order - b.order);
        day_6.value.sort((a, b) => a.order - b.order);
        day_7.value.sort((a, b) => a.order - b.order);
    }
};

sortDestinations();

const navigate = (destination) => {
    if(destination.hotel_id!= null){
        navigateToDetailHotel(destination.hotel_id);
    }
    else if(destination.restaurant_id!= null){
        navigateToDetailRestaurant(destination.restaurant_id);
    }
    else{
        navigateToDetailPlace(destination.id);
    }
}
const navigateToDetailPlace = (id) => window.location.assign(`/Detail/Place/${id}`);
const navigateToDetailRestaurant = (restaurant_id) => window.location.assign(`/Detail/Restaurant/${restaurant_id}`);
const navigateToDetailHotel = (hotel_id) => window.location.assign(`/Detail/Hotel/${hotel_id}`);
</script>

<style scoped>
.frame-day{
    display: flex;
    gap: 27.5px;    
    padding: 20px 0;
    border-bottom: 1px solid #13357B;
    margin-bottom: 20px;
}
.day {
    min-width: 95px;
    color: #13357B; 
    padding: 5px 10px;
    background-color: #CAF0F8;   
    border-radius: 25px; 
}
button:hover {
    background-color: #D7DAF9;
}
.frame-count{
    margin-bottom: 20px;
    padding-bottom: 20px;
    color: #13357B;
}
.button {
    display: flex;
    gap:10px;
    align-items: center;
    color: #13357B;
    background-color: transparent;
    padding: 8px 25px;
    border-radius: 30px;
    border: 2px solid #13357B;
    font-weight: bold;
    cursor: pointer;
}
.count-text{
    margin-top: 10px;
}
.title {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    color: #13357B;
}
.frame-list {
    margin-bottom: 50px;
}   
h2 {
    font-weight: bold;
}
</style>