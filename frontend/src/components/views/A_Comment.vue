<template>
    <div class="container-fluid">
        <div class="container row info ">
            <div class="col-1">
                <img :src="imageUrl" alt="User Image" class="user-image" />
            </div>
            
            <div class="col-6">
                <div class="container">
                    <div class="comment-content">
                        <h3>{{ userName }}</h3>
                    </div>
                    <div class="col rating-stars">
                        <img v-for="circle in circles" :src="circle" :key="circle" class="circle-icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="container content-comment">
            <h4 class="title">{{ title }}</h4>
            <p>{{ date_comment }}</p>
            <h6>{{ comment }}</h6>
        </div>
        <div class="container img">
            <img v-if="condition" :src="URL" alt="Review Image" class="review-image" />
        </div>
    </div>

    <div class="container-fluid line"></div>
</template>

<script>
export default {
    name: "A_Comment",
    props: {
        imageUrl: String,
        userName: String,
        circles: Array,
        title: String,
        date_comment: String,
        comment: String,
        condition: String,
        URL: String
    }
}
</script>

<style>
.info{
    display: flex;
    align-items: center;
}
.user-image{
    width: 40px;
    height: 40px;
}
.rating-stars{
    display: flex;
    gap: 3px;
}
.circle-icon{
    width: 20px;
    height: 20px;
}
.content-comment{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.review-image{
    margin-top: 20px;
    width: 250px;
    border-radius: 15px;
    margin-bottom: 20px;
}
.review-image:hover{
    cursor: pointer;
    transform: scale(1.2);
    max-width: 120%;
}
.line{
    margin: 20px 0 ;
    height: 2px;
    background-color: #13357B;
    border-radius: 5px;
}
</style>