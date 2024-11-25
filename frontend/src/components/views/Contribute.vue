<template>
    <div class="container-fluid">
        <div class="container-fluid titlte">
            <div class="container-fluid contribute">
                <p>Contribute</p>
            </div>
            <div class="container-fluid">
                <button class="write-review" @click="writeReview(destination_id)">Write Review</button>
                <button class="write-review" @click="uploadPicture(destination_id)">Upload Picture</button>
            </div>
        </div>

        <div class="container-fluid">
            <div class="row">
                <!-- Evaluate -->
                <div class="col-6">
                    <div class="container-fluid evaluate p-2">
                        <h1 style="font-weight: 900;">Evaluate</h1>
                    </div>
                    <div class="rating">
                        <h2>{{ rating }}</h2>
                        <div class="circle-container">
                            <div v-for="(circle, index) in circles" :key="index">
                                <img :src="circle" alt="Circle" class="circle"/>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid type-rating">
                        <div class="rating-row" 
                            v-for="(ratingInfo, label) in ratings" :key="label">
                            <div class="col rating-label">{{ label }}</div>
                            <div class="col-3 rating-bar-container">
                                <div class="rating-bar"
                                    :style="{ width: ratingInfo.percentage + '%' }">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Review -->
                <div class="col-6">
                    <div class="container-fluid search-bar-container">
                        <div class="search-bar">
                            <input type="text" class="search-input" placeholder="Search for reviews">
                            <button class="icon-search">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div v-if="commentList && commentList.length > 0" class="container-fluid comment-list">
                        <div v-for="comment in commentList" :key="comment.id" class="comment"  >
                            <A_Comment :imageUrl="comment.user?.userInfo?.image?.url || ''"
                                        :userName="comment.user?.username || 'Unknown User'"
                                        :circles= "generateCircle(comment.rating)"
                                        :title="comment.title"
                                        :date_comment="comment.date_create"
                                        :comment="comment.content"
                                        :condition="comment.images"
                                        :canedit="comment.user_id === user"
                                        :URL="comment.images"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import generateViewModel from '../viewModels/generate_ratingViewModel';
// Lấy hàm tạo vòng tròn (circle)
const { generateCircle } = generateViewModel();
import A_Comment from './A_Comment.vue';

const writeReview = (id) => {
        window.location.assign(`/Review/Write/${id}`);
    };
const uploadPicture = (id) => {
    window.location.assign(`/Review/Upload/${id}`);
};
// Khai báo các props
defineProps({

  rating: {
    type: String,
    required: true,
  },
  ratings: {
    type: Object,
    required: true,
  },
  circles: {
    type: Array,
    required: true,
  },
  commentList: {
    type: Array,
    required: true,
  },
  destination_id:{
    type: Number,
    required: true,
  },
  user:{
    type: Number,
    required: true,
  },
  
});
</script>

<style scoped>
.titlte{
    display: flex;
    flex-direction: column;
    gap: 30px;
}
.contribute p{
    font-size: 40px;
    font-weight: 900;
}
.container-fluid{
    color: #13357B;
}
.write-review{
    font-size: 20px;
    font-weight: bold;
    color: #13357B;
    background-color: transparent;
    border: 2px solid #13357B;
    border-radius: 40px;
    padding: 15px 80px;
    transition: all 0.5 ease-in-out;
}
.write-review:hover{
    background-color: #bde0fe;
    color: #13357B;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    transform: translateY(-3px);
    transition: 0.25 ease-in-out;
}
.evaluate{
    margin-top: 50px;
}
.rating{
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 10px;
}
.rating h1{
    font-size: 30px;
    font-weight: bold;
}
.circle-container{
    display: flex;
    gap: 3px;
    margin-bottom: 10px;
}
.circle-container img{
    width: 20px;
    height: 20px;
}
.type-rating{
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    gap: 15px;
    font-size: 25px;
}
.rating-row{
    display: flex;
    align-items: center;
}
.rating-label{
    font-weight: 800;
}
.rating-bar-container {
  width: 60%; 
  height: 20px; 
  background-color: #CAF0F8; 
  position: relative;
  border-radius: 10px; 
}
.rating-bar {
  height: 100%; 
  background-color: #13357B; 
  border-radius: 10px; 
  transition: width 0.3s ease; 
}
.search-bar{
    width: 100%;
    display: flex;
    align-items: center;
}
.search-bar input{
    width: 100%;
    padding: 10px 25px;
    border-radius: 25px;
    border: 2px solid #13357B;
    outline: none;
    color: #13357B
}
input::placeholder{
    color: #0077b6;
}
input:focus{
    background-color: #caf0f8;
    box-shadow: 0px 5px 3px rgba(19, 53, 123, 0.25)
}
.icon-search{
    border:none;
    background-color: transparent;
    margin-left: -55px;
}
.icon-search svg{
    stroke: #13357B;
}
.icon-search:hover svg{
    stroke: #0077b6;
}
.comment-list{
    margin-top: 50px;
}
</style>