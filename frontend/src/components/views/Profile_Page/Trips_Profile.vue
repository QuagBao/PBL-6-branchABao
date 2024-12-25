<template>
    <div class="frame-trip">
        <div class="container py-5">
            <p>My Trips</p>
        </div>

        <div class="d-flex justify-content-around gap-5 py-3">
            <button>
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18M12 6V18" stroke="#currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Create a new trip
            </button>
        
            <button>
                <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.20404 15C3.43827 15.5883 3 16.2714 3 17C3 19.2091 7.02944 21 12 21C16.9706 21 21 19.2091 21 17C21 16.2714 20.5617 15.5883 19.796 15M12 6.5V11.5M9.5 9H14.5M18 9.22222C18 12.6587 15.3137 15.4444 12 17C8.68629 15.4444 6 12.6587 6 9.22222C6 5.78578 8.68629 3 12 3C15.3137 3 18 5.78578 18 9.22222Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Build a trip with AI
            </button>    
        </div>

        <div class="sort"> 
            <div class="frame-sort d-flex gap-3 align-items-baseline">
                Sort by:
                <div class="custom-select d-flex flex-column">
                    <div class="select-selected d-flex" @click="toggleDropdown">
                        <div class="option d-flex flex-column">
                            {{ selectedOption }}
                        </div>
                        <div class="icon">
                            <svg class="dropdown-icon" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    
                    <ul v-if="isOpen" class="select-items">
                        <li v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="list-trip-items">
            <Tours_Item v-for="tour in tours"
                        :key="tour.id"
                        :tour="tour"
                        @click="navigateToDetailTour(tour.id)" />
            <Trips_Item/>
            <Trips_Item_no_date/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TourViewModel from '../../viewModels/TourViewModel';
const { loadTourByUserId } = TourViewModel();
const tours = ref([]);
onMounted(async () => {
    tours.value = await loadTourByUserId();
});
const navigateToDetailTour = (tour_id) =>{
        window.location.assign(`/tour/${tour_id}`);
};
</script>

<script>
    import Trips_Item from './Trips_Item.vue';
    import Trips_Item_no_date from './Trips_Item_no_date.vue';
    import Tours_Item from './Tours_Item.vue';
import { onMounted } from 'vue';
export default {
    name: "Trips_Profile", 
    components: {
        Trips_Item, Trips_Item_no_date, 
        Tours_Item,
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
.frame-trip {
    width: 100%;
}
.container p {
    color: #13357B;
    font-size: 40px;
    font-weight: 900;
}

.sort{
    display: grid;
    grid-template-columns: 60% 40%; 
}

.frame-sort {
    grid-column: 2/3;
    color: #13357B;
}

.select-selected {
    padding: 10px;
    background-color: #EDF6F9;
    border-radius: 10px;
    cursor: pointer;
    stroke: #13357B;
    border: 1px solid #13357B;
    box-shadow: 0 2px 6px -1px rgba(19, 53, 123, .07), 0 6px 18px -1px rgba(19, 53, 123, .04) !important;
}

.select-selected:hover{
    background-color: #13357B;
    stroke: #CAF0F8;
}
.select-selected:hover{
    color: #CAF0F8;
}
.select-selected{
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