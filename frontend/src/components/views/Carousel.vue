<template>
    <div class="container-fluid-carousel">
        <div class="carousel-header">
            <!-- Carousel -->
            <div id="carouselId" class="carousel slide" data-bs-ride="carousel">

            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div v-for="(image, index) in images" :key="index" :class="['carousel-item', { active: index === currentIndex }]">
                    <img :src="image" :alt="`Image ${index + 1}`" class="img-fluid">
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

</template>

<script setup>

</script>

<script>
export default {
    name: "Carousel",
    props: {
        currentImage: String,
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentIndex: 0
        };
    },
    watch: {
        currentImage(newImage) {
        // Update the current index based on the new current image
        const index = this.images.indexOf(newImage);
        if (index !== -1) this.currentIndex = index;
        }
    },
}
</script>

<style scoped>
/*** Carousel Hero Header Start ***/
.container-fluid-carousel { 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}
.carousel-header {
    display: flex;
    margin-top: 200px;
    flex-direction: column;
    align-items: center;
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
    min-width: 500px;
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
</style>