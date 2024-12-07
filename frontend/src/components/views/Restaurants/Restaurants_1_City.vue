<template>
    <div class="container-fluid">
      <Header />
      <Top_Button v-if="cityId" :cityID="parseInt(cityId, 10)"/>
    </div>
    <div class="container-fluid">
      <div class="container-fluid">
        <div class="container-fluid">
          <div class="container-fluid">
            <div class="container-fluid frame-image-search">
              <img src="@/assets/images/restaurant_image.jpg" alt="City 1" class="img-fluid" />
              <div class="container-fluid search">
                <div class="container">
                  <Form_Search :name_of_page="'Find your perfect restaurant'" :name="'Attraction, activities or destination'" />
                </div>
              </div>
            </div>
            
            <div class="content">
              <div class="frame-filter">
                  <div class="container left-panel">
                    <div class="filter-section">
                      <!-- Cuisine Filter -->
                      <div
                        class="filter-item"
                        @click="toggleOptions('cuisine')"
                        :class="{ active: activeOptions.cuisine }"
                      >
                        Cuisine
                        <div class="icon"></div>
                      </div>
                      <div v-if="activeOptions.cuisine" class="options">
                        <div v-for="option in cuisine_options" :key="option" class="option">
                          <input
                            type="checkbox"
                            :id="`cuisine-${option}`"
                            :checked="save_option_cuisine.includes(option)"
                            @change="handleCheckboxChange(option, 'save_option_cuisine')"
                          />
                          <label class="label" :for="`cuisine-${option}`">{{ option }}</label>
                        </div>
                      </div>
          
                      <!-- Meal Filter -->
                      <div
                        class="filter-item"
                        @click="toggleOptions('meal')"
                        :class="{ active: activeOptions.meal }"
                      >
                        Meals
                        <div class="icon"></div>
                      </div>
                      <div v-if="activeOptions.meal" class="options">
                        <div v-for="option in meal_options" :key="option" class="option">
                          <input
                            type="checkbox"
                            :id="`meal-${option}`"
                            :checked="save_option_meal.includes(option)"
                            @change="handleCheckboxChange(option, 'save_option_meal')"
                          />
                          <label class="label" :for="`meal-${option}`">{{ option }}</label>
                        </div>
                      </div>
          
                      <!-- Special Diet Filter -->
                      <div
                        class="filter-item"
                        @click="toggleOptions('specialDiet')"
                        :class="{ active: activeOptions.specialDiet }"
                      >
                        Special Diet
                        <div class="icon"></div>
                      </div>
                      <div v-if="activeOptions.specialDiet" class="options">
                        <div v-for="option in special_diet_options" :key="option" class="option">
                          <input
                            type="checkbox"
                            :id="`specialDiet-${option}`"
                            :checked="save_option_special_diet.includes(option)"
                            @change="handleCheckboxChange(option, 'save_option_special_diet')"
                          />
                          <label class="label" :for="`specialDiet-${option}`">{{ option }}</label>
                        </div>
                      </div>
          
                      <!-- Feature Filter -->
                      <div
                        class="filter-item"
                        @click="toggleOptions('feature')"
                        :class="{ active: activeOptions.feature }"
                      >
                        Features
                        <div class="icon"></div>
                      </div>
                      <div v-if="activeOptions.feature" class="options">
                        <div v-for="option in feature_options" :key="option" class="option">
                          <input
                            type="checkbox"
                            :id="`feature-${option}`"
                            :checked="save_option_feature.includes(option)"
                            @change="handleCheckboxChange(option, 'save_option_feature')"
                          />
                          <label class="label" :for="`feature-${option}`">{{ option }}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="list-restaurants">
                  <Card_Item  v-for="(item, index) in restaurants"
                              :key="index"
                              :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
                              :name="item.name"
                              :stars="generateStars(item.rating)"
                              :rating="item.rating"
                              :reviewNumber="item.numOfReviews"
                              :tags="item.tag"
                              @click="navigateToDetailRestaurant(item.restaurant_id)" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    
  </template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../../viewModels/Restaurant_City_ListViewModel';
import generateViewModel from '../../viewModels/generate_ratingViewModel';
import { useRoute } from 'vue-router';

const route = useRoute();
const cityId = route.params.id;

const {
    filterRestaurants,
    isMenuVisible,
    toggleMenu,
    restaurants,
    liked,
    searchQuery,
    activeOptions,
    toggleOptions,
    cuisine_options,
    meal_options,
    special_diet_options,
    feature_options,
    save_option_cuisine,
    save_option_meal,
    save_option_special_diet,
    save_option_feature,
    handleCheckboxChange,
} = destinationViewModel(cityId);

