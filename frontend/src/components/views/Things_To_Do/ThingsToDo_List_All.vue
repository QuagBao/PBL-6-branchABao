 <template>
    <div class="container-fluid">
        <Header/>
        <Top_Button/>
    </div>

    <!-- Images -->
    <img src="@/assets/images/thingstodo_2.avif" alt="City 1" class="img-fluid">
    <!-- Search -->
    <div class="container-fluid search">
        <div class="container">
            <Form_Search    :name_of_page="'Find Things to Do anywhere in Viet Nam'"
                            :name="'Attraction, activities or destination'"/>
        </div>
    </div>

    <div class="container-fluid content">
        <div class="row title-content">
            <p class="p-5 top-destinations">
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

        <div class="row title-content">
            <p class="p-5 top-attractions">
                Top attractions in Viet Nam
            </p>
            <div class="container-fluid context list-items-1">
                <Card_Item v-for="(item, index) in attractions"
                        :key="index"
                        :imageUrl="item.images[0]?.url"
                        :name="item.name"
                        :rating="generateStars(item.rating)"
                        :review-number="item.numOfReviews"
                        :tags="item.tag"
                        @click="navigateToDetailPlace(item.id)"/>
            </div>
        </div>
    </div>
 </template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../../viewModels/ThingToDo_ListViewModel';

const {
    isMenuVisible, toggleMenu,
    generateStars, getImageUrl,
    liked, toggleLikeStatus,
    heartFull: heartFull, heartEmpty: heartEmpty,
    searchQuery,
    cities, visibleCities, prevCity, nextCity,
    attractions, visibleAttraction, prevAttraction, nextAttraction,
} = destinationViewModel();

const navigateToDetailPlace = (id) => {
    window.location.assign(`/Detail/Place/${id}`);
};
const navigateToThingsCity = (id) => {
    window.location.assign(`/City/ThingsToDo_List/${id}`);
};
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Top_Button from '../Top_Button.vue';
    import Form_Search from '../Form_Search.vue';
    import Img_Card from '../Img_Card.vue';
    import Card_Item from '../Card_Item.vue';
import { fetchAttractions } from '@/components/models/destinationModel';
    export default {
        name: "ThingsToDo_List",
        components: {
            Header, Scroll_Bar_Component, Top_Button, Form_Search,
            Img_Card, Card_Item,
        }
    }
</script>

<style scoped>
body {
    background-color: #EDF6F9;
}

.img-fluid {
    margin-top: 200px;
    width: 1600px;
    padding: 0px;
    height: 600px;
    border-radius: 25px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.search{
    margin-top: -25%;
    margin-bottom: 250px;
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
    gap: 30px;
    align-items: center;
    width: 95%;
    height: 100%;
}

.container-fluid-carousel { 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.carousel-control-prev {
    left: -40px; /* Canh bên trái */
}

.carousel-control-next {
    right: -40px; /* Canh bên phải */
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    display: block;
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
    filter: invert(1);
}

.carousel-control-next-icon {
    background-image: url("data:image/svg+xml;charset=UTF8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFF' viewBox='0 0 8 8'%3E%3Cpath d='M4.03 0L3 1.03 5.97 4 3 6.97 4.03 8 8 4 4.03 0z'/%3E%3C/svg%3E");
}

.carousel-control-prev-icon {
    background-image: url("data:image/svg+xml;charset=UTF8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23FFF' viewBox='0 0 8 8'%3E%3Cpath d='M3.97 0L4.97 1.03 2 4l2.97 2.97-1 1L0 4l3.97-4z'/%3E%3C/svg%3E");
}
</style>

