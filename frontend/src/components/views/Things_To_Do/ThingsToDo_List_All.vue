 <template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div>

    <div class="container-fluid">
        <div class="container-fluid">
            <div class="container-fluid frame-overall">
                <div class="container-fluid overall">
                    <!-- Images -->
                    <div class="container-fluid frame-base-image">
                        <img src="@/assets/images/thingstodo_2.avif" alt="City 1" class="img-fluid">
                        <!-- Search -->
                        <div class="container-fluid search">
                            <div class="container">
                                <Form_Search    :name_of_page="'Find Things to Do anywhere in Viet Nam'"
                                                :name="'Attraction, activities or destination'"/>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid content d-flex gap-5">
                        <div class="title-content d-flex flex-column gap-4">
                            <p class="top-destinations">
                                Top destinations in Viet Nam
                            </p>
                            <div class="container-fluid context list-items">
                                <button @click="prevCity" class="carousel-control-prev" type="button">
                                    <span class="carousel-control-prev-icon"></span>
                                </button>

                                <Img_Card v-for="(city, index) in visibleCities"
                                    :key="index"
                                    :imageUrl="city.images[0]"
                                    :name="city.name"
                                    @click="navigateToThingsCity(city.id)"/>

                                <button @click="nextCity" class="carousel-control-next" type="button">
                                    <span class="carousel-control-next-icon"></span>
                                </button>
                            </div>
                        </div>

                        <div class="title-content d-flex flex-column gap-4">
                            <p class="top-attractions">
                                Top attractions in Viet Nam
                            </p>
                            <div class="container-fluid context list-items-1">
                                <Card_Item v-for="(item, index) in attractions"
                                        :key="index"
                                        :destID="item.id"
                                        :imageUrl="item.images[0]?.url|| '/blue-image.jpg'"
                                        :name="item.name"
                                        :rating="generateStars(item.rating)"q
                                        :review-number="item.numOfReviews"
                                        :tags="item.tag"
                                        @click="navigateToDetailPlace(item.id)"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
 </template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../../viewModels/ThingToDo_ListViewModel';
import generateViewModel from '../../viewModels/generate_ratingViewModel';

const {
    isMenuVisible, toggleMenu,
    getImageUrl,
    liked, toggleLikeStatus,
    heartFull: heartFull, heartEmpty: heartEmpty,
    searchQuery,
    cities, visibleCities, prevCity, nextCity,
    attractions, visibleAttraction, prevAttraction, nextAttraction,
} = destinationViewModel();

const {
    circles,
    rating,
    ratings,
    generateCircle,
    generateStars,
    totalRating,
  } = generateViewModel();

const navigateToDetailPlace = (id) => {
    window.location.assign(`/Detail/Place/${id}`);
};
const navigateToThingsCity = (id) => {
    window.location.assign(`/ThingsToDo/${id}`);
};
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Top_Button from '../Top_Button.vue';
    import Form_Search from '../Form_Search.vue';
    import Img_Card from '../Img_Card.vue';
    import Card_Item from '../Card_Item.vue';
    export default {
        name: "ThingsToDo_List",
        components: {
            Header, Scroll_Bar_Component, Top_Button, Form_Search,
            Img_Card, Card_Item,
        }
    }
</script>

<style scoped>
.frame-overall {
    display: grid;
    grid-template-columns: 5% 90% 5%;
}
.overall {
    grid-column: 2/3;
}
.img-fluid {
    margin-top: 150px;
    width: 100vw;
    height: 600px;
    border-radius: 20px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.search{
    margin-top: -25%;
    margin-bottom: 15%;
}
.content{
    display: flex;
    flex-direction: column;
    color: #13357B;
    font-size: 28px;
    margin-top: 15px;
}
.content p{
    font-weight: 900;
    margin-top: 15px; 
}
.list-items {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}
.list-items-1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    align-items: center;
    width: 100%;
    height: 100%;
}
.carousel-control-prev,
.carousel-control-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background-color: #13357B;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: flex;
    width: 30px;
    height: 30px;
    align-items: center;
}
</style>

