<template>
    <div class="container-fluid header">
        <Header/>
        <Top_Button/>
    </div>
    <div class="container-fluid frame-overall">
        <div class="container-fluid overall">
            <div class="container-fluid frame">
                <div class="container-fluid frame-image">
                    <div class="container-flud image">
                        <div class="container-flud img-container">
                            <img class="img" src="@/assets/images/carousal_1.jpg" alt="">
                            <div class="overlay"></div>
                            <div class="container info-trip">
                                <h1 class="text" style="font-weight: 900;">Dalak for 4 days</h1>
                                <div class="container date-location">
                                    <div class="container length">
                                        <svg fill="#EDF6F9" width="35px" height="35px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                            <path d="M30.000,32.000 L2.000,32.000 C0.897,32.000 -0.000,31.103 -0.000,30.000 L-0.000,5.000 C-0.000,3.897 0.897,3.000 2.000,3.000 L10.000,3.000 L10.000,1.000 C10.000,0.448 10.448,-0.000 11.000,-0.000 C11.552,-0.000 12.000,0.448 12.000,1.000 L12.000,3.000 L20.000,3.000 L20.000,1.000 C20.000,0.448 20.448,-0.000 21.000,-0.000 C21.552,-0.000 22.000,0.448 22.000,1.000 L22.000,3.000 L30.000,3.000 C31.103,3.000 32.000,3.897 32.000,5.000 L32.000,30.000 C32.000,31.103 31.103,32.000 30.000,32.000 ZM22.000,5.000 L22.000,6.000 C22.000,6.552 21.552,7.000 21.000,7.000 C20.448,7.000 20.000,6.552 20.000,6.000 L20.000,5.000 L12.000,5.000 L12.000,6.000 C12.000,6.552 11.552,7.000 11.000,7.000 C10.448,7.000 10.000,6.552 10.000,6.000 L10.000,5.000 L2.000,5.000 L2.000,30.000 L29.997,30.000 L30.000,5.000 L22.000,5.000 ZM25.000,24.000 L23.000,24.000 C22.448,24.000 22.000,23.552 22.000,23.000 L22.000,21.000 C22.000,20.448 22.448,20.000 23.000,20.000 L25.000,20.000 C25.552,20.000 26.000,20.448 26.000,21.000 L26.000,23.000 C26.000,23.552 25.552,24.000 25.000,24.000 ZM25.000,16.000 L23.000,16.000 C22.448,16.000 22.000,15.552 22.000,15.000 L22.000,13.000 C22.000,12.448 22.448,12.000 23.000,12.000 L25.000,12.000 C25.552,12.000 26.000,12.448 26.000,13.000 L26.000,15.000 C26.000,15.552 25.552,16.000 25.000,16.000 ZM17.000,24.000 L15.000,24.000 C14.448,24.000 14.000,23.552 14.000,23.000 L14.000,21.000 C14.000,20.448 14.448,20.000 15.000,20.000 L17.000,20.000 C17.552,20.000 18.000,20.448 18.000,21.000 L18.000,23.000 C18.000,23.552 17.552,24.000 17.000,24.000 ZM17.000,16.000 L15.000,16.000 C14.448,16.000 14.000,15.552 14.000,15.000 L14.000,13.000 C14.000,12.448 14.448,12.000 15.000,12.000 L17.000,12.000 C17.552,12.000 18.000,12.448 18.000,13.000 L18.000,15.000 C18.000,15.552 17.552,16.000 17.000,16.000 ZM9.000,24.000 L7.000,24.000 C6.448,24.000 6.000,23.552 6.000,23.000 L6.000,21.000 C6.000,20.448 6.448,20.000 7.000,20.000 L9.000,20.000 C9.552,20.000 10.000,20.448 10.000,21.000 L10.000,23.000 C10.000,23.552 9.552,24.000 9.000,24.000 ZM9.000,16.000 L7.000,16.000 C6.448,16.000 6.000,15.552 6.000,15.000 L6.000,13.000 C6.000,12.448 6.448,12.000 7.000,12.000 L9.000,12.000 C9.552,12.000 10.000,12.448 10.000,13.000 L10.000,15.000 C10.000,15.552 9.552,16.000 9.000,16.000 Z"/>
                                        </svg>
                                        <h3 style="font-weight: 900;">1 day</h3>
                                    </div>
                                    <div class="container location">
                                        <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2848 18.9935C12.1567 19.0875 12.0373 19.1728 11.9282 19.2493C11.8118 19.1721 11.6827 19.0833 11.5427 18.9832C10.8826 18.5109 10.0265 17.8176 9.18338 16.9529C7.45402 15.1792 6 12.9151 6 10.5C6 7.18629 8.68629 4.5 12 4.5C15.3137 4.5 18 7.18629 18 10.5C18 12.8892 16.4819 15.1468 14.6893 16.9393C13.8196 17.8091 12.9444 18.5099 12.2848 18.9935ZM19.5 10.5C19.5 16.5 12 21 12 21C11.625 21 4.5 16.5 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5ZM13.5 10.5C13.5 11.3284 12.8284 12 12 12C11.1716 12 10.5 11.3284 10.5 10.5C10.5 9.67157 11.1716 9 12 9C12.8284 9 13.5 9.67157 13.5 10.5ZM15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z" fill="#EDF6F9"/>
                                        </svg>
                                        <h3 style="font-weight: 900;">Da Nang</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="frame-thinging">
                        <input class="thinking form-control"
                                placeholder="What's this trip about? (Optional)"/>
                    </div>
                    <div>
                        <Tag_Trip @change-tab="handleTabChange"/>
                        <component :is="currentComponent"></component>
                    </div>
                </div>
                <div class="frame-map">
                    <Map/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../Header.vue';
