<template>
    <div class="container-fluid cards">
        <div class="row p-2">
            <div class="col-sm-12 p-2 img-location">
                <img :src="imageUrl" alt="pic" class="img-location"/>
            </div>

            <div class="col-sm-12 p-2">
                <div class="btn-heart"> 
                    <btn_heart/>
                </div>
            </div>   
        </div>
        <div class="row name-of-location p-3">
            {{ name }}
        </div>
        <div class="row p-2">
            <div class="col-sm-4 rating">
                <img v-for="star in rating" :key="star" :src="star" alt="Circle" class="star"/>
            </div>
            <div class="col-sm-6 review-number">
                / {{ reviewNumber }} reivews
            </div>
        </div>
        <div class=" row info-location p-2">
            <div class="row tags p-2">
                <div class="col" v-for="tag in tags" :key="tag">
                    <span>{{ tag }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import btn_heart from '../views/btn_heart.vue';
export default {
    name: "Card_Item",
    components: {
        btn_heart
    },
    props: {
        imageUrl: String,
        name: String,
        rating: Number,
        reviewNumber: Number,
        tags: Array
    },
}

</script>

<style scoped>
.container-fluid{
    display: grid;
    color: #13357B;
    height: 100%;
}

img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 20px;
}
.btn-heart{
    text-align: right;
    margin: -350px 15px 0 0px;
}
.rating{
    display: flex;
    margin: 0 0 0 -5px;
    gap:3px;
    align-items: center;
}
.rating img {
    width: 20px;
    height: 20px;
}
.name-of-location{
    font-weight: 900;
    font-size: 20px;
}
.tags{
    margin-bottom: 15px;
}
.cards{
    border-radius: 30px;
}
.cards:hover{
    cursor: pointer;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    transition: 0.75s ease-in-out;
    border-radius: 30px;
}
.tags span{
    font-size: 20px;
}
</style>