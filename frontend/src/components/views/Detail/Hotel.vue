<template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div> 

    <div class="container-fluid info-place">
        <div class="container-fluid row">
            <div class="col-10 information">
                <div class="container name-of-place">Vinpearl Resort Nha Trang</div>
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
                <button class="write-review">Write review </button>
            </div>
        </div>
        
        <div class="row">
            <Carousel :currentImage="currentImage" :images="images_1"/>
        </div>
        
        <div class="container-fluid location">
            <div class="container-fluid">
                <div class="container-fluid">
                    <div class="container-fluid">
                        <div class="row info-hotel">
                            <div class="col-3 contact">
                                <div class="row">
                                    <div class="map"><p>Map</p></div>
                                    <div class="container frame location">
                                        <i class="icon-location"></i>
                                        <p>18 Phan Boi Chau Street, Hoan Kiem Dist, Hanoi</p>
                                    </div>
                                    <div class="container frame phone">
                                        <i class="icon-phone"></i>
                                        <p>+84 90 324 69 63</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col details">
                                <div class="hotel-detail p-4">
                                    <h3 class="section-title" style="font-weight: 900;">Details</h3>

                                    <div class="details-grid">
                                        <div class="detail-item">
                                            <h5>PRICE RANGE</h5>
                                            <p>500.000 VNĐ ~ 30.000.000 VNĐ</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>HOTEL SERVICES & FACILITIES </h5>
                                            <p>Facilities include multiple outdoor pools, a luxurious spa, fully equipped gym, restaurants, and bars</p>
                                            <p>Additional services: Airport shuttle, car rental, guided tours, and laundry services.</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>HOTEL POLICIES</h5>
                                            <p>Check-in/check-out: Typically, check-in is at 2:00 PM and check-out is by 12:00 PM</p>
                                            <p>Cancellation policies vary depending on booking platforms. Children policies allow free stays for kids under certain ages, while pets are usually not allowed</p>
                                        </div>
                                        <div class="detail-item">
                                            <h5>ROOM TYPES AND CAPACITY</h5>
                                            <p>Available room types include single rooms, double rooms, family rooms, and suites</p>
                                            <p>Capacity: Some suites and villas can accommodate families, offering extra beds or cribs upon request</p>
                                        </div>
                                    </div>
                                    <div class="detail-item full-width">
                                        <h5>ROOM AMENITIES</h5>
                                        <p>Standard amenities include air conditioning, flat-screen TV, minibar, safety deposit box, private bathroom with toiletries, and free high-speed internet</p>
                                        <p>Additional services: Daily housekeeping, 24/7 room service, and turndown service for certain room types</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    name: "Hotel",
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
    color: #13357B;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.details-grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
.detail-item {
  background-color: #EDF6F9;
  padding: 25px;
  font-size: 15px;
  border-radius: 15px;
  box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.detail-item h5 {
    font-weight: 700;
    font-size: 18px;
}
.details {
    background-color: #EDF6F9;
    padding: 20px;
    color: #13357B;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.info-hotel {
    display: flex;
    gap: 20px;
}
.hotel-detail {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>