onMounted(async () => {
    await filterRestaurants();
  });

  watch(
  [save_option_cuisine, save_option_meal, save_option_special_diet, save_option_feature],
  async () => {
    // Gọi hàm async bên trong mà không trả về Promise từ callback
    await filterRestaurants();
  }
);

const {
    circles,
    rating,
    ratings,
    generateCircle,
    generateStars,
    totalRating,
  } = generateViewModel();

const navigateToDetailRestaurant = (restaurant_id) =>{
        window.location.assign(`/Detail/Restaurant/${restaurant_id}`);
    };
</script>

<script>
    import Header from '../Header.vue';
    import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
    import Top_Button from '../Top_Button.vue';
    import Form_Search from '../Form_Search.vue';
    import Img_Card from '../Img_Card.vue';
    import Card_Item from '../Card_Item.vue';
    import Filter_Option from '../Filter_Option.vue';
    export default {
        name: "ThingsToDo_List",
        components: {
            Header, Scroll_Bar_Component, Top_Button, Form_Search,
            Img_Card, Card_Item, Filter_Option,
        }
    }
</script>

<style scoped>
.img-fluid {
    margin-top: 150px;
    width: 100vw;
    padding: 0px;
    height: 600px;
    border-radius: 25px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    margin-bottom: 50px;
}
.search{
    margin-top: -25%;
    margin-bottom: 250px;
}
.content{
  display: grid;
  grid-template-columns: 30% 65%;
  gap: 5%
}
.content p{
    font-weight: 900;
    margin-top: 15px; 
}
.list-restaurants{
    display: grid;
    margin-top: 0px;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
    align-items: center;
    height: 100%;
}
.left-panel{
    position: sticky;
    top: 160px;
}
.filter-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 0px;
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.filter-item {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    color: #13357B;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.3s;
    gap: 50px;
    font-size: 25px;
    width: 100%;
}
.filter-item svg{
    stroke: #13357B;
}
.filter-item:hover {
    background-color: #13357B;
    color: #EDF6F9;
}
.filter-item:hover svg{
    stroke: #EDF6F9;
}
.filter-item.active {
    background-color: #13357B;
    color: #e7c6ff;
}
.filter-item.active svg{
    stroke: #e7c6ff;
    transform: rotate(180deg);
}
.options {
    display: flex;
    flex-direction: column;
    padding: 25px;
    background-color: #EDF6F9;
    border-radius: 8px;
    width: 100%;
    min-width: 400px;
    gap: 20px;
    max-height: 280px; /* Set a maximum height for the scroll area */
    overflow-y: auto;  /* Enable vertical scroll */
}
.option{
    display: flex;
    padding: 20px;
    gap: 10px;
    background-color: #EDF6F9;
    border-radius: 10px;
}
.option label{
    color: #13357B;
    font-size: 20px;
}
.option input[type="checkbox"]  {
    appearance: none;
    background-color: #EDF6F9;
    margin-right: 10px;
    border: 2px solid #13357B;
    width: 25px;
    height: 25px;
    border-radius: 25%;
    align-items: center; /* Căn giữa nội dung */
    position: relative; /* Để pseudo-element ::after hoạt động đúng */
}
.option input[type = "checkbox"]:checked { 
    background-color: #13357B;
}
.option input[type = "checkbox"]:checked +label { 
    font-weight: 900;
}
.option input[type = "checkbox"]:checked::after { 
    content: "\2714";
    color: #EDF6F9;
    font-size: 15px;
    font-weight: bold;
    position: absolute; /* Để kiểm soát vị trí của tick */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Đưa dấu tick vào giữa checkbox */
}
.option:hover {
    background-color: #00b4d8;
}
.option:hover label{
    color: #EDF6F9;
    font-weight: 800;
}
.option.active {
    background-color: #13357B;
    font-weight: 800;
    color: #e7c6ff;
}
.option.active label{
    color: #e7c6ff;
    font-weight: 800;
}
.checked {
    /* Background color when checked */
    background-color: #CAF0F8;
}
.checked label{
    color: #13357B;
    font-weight: 900;
}

.icon {
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2313357B'><path d='M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
.filter-item:hover .icon {
    background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23EDF6F9'><path d='M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
}
.filter-item.active .icon {
    background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23E7C6FF'><path d='M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
}
</style>

