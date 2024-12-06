<template>
    <div class="container-fluid top">
        <Header/>
        <Top_Button/>
    </div>  

    <div class="container-fluid row select-topic">
        <div class="container col-3 frame-select-location">
            <button class="dropdown-button" 
                    :class="{ 'active': dropdownVisible }" 
                    @click="toggleDropdown">
                {{ selectedRegion }}
                <span class="arrow" :class="{ 'up': dropdownVisible }">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>

            <!-- Dropdown danh sách các lựa chọn -->
            <div class="dropdown-list" v-if="dropdownVisible">
                <button class="dropdown-item" v-for="region in regions" 
                        :key="region" @click="selectRegion(region)">
                    {{ region }}
                </button>
            </div>
        </div>

        <div class="container-fluid col frame-select-topic">
            <Button_Topic :entertainments="entertainments"/>
        </div> 
    </div>

    <div class="container-fluid content"
        v-for="(item, index) in entertainments" :key="index">
        <div class="container"
            v-if="index === 0">
            <Topic_Item_1 :imageUrl="getImageUrl(item.imageUrl)"
                          :index="index+1"
                          :name="item.name"
                          :location="item.location"
                          :stars="generateStars(item.rating)"
                          :reviewNumber="item.reviewNumber"
                          :description="truncatedDescription(item.description)"
                          :tags="item.tag"
                          :price="item.price"/>
        </div>
        <div v-else class="container">
            <Topic_Item_2 :imageUrl="getImageUrl(item.imageUrl)"
                          :index="index+1"
                          :name="item.name"
                          :location="item.location"
                          :stars="generateStars(item.rating)"
                          :reviewNumber="item.reviewNumber"
                          :description="truncatedDescription(item.description)"
                          :tags="item.tag"
                          :price="item.price"/>
        </div>
    </div>

</template>

<script setup>
import destinationViewModel from '../../viewModels/Topic_ListViewModel';

const {
    isMenuVisible, toggleMenu,
    buttons, visibleButtons, prevButton, nextButton,
    selectedIndex, selectButton, currentIndexButton,
    entertainments,
    generateStars, getImageUrl,
    liked, toggleLikeStatus,
    heartFull: heartFull,
    heartEmpty: heartEmpty,

    // Các biến và hàm cho chức năng chọn tỉnh thành
    regions, // Danh sách tỉnh thành
    selectedRegion, // Tỉnh thành hiện tại
    dropdownVisible, // Trạng thái dropdown
    toggleDropdown, // Hàm bật/tắt dropdown
    selectRegion, // Hàm chọn tỉnh thành

    truncatedDescription,
} = destinationViewModel();


</script>

<script>
import Header from '../../views/Header.vue';
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Top_Button from '../Top_Button.vue';
import Button_Topic from './Button_Topic.vue';
import Topic_Item_1 from './Topic_Item_1.vue';
import Topic_Item_2 from './Topic_Item_2.vue';
export default {
    name: "Topic_List",
    components: {
        Header, Scroll_Bar_Component, Top_Button, Button_Topic,
        Topic_Item_1,
    }
}
</script>

<style>
.select-topic{
    display: flex;
    margin-top: 250px;
}
.frame-select-location{
    margin-left: 25px;
    border-right: #13357B solid 2px;
}
.dropdown-button{
    min-width: 300px;
    padding: 10px;
    border-radius: 30px;
    border: none;
    margin: 20px 0;
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    color: #13357B;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    gap: 20px;
}
.dropdown-button svg {
    stroke: #13357B;
}
.dropdown-button.active {
    background-color: #13357B;
    color: #EDF6F9;
}
.dropdown-button.active svg {
    stroke: #EDF6F9;
    transform: rotate(180deg);
}
.dropdown-list {
    position: absolute;
    margin-top: 10px;
    min-width: 300px;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #EDF6F9;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    z-index: 5;
    overflow-y: auto;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.dropdown-item {    
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.dropdown-item:hover {
    background-color: #13357B;
    color: #EDF6F9;
}
.frame-select-topic{
    margin-left: 25px;
    width: 70%;
}
.content{
    margin-bottom: 50px
}
</style>