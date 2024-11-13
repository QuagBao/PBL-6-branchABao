<template>
    <div class="container-fluid ">
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

        <div class="sort row">
            Sort by: 
            <div class="custom-select">
                <div class="select-selected row" @click="toggleDropdown">
                    <div class="col-sm-8">
                        {{ selectedOption }}
                    </div>
                    <div class="col-sm-4">
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

        <div class="list-trip-items">
            <Trips_Item/>
            <Trips_Item_no_date/>
        </div>
    </div>
</template>

<script>
    import Trips_Item from './Trips_Item.vue';
    import Trips_Item_no_date from './Trips_Item_no_date.vue';
export default {
    name: "Trips_Profile", 
    components: {
        Trips_Item, Trips_Item_no_date
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