<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button v-if="restaurant" :cityID="restaurant.address.city_id"/>
    </div> 

    <div class="container-fluid info-place" v-if="isLoading">
        <div class="container-fluid row">
            <div class="col-10 information">
                <div class="container name-of-place">{{ restaurant.name }}</div>
                <div class="container rating-review">
                    <div class="rating">
                        <div v-for="(star, index) in generateStars(restaurant.rating)" :key="index" class="circle">
                            <img :src="star" alt="Circle" /> 
                        </div>
                    </div>
                    <div class="reviews">
                        {{ restaurant.numOfReviews }} Reviews
                    </div>
                </div>
                <div>
                    <button class="write-review">Write review </button>
                    <button v-if="restaurant.user_id == user?.id" class="write-review">Update Restaurant </button>
                </div>
                
            </div>
        </div>

        
        
        <div class="row">
            <Carousel :currentImage="currentImage" :images="images"/>
        </div>
        
        <div class="container-fluid location">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid">
                        <div class="row info-restaurant">
                            <div class="col-4 contact">
                                <div class="row">
                                    <div class="map"><p>Map</p></div>
                                    <div class="container frame location">
                                        <i class="icon-location"></i>
                                        <p v-if="restaurant.address">{{ restaurant.address.street }}, {{ restaurant.address.ward }}, {{ restaurant.address.district }}, {{ city.name }}</p>
                                    </div>
                                    <div class="container frame phone">
                                        <i class="icon-phone"></i>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col details">
                                <div class="restaurant-detail p-4">
                                    <h3 class="section-title">Details</h3>

                                    <div class="details-grid">
                                        <div class="detail-item">
                                            <h5>PRICE RANGE</h5>
                                            <p>${{ restaurant.price_bottom || 0 }} - ${{ restaurant.price_top || "N/A" }}</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>SPECIAL DIETS</h5>
                                            <p>{{ restaurant.restaurant.special_diet || "N/A" }}</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>CUISINES</h5>
                                            <p>{{ restaurant.restaurant.cuisine || "N/A" }}</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>MEALS</h5>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div class="detail-item full-width">
                                        <h5>FEATURES</h5>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid contribute">
            <Contribute :rating="restaurant.rating"
                        :ratings="ratings"
                        :commentList="commentList"
                        :destination_id="restaurant.id"
                        :user="user?.id||0"
                        :description="restaurant.description"
                        :stars = "generateStars(restaurant.rating)"/>
        </div>
    </div>


</template>

<script setup>
  import { useRoute } from 'vue-router';
  import restaurantViewModel from '../../viewModels/detailLocation_RestaurantViewModel.js';
  import generateViewModel from '../../viewModels/generate_ratingViewModel';

  // Lấy thông tin từ route
  const route = useRoute();
  const restaurantID = route.params.id; // Lấy destinationID từ route params

  // Destructure các giá trị từ destinationViewModel
  const {
    commentList,
    images,
    currentImage,
    nextImage,
    prevImage,
    isDropdownVisible,
    toggleDropdown,
    isMenuVisible,
    toggleMenu,
    restaurant,
    city,
    isLoading,
    user,
  } = restaurantViewModel(restaurantID);

  const {
    circles,
    rating,
    ratings,
    generateCircle,
    generateStars,
    totalRating,
  } = generateViewModel();

  // Các hàm hoặc logic bổ sung có thể được thêm vào nếu cần
</script>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Top_Button from '../Top_Button.vue';
import Header from '../Header.vue';
import Carousel from '../Carousel.vue';
import Contribute from '../Contribute.vue';
export default {
    name: "Restaurant",
    components: {
        Header, Scroll_Bar_Component, Top_Button, Carousel,
        Contribute,
    }
}

</script>

<style scoped>
.information{
    margin-top: 200px;
    margin-bottom: -150px;
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
.write-review{
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
    z-index: 10;
    position: relative;
}
.write-review:hover{
    color: #729AE9;
}
.icon-location::before {
  content: "📍";
}
.map{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    border-radius: 15px;
    background-color: #e1e5f2;
    margin-bottom: 20px;
}
.frame{
    display: flex;
    gap:15px;
}
.icon-phone::before {
  content: "📞";
}
.contact{
    background-color: #EDF6F9;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.details-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.restaurant-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.section-title {
    color: #13357B;
    font-weight: 800;
    font-size: 25px;
    margin-bottom: 10px;
}

.detail-item h5 {
    color: #13357B;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}
.detail-item p {
    color: #13357B;
    font-size: 16px;
    margin-bottom: 10px;
}
.detail-item {
  width: calc(100%);
  background-color: #EDF6F9;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.details {
    background-color: #EDF6F9;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.info-restaurant {
    display: flex;
    gap: 20px;
}

</style>

