<template>
    <div class="header-container">
        <Header/>
        <Top_Button v-if="cityDetails && cityDetails.name" :name="cityDetails.name"/>
    </div>

    <!-- Carousel -->
    <Carousel :currentImage="currentImage" :images="imageList"/>

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
                    <div class="col-11 name-of-desstination">{{ cityDetails?.name }}</div>
                </div>
                <!-- Description -->
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-11">
                        <p class="description">
                            {{ isReadMore ? fullDescription : getTruncatedDescription }}
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
                <div class="row"><p class="characteristic">Characteristic of {{ cityDetails?.name }}</p></div>
                <div class="row"><p class="title-catagory">Select a category to filter suggestion</p></div>
            </div>
        </div>
    </div>
    <!-- btn catagory & content -->
    <div class="container-fluid content">
        <div class="container btn-catagory">
            <Btn_Catagory/>
        </div>

        <div class="row title-content">
            <p class="p-5 things-to-do">
                Things to do
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in destinations"
                        :key="index"
                        :imageUrl="item.images[0]?.url"
                        :name="item.name"
                        :rating="item.rating"
                        :stars="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 restaurants">
                Restaurants
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in restaurants"
                        :key="index"
                        :imageUrl="item.images[0]?.url"
                        :name="item.name"
                        :rating="item.rating"
                        :stars="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 restaurants">
                Resort & Hotels
            </p>
            <div class="container-fluid context">
                <Cards v-for="(item, index) in hotels"
                        :key="index"
                        :imageUrl="item.images[0]?.url"
                        :name="item.name"
                        :rating="item.rating"
                        :stars="generateStars(item.rating)"
                        :tags="item.tag"/>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import destinationViewModel from '../../viewModels/destinationViewModel.js';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const cityId = route.params.id; // Lấy cityId từ route params

    const {
        isMenuVisible, toggleMenu,
        currentImage, nextImage, prevImage, images, imageList,
        isHeartFilled, heartFull, heartEmpty, toggleHeart,
        getTruncatedDescription, toggleReadMore, isReadMore, fullDescription,
        buttons, selectedIndices, selectButton,
        generateStars, getImageUrl,
        liked, toggleLikeStatus,
        cityDetails, destinations, hotels,
        isLoading, restaurants
    } = destinationViewModel(cityId);
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue'; 
    import Top_Button from '../Top_Button.vue';
    import Btn_Save from './Btn_Save.vue';
    import Btn_Catagory from './Btn_Catagory.vue';
    import Cards from './Cards.vue';
    import Carousel from '../Carousel.vue';
    export default {
        name: "Destination_View",
        components: {
            Header, Scroll_Bar_Component, Top_Button,
            Btn_Save, Btn_Catagory, Cards, Carousel,
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
    gap:15px;
}
</style>