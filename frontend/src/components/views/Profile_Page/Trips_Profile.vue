<template>
    <div class="container-fluid ">
        <div class="row">
            <p>My Trips</p>
        </div>

        <div class="container-fluid-1">
            <button @click="navigateToBuildTrip">
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Create a new trip
            </button>    
        </div>

        <div class="list-trip-items">
            <Trips_Item
            v-for="trip in trips"
                :key="trip.id"
                :trip="trip"
                @click="navigateToDetailTrip(trip.id)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TripViewModel from '../../viewModels/TripViewModel';
const { fetchTripByUser } = TripViewModel();
const trips = ref([]);
onMounted(async () => {
    trips.value = await fetchTripByUser();
});
const navigateToDetailTrip = (trip_id) =>{
        window.location.assign(`/Trip/${trip_id}`);
};
const navigateToBuildTrip = () => {
    window.location.assign('/Create_Trip/');
}
</script>

<script>
    import Trips_Item from './Trips_Item.vue';
    import Header from '../Header.vue';
    import Trips_Item_no_date from './Trips_Item_no_date.vue';
    import Tours_Item from './Tours_Item.vue';
    import Top_Button from '../Top_Button.vue';
import { onMounted } from 'vue';
export default {
    name: "Trips_Profile", 
    components: {
        Trips_Item, Trips_Item_no_date, 
        Tours_Item, Header, Top_Button
    },
    data() {
        return {
            isOpen: false,
            selectedOption: "Recently edited",
            options: ["Recently edited", "Recently created"]
        };
    },
    methods: {
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        selectOption(option) {
            this.selectedOption = option;
            this.isOpen = false;
        }
    }

};

</script>

<style scoped>
.container-fluid{
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 100%;
}

.row p {
    color: #13357B;
    font-size: 40px;
    font-weight: 900;
}

.container-fluid-1 {
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0px;
    padding: 10px 5px;
    gap: 10px;
}

.sort{
    display: flex;
    margin: 20px 0 0 950px;
    color: #13357B;
}

.custom-select {
    display: inline-block;
    margin: -36px 0 0 70px;
    width: 80%;
}

.select-selected {
    padding: 10px;
    background-color: #EDF6F9;
    border-radius: 10px;
    cursor: pointer;
    color: #13357B;
    stroke: #13357B;
    border: 1px solid #13357B;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.3);
}

.select-selected:hover{
    background-color: #13357B;
    stroke: #CAF0F8;
}
.select-selected:hover .col-sm-8{
    color: #CAF0F8;
}
.select-selected .col-sm-8{
    font-weight: bold;
}
.select-items {
    display: block;
    width: 100%;
    background-color: #EDF6F9;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.5);
    list-style-type: none;
    padding: 0;
    margin-top: 5px;
    z-index: 20;
}

.select-items li {
    padding: 10px;
    color: #13357B;
    cursor: pointer;
}

.select-items li:hover {
    background-color: #CAF0F8;
    border-radius: 10px;
}

.dropdown-icon {
    margin: 0px 0 0 50px;
}

/* CSS chỉ cho button trong container-fluid-1 */
button {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-radius: 15px;
    background-color: #EDF6F9;
    color: #13357B;
    stroke: #13357B;
    border: 1px solid #13357B;
    font-weight: bold;
    cursor: pointer;
    flex: 1; /* Để hai nút cách đều và chiếm cùng một khoảng rộng */
}

button:hover {
    background-color: #13357B;
    color: #CAF0F8;
    stroke: #CAF0F8;
}

.list-trip-items{
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 0px
}
</style>