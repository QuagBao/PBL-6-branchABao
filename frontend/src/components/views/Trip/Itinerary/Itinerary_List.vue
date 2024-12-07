<template>
    <div class="frame-day">        
        <button class="day nav-link">Day 1</button>
        <button class="day nav-link">Day 2</button>
        <button class="day nav-link">Day 3</button>
        <button class="day nav-link">Day 4</button>
        <button class="day nav-link">Day 5</button>
        <button class="day nav-link">Day 6</button>
        <button class="day nav-link">Day 7</button>
    </div>
    <div class="frame-count d-flex justify-content-between align-items-center">
        <div class="count">
            <p class="count-text">7 /12 saved items have been added</p>
        </div>
        <button class="button">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Edit / Edit_Pencil_Line_01">
                    <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#13357B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            Edit
        </button>
    </div>
    <div class="frame-list d-flex flex-column gap-5">
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 1</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 2</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 3</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 4</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 5</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 6</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
        <div class="item-days d-flex flex-column gap-3">
            <div class="title">
                <h2>Day 7</h2>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" stroke="#13357B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="frame-items d-flex flex-column gap-3">
                <Itinerary_Item/>
                <Itinerary_Item/>
                <Itinerary_Item/>
            </div>
        </div>
    </div>
    
</template>

<script>
import Itinerary_Item from './Itinerary_Item.vue';
export default {    
    name: "Itinerary_List",
    components: {
        Itinerary_Item
    }
}
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