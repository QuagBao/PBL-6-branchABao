<template>
    <div class="cards">
        <div class="">
            <div class="img-location">
                <img src="@/assets/images/tms-hotel-da-nang-beach.jpg" alt="pic" class="img-location"/>
            </div>
            <div class="p-2">
                <div class="btn-heart"> 
                    <btn_heart/>
                </div>
            </div>   
        </div>
        <div class="frame-rating">
            <div class="rating">
                <img src="@/assets/svg/star_full.svg" alt="">
                <img src="@/assets/svg/star_full.svg" alt="">
                <img src="@/assets/svg/star_full.svg" alt="">
                <img src="@/assets/svg/star_full.svg" alt="">
                <img src="@/assets/svg/star_full.svg" alt="">
            </div>
            <p class="review-number">/ {{ reviewNumber }} reivews</p>
        </div>
        <div class="info-location">
            <div class="description">
                <span>Depends on the weather or construction, we will inform for you that stopping here or not. Hai Van pass Vietnam is recognized as one of the world's top ten most beautiful coastal roads. This pass is not only connected with numerous historical events, but it is also a wonderful place for many travelers due to its spectacular and artistic beauty that captivates everyone’s heart. The...</span>
            </div>
        </div>
    </div>
</template>

<script>

import btn_heart from '../../../views/btn_heart.vue';
export default {
    name: "Info_Card",
    components: {
        btn_heart
    },
    props: {
        imageUrl: String,
        rating: Number,
        reviewNumber: Number,
        description: String
    },
}

</script>

<style scoped>
img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 20px;
}
.btn-heart{
    text-align: right;
    margin: -350px 3px 0 0px;
}
.frame-rating{
    display: flex;
}
.rating img {
    width: 20px;
    height: 20px;
}
.review-number {
    margin-top: 2px;
}
.cards{
    width: 90%;
    margin: 20px 0;
}
</style>