import Top_Button from '../Top_Button.vue';
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Tag_Trip from './Tag_Trip.vue';
import DetailTripViewModel from '@/components/viewModels/Trip/detailTrip_Viewmodel';
import Saved_List from './Saved/Saved_List.vue';
import Itinerary_List from './Itinerary/Itinerary_List.vue';
import Map from '../Map/Map.vue';
export default {

    name: "Detail_Trip",
    components: {
        Header, Top_Button, Tag_Trip, Saved_List, 
        Itinerary_List, Map
    },
    data() {
        return {
            viewModel: new DetailTripViewModel(), //quản lý tag_trip
            currentComponent: 'Saved_List'
        }
    },  
    methods: {
        handleTabChange(tabName) {
            console.log('Tab Name:', tabName);
            this.viewModel.changeTab(tabName); // Thay đổi tab mà không duyệt danh sách
            this.currentComponent = this.viewModel.getCurrentComponent(); // Cập nhật component hiển thị
            console.log('Current Component:', this.currentComponent);
        },
    },
}
</script>

<style scoped>
.frame-overall {
    display: grid;
    grid-template-columns: 5% 90% 5%;
}
.overall {
    grid-column: 2/3;
}
.frame {
    margin-top: 13vw;
    display: grid;
    grid-template-columns: 60% 38.6%;
    gap: .5%;
}
.frame-image{
    display: flex;
    flex-direction: column;
    gap:20px
}
.image {
    height: 500px;
}
.img-container {
    position: relative;
    width: 100%;
    height: 100%;
}
.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.overlay {
    position: absolute; /* Đặt overlay ở trên ảnh */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(237, 246, 249, 0.20) 45%, rgba(33, 37, 41, 0.55) 63%);
    border-radius: 20px;
    pointer-events: none; /* Cho phép tương tác với ảnh bên dưới */
}
.info-trip {
    color: #EDF6F9;
    opacity: 0.99;
    margin-top: -170px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.date-location{
    display: flex;
}
.length, .location {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    color: #EDF6F9;
    margin-left: -20px;
}
.thinking {
    border: none;
    padding: 25px;
    border-radius: 20px;
    background-color: #EDF6F9;
    color: #13357B;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.thinking::placeholder {
    color: #13357B;
    opacity: 0.8;
}
.thinking:focus {
    outline: none;
    border: 1px solid #13357B;
    background-color: #CAF0F8;
}
.frame-map {
    border-radius: 15px;
    background-color: #EDF6F9;
    color: #13357B;
    border-radius: 20px;
    padding: 10px;
    height: fit-content;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);    
    font-size: 50px;
    position: sticky;
    top: 170px;
}
</style>
