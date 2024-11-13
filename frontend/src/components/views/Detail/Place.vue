<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div> 

    <div class="container-fluid info-place">
        <div class="container-fluid row">
            <div class="col-4 information">
                <div class="container name-of-place">Văn Miếu Quốc Tử Giám</div>
                <div class="container rating-review">
                    <div class="rating">
                        <div v-for="(circle, index) in circles" :key="index" class="circle">
                            <img :src="circle" alt="Circle" /> 
                        </div>
                    </div>
                    <div class="reviews">
                        {{ totalRating }} Reviews
                    </div>
                </div>
                
                <div class="container-fluid info-about">
                    <div class="row context">
                        <h1 class="">About</h1>
                        
                        <p>{{ truncatedDescription}}</p>
                        
                        <button class="read-more-or-less" @click="toggleReadMore">{{ isReadMore ? 'Read less' : 'Read more' }}</button>
                        
                        <div class="duration">
                            <div class="svg">
                                <svg fill="#13357B" width="25px" height="25px" viewBox="0 0 24 24" id="Outline" xmlns="http://www.w3.org/2000/svg"><title>194 restore</title>
                                    <path d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z
                                    M23.812,10.132A12,12,0,0,0,3.578,3.415V1a1,1,0,0,0-2,0V5a2,2,0,0,0,2,2h4a1,1,0,0,0,0-2H4.827a9.99,9.99,0,1,1-2.835,7.878A.982.982,0,0,0,1,12a1.007,1.007,0,0,0-1,1.1,12,12,0,1,0,23.808-2.969Z"/>
                                </svg>
                            </div>
                            <div class="duration-info">
                                Duration: 5 days
                            </div>
                        </div>

                        <div class="container-fluid line-divide"></div>

                        <div class="container-fluid price" style="font-size: 25px;">
                            <p style="font-weight: 700;">Price from: <span style="font-weight: 700;"> $30.00 </span> </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-3 carousel">
                <div class="container carousel-container">
                    <Carousel :currentImage="currentImage" :images="images_1"/>
                </div>
            </div>  
        </div>
        <div class="container-fluid contribute">
            <Contribute :rating="rating"
                        :circles="circles"
                        :ratings="ratings"
                        :commentList="commentList"
                        :stars = "generateCircle()"/>
        </div>
    </div>


</template>

<script setup>
import { circles,rating, ratings, commentList, 
  generateCircle, images, images_1, currentImage, nextImage, 
  prevImage,totalRating, isDropdownVisible, 
  toggleDropdown, isMenuVisible, toggleMenu, 
  truncatedDescription, toggleReadMore, 
  isReadMore,
} from '../../viewModels/detailLocation_AttractionViewModel.js';

</script>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Top_Button from '../Top_Button.vue';
import Header from '../Header.vue';
import Carousel from '../Carousel.vue';
import Contribute from '../Contribute.vue';
export default {
    name: "Place",
    components: {
        Header, Scroll_Bar_Component, Top_Button, Carousel,
        Contribute,
    }
}

</script>

<style scoped>
.information{
    margin-top: 200px;
    color: #13357B;
}
.name-of-place{
    font-size: 35px;
    font-weight: 900;
}
.rating-review{
    display: flex;
    gap: 20px;
    justify-content: left;
    align-items: baseline;
    margin: 20px 0;
}
.rating {
    display: flex;
    gap: 3px;
}
.rating img{
    width: 20px;
    height: 20px;
}
.info-about{
    margin-top: 50px;
    margin-left: 10px;
    font-size: 17px;
    text-align: justify;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(19,53,123,0.25);
}
.context{
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.context h1{
    font-weight: 900
}
.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 700;
    appearance: none;
    margin: 15px 0 0 5px;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
    text-align: left;
}
.read-more-or-less:hover{
    color: #729AE9;
}
.carousel-container{
    display: flex;
    transform: scale(0.62);
    height: 1015px;
}
.duration{
    display: flex;
    align-items: center;
    gap: 20px;
}
.line-divide{
    width: 95%;
    height: 3px;
    border-radius: 5px;
    background-color: #13357B;
}
</style>

