<template>
    <div class="container-fluid">
        <!-- Info User Post like username activity, date post, avatar -->
        <div class="user-info">
            <div class="avatar">
                <img src="@/assets/images/ava.png" alt="Avatar" class="ava"/>
            </div>
            <div class="activity">
                <p>Tran Minh Nhat</p>
                <span>wrote a review</span>
            </div>
            <div class="date-post">
                Sep 2024
            </div>
        </div>

        <!-- Rating If is a review-->
        <div class="rating">
            <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
            <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
            <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
            <img src="@/assets/svg/circle-half.svg" alt="Circle" class="circle"/>
            <img src="@/assets/svg/circle-none.svg" alt="Circle" class="circle"/>
        </div>

        <!-- Title and Context Review -->
        <div class="title-content">
            <div class="title">
                <button class="title-text">
                    Clean, comfortable and spacious
                </button>
            </div>
            
            <div class="context">
                <p class="text-break">
                    We recently had a very nice three-night stay at Fraser Residence Hanoi in a 
                    spacious two-bedroom, two-bathroom apartment. The hotel and room are very modern 
                    and meticulously clean and spacious. You always felt like you were in a luxury hotel 
                    no matter where you went...
                </p>
            </div>
        </div>

        <button class="read-more">
            Read more
        </button>
        <div class="info-location">
            <tag_location_review/>
        </div>
    </div>
</template>

<script>
import tag_location_review from './tag_location_review.vue';
export default {
    name: "Content_Review",
    components: {
        tag_location_review
    }

}
</script>

<style scoped>
.container-fluid{
    display: grid;
    gap: 10px;
    width: 90%;
    height: 100%;
    border-radius: 15px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.3);
    z-index: 2;
}

.user-info{
    width: 100%;
    height: 100%;
    display: grid;
    gap: 10px;
    align-items: center;
    color: #13357B;
    z-index: 5;
}

.user-info .avatar{
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-top:10px;
    z-index: 5;
}

.user-info .avatar img{
    width: 60px;
    height: 60px;
    z-index: 5;
}
.activity{
    display: flex;
    align-items: center;
    width: 100%;   
    gap:10px;
    margin-top: -70px;
}
.user-info .activity p{
    font-weight: 700;
    margin: -40px 0 0 100px;
}
.user-info .activity span{
    margin: -40px 0 0 10px;
}

.user-info .date-post{
    margin: -60px 0 0 100px;
}
.rating{
    display: flex;
    margin: 0px 0 0 10px;
}

.rating img{
    width: 20px;
    height: 20px;
    margin-right: 2px;
}

.title-content{
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    color:#13357B;
}

.title-content .title{
    margin-left: -5px;
    margin-top: 15px;
    margin-bottom: 15px;
}
.title-content .title button{
    color: #13357B;
    background: none;
    border: none;
}
.title-content .title button:hover{
    color: #00B4D8;
}
.title-content .title .title-text{
    font-size: 20px;
    font-weight: 700;
    text-decoration: underline;
}
.title-content .context{
    margin-bottom: 20px;
}
.read-more{
    text-align: left;
    margin-bottom: 10px;
    margin-top: -20px;
    color: #13357B;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 700;
    text-decoration: underline;
}
.read-more:hover{
    color: #00B4D8;
}
.info-location{
    width: 100%;
    margin: 15px 0 15px 10px;
}
</style>