<template>
    <div class="header-container">
        <Header/>
        <Top_Button/>
    </div>

    <div class="container-fluid-carousel">
        <div class="carousel-header">
            <!-- Carousel -->
            <div id="carouselId" class="carousel slide" data-bs-ride="carousel">

            <!-- Indicators/dots -->
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselId" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#carouselId" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#carouselId" data-bs-slide-to="2"></button>
            </div>

            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div v-for="(image, index) in images" 
                    :key="image.id" 
                    :class="['carousel-item', { active: index === 0 }]">
                    <img :src="currentImage" :alt="`City ${image.id}`" class="img-fluid">
                </div>
            </div>

            <!-- Left and right controls/icons -->
            <button  @click="prevImage" class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                <span class="carousel-control-prev-icon btn"></span>
            </button>
            <button @click="nextImage" class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                <span class="carousel-control-next-icon btn"></span>
            </button>
            </div>
        </div>
    </div>

    <div class="save">
        <Btn_Save/>
    </div>
    <!-- Discover Info -->
    <div class="container-fluid">
        <div class="row p-5 info-destination">
            <div class="col">
                <p class="title">Discover</p> 
                <!-- Name of Destination -->
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-11 name-of-desstination">Ha Noi</div>
                </div>
                <!-- Description -->
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-11">
                        <p class="description">
                            {{  truncatedDescription }}
                        </p>
                    </div>
                </div>
                <!-- Read More/ Read Less -->
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-11">
                        <button class="read-more-or-less" @click="toggleReadMore">{{ isReadMore ? 'Read less' : 'Read more' }}</button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <!-- Catagory -->
    <div class="container-fluid">
        <div class="row p-5 catagory">
            <div class="col">
                <div class="row"><p class="characteristic">Characteristic of Ha Noi</p></div>
                <div class="row"><p class="title-catagory">Select a category to filter suggestion</p></div>
            </div>
        </div>
    </div>
    <!-- btn catagory & content -->
    <div class="container-fluid content">
        <div class="row btn-catagory">
            <div class="col">
                <Btn_Catagory/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 things-to-do">
                Things to do
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in entertainments"
                        :key="index"
                        :imageUrl="getImageUrl(item.imageUrl)"
                        :name="item.name"
                        :rating="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 restaurants">
                Restaurants
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in entertainments"
                        :key="index"
                        :imageUrl="getImageUrl(item.imageUrl)"
                        :name="item.name"
                        :rating="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 restaurants">
                Resort & Hotels
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in entertainments"
                        :key="index"
                        :imageUrl="getImageUrl(item.imageUrl)"
                        :name="item.name"
                        :rating="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import destinationViewModel from '../../viewModels/destinationViewModel.js';

    const {
        images, isMenuVisible, toggleMenu, currentImage, nextImage, prevImage,
        isHeartFilled, toggleHeart, heartFull, heartEmpty,
        truncatedDescription, toggleReadMore, isReadMore,
        buttons, selectedIndices, selectButton,
        entertainments, generateStars,
        getImageUrl, liked, toggleLikeStatus,
        
    } = destinationViewModel();
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue'; 
    import Top_Button from '../Top_Button.vue';
    import Btn_Save from './Btn_Save.vue';
    import Btn_Catagory from './Btn_Catagory.vue';
    import Cards from './Cards.vue';
    export default {
        name: "Destination_View",
        components: {
            Header, Scroll_Bar_Component, Top_Button,
            Btn_Save, Btn_Catagory, Cards
        }
    }
</script>

<style scoped>
*,*::before,*::after{
    box-sizing: border-box;
}
body{
    background-color: #EDF6F9;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center; /* Căn giữa theo chiều dọc */
}
.header-container {
    display: flex;
    flex-direction: column; /* Sắp xếp theo chiều dọc */
    z-index: 1;
    width: 100%;
}
/*** Carousel Hero Header Start ***/
.container-fluid-carousel { 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
}
.carousel-header {
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.carousel-header .carousel-control-prev,
.carousel-header .carousel-control-next {
    background: transparent;
}
.carousel-header .carousel-control-prev .carousel-control-prev-icon {
    display: flex;
    margin-left: -148px;
    padding: 25px 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 50px;
    background-color: #13357B;
    background-size: 60% 60%;
}
.carousel-header .carousel-control-next .carousel-control-next-icon {
    display: flex;
    margin-right: -148px;
    padding: 25px 30px;
    border-top-left-radius: 50px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 0;
    background-color: #13357B;
    background-size: 50% 50%;

}
.carousel-header .carousel .carousel-indicators button{
    opacity: 0;
}
.carousel-header .carousel-inner {
    width: 1400px;
    margin: 0 auto;
    border-radius: 20px;
}
.carousel-header .carousel-inner .carousel-item {
    border-radius: 20px;
}
.carousel-header .carousel-inner .carousel-item img {
    width: 1400px;
    height: 700px;
    object-fit: cover;
    border-radius: 20px;
}
/*** Carousel Hero Header End ***/

.save{
    display: flex;
    justify-content: center;
}

.info-destination{
    display: flex;
    justify-content: center;
    color: #13357B;
}

.title{
    font-size: 30px;
    font-weight: 900;
}
.name-of-desstination{
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 10px;
}

.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    margin-left: -0.5%;
    font-size: 18px;
    font-weight: 700;
    appearance: none;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
}
.read-more-or-less:hover{
    color: #729AE9;
}
.characteristic{
    color: #13357B;
    font-size: 30px;
    font-weight: 900;
}
.title-catagory{
    color: #13357B;
    font-size: 20px;
    margin-bottom: -20px ;
}

.btn-catagory{
    margin-bottom: 30px;
}

.title-content p{
    color: #13357B;
    font-size: 25px;
    font-weight: 900;
}

.context {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>