<template>
    <div class="container-fluid">
        <Header></Header>
    </div>

    <Carousel_For_Dashboard/>
    
    <div class="container-fluid search-btn">
        <Search_Btn_Big/>
    </div>

    <div class="container-fluid frame destination">
        <div class="container">
            <div class="mx-auto text-center mb-5 title">
                <h5 class="section-title px-3 ">Destination</h5>
                <h1 class="mb-0">Popular Destination</h1>
            </div>
            <div class="container-fluid control-button">
                <Control_Button/>
            </div>
        </div>

        <div class="container tag">
            <div class="container tag-button">
                <Tag_Button/>
            </div>
        </div>        
        <div class="container-fluid list-items">
            <div class="item" v-for="(city, index) in visibleCities" 
                :key="city.id">
                <Img_Card_2  :condition="city.images && city.images.length > 0" 
                            :imageUrl = 'city.images[0]'
                            :name_picture="city.name"
                            :name="city.name"
                            @click="navigateToDestination(goToDestination(city.id))"/>
            </div>
        </div>
    </div>

    <div class="container-fluid frame topic">
        <div class="container">
            <div class="mx-auto text-center mb-5 title">
                <h5 class="section-title px-3 ">WANNA TRY ?</h5>
                <h1 class="mb-0">Awesome Topic</h1>
            </div>
        </div>

        <div class="container-fluid list-items">
            <div class="item" v-for="(topic, index) in topics" 
                :key="topic.id">
                <Img_Card  :condition="topic.imageUrl"
                            :imageUrl = 'topic.imageUrl'
                            :name_picture="topic.name"
                            :name="topic.name"/>
            </div>
        </div>
    </div>

    <div class="container-fluid frame tour">
        <div class="container" style="z-index: 10;">
            <div class="mx-auto text-center mb-5 title">
                <h5 class="section-title px-3 ">Tour proposal</h5>
                <h1 class="mb-0">Awesome Tour</h1>
            </div>
        </div>

        <div class="container-fluid list-tour">
            <Swiper_Tour/>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import dashboardViewModel from '../../viewModels/dashboardViewModel.js';

// Sử dụng useRouter để lấy đối tượng router trong component
const router = useRouter();

const {
  activeButton, setActive,
  cities, visibleCities, prevSlide, nextSlide,
  topics, visibleTopics, prevTopic, nextTopic,
  tours, visibleToblurs, prevTour, nextTour,
  isMenuVisible, toggleMenu,
  generateStars, goToDestination, // vẫn import để lấy id
} = dashboardViewModel;

const navigateToDestination = (id) => {
  window.location.assign(`/Destination/${id}`);
};
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Search_Btn_Big from '../Search_Btn_Big.vue';
    import Tag_Button from './Tag_Button.vue';
    import Control_Button from './Control_Button.vue';
    import Carousel_For_Dashboard from './Carousel_For_Dashboard.vue';
    import Img_Card from '../Img_Card.vue';
    import Img_Card_2 from '../Img_Card_2.vue';
    import Swiper_Tour from './Swiper_Tour.vue';
    export default {
        name: "Dashboard",
        components: {
            Header, Scroll_Bar_Component, Search_Btn_Big, Tag_Button,
            Control_Button, Carousel_For_Dashboard, Img_Card,
            Img_Card_2, Swiper_Tour
        }
    }

</script>

<style scoped>
.container-fluid {
    margin: 0 auto;
    padding: 0;
    max-width: 100%; /* Đảm bảo kích thước không thay đổi */
}
.search-btn {
    margin-top: -65px;
    margin-bottom: 100px;
    width: 95%;
}

.section-title {
    position: relative;
    display: inline-block;
    gap: 50px;
    color: #13357B;
    text-transform: uppercase;  
    font-weight: 700;
}
.section-title::before {
    position: absolute;
    content: "";
    width: 100px;
    top: 50%;
    left: 0;
    border-radius: 5px;
    transform: translateY(-50%); 
    margin-left: 350px;   
    border: 2px solid #13357B;
}
.section-title::after{
    position: absolute;
    content: "";
    width: 100px;
    top: 50%;
    right: 0;
    border-radius: 5px;
    transform: translateY(-50%); 
    margin-right: 350px;   
    border: 2px solid #13357B;
}
.title {
    color: #13357B;
    display: flex;
    flex-direction: column;
    gap: 25px;
}
h4{
    font-size: calc(1.275rem + 0.3vw);
    font-weight: bold;
    line-height: 2;    
    text-transform: uppercase !important;
    font-weight: 700;
}
h1 {
    display: block;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    font-weight: bold;
    unicode-bidi: isolate;
}
.tag {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    color: #13357B;
}
.control-button {
    position: relative;
    align-items: center;
    justify-content: center;
    top: -45px;
    z-index: 1;
    flex: 1;
}
.tag-button {
    position: relative;

    flex: 1;
    z-index: 10;
}
.frame{
    margin-top: 100px;
}
.list-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>