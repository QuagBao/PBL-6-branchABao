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
                <Img_Card v-for="(item, index) in visibleCities"
                        :key="index"
                        :imageUrl="getImageUrl(item.imageUrl)"
                        :name="item.name"/>
            </div>
        </div>

        <div class="row title-content">
            <p class="p-5 top-attractions">
                Top attractions in Viet Nam
            </p>
            <div class="container-fluid context list-items-1">
                <Card_Item v-for="(item, index) in visibleAttraction"
                        :key="index"
                        :imageUrl="getImageUrl(item.imageUrl)"
                        :name="item.name"
                        :rating="generateStars(item.rating)"
                        :review-number="item.reviewNumber"
                        :tags="item.tag"/>
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
</style>

