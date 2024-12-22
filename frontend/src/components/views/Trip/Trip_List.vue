<template>
    <div class="container-fluid header">
        <Header/>
        <Top_Button/>
    </div>
    <div class="container-fluid-2 ">
        <div class="row">
            <p>My Trips</p>
        </div>

        <div class="container-fluid-1">
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

        <div class="list-trip-items">
            <Tours_Item
                v-for="tour in tours"
                :key="tour.id"
                :tour="tour"
                @click="navigateToDetailTour(tour.id)"
            />
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
* {
    box-sizing: border-box; /* Bao gồm padding và border trong chiều rộng và chiều cao */
}

.container-fluid-2 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100vw;
    min-height: 100vh;
    margin-top: 150px;
    padding: 0 10%; /* Thêm padding bên trái và phải 10% */
    overflow-x: hidden; /* Ẩn thanh cuộn ngang nếu có */
}

.container-fluid-1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 0px;
    padding: 10px 5px;
    gap: 10px;
}

.row p {
    color: #13357B;
    font-size: 40px;
    font-weight: 900;
}

.list-trip-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 0px;
}

/* Thay đổi cho button để căn giữa */
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

</style>