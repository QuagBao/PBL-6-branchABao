<template>
  <div class="header-container">
    <Header />
    <Top_Button />
  </div>

  <div class="main-container">
    <div class="container content">
      <div class="container-fluid search">
        <div class="container-search">
          <Form_Search :name="'Attraction, activities or destination'" />
        </div>
      </div>
      <div class="row title-content">
        <p class="p-5 city">Cities</p>
        <div class="container-fluid context">
          <div class="row">
            <Cards_City
              v-for="(item, index) in cities"
              :key="index"
              :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
              :name="item.name"
              :description="item.description"
              @click="navigateToDestination(item.id)"
            />
          </div>
        </div>
      </div>
      <!-- Things to do Section -->
      <div class="row title-content">
        <p class="p-5 things-to-do">Things to do</p>
        <div class="container-fluid context">
          <div class="row">
            <Cards
              v-for="(item, index) in destinations"
              :key="index"
              :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
              :name="item.name"
              :description="item.description"
              :rating="item.rating"
              :stars="generateStars(item.rating)"
              :ratingCount="item.numOfReviews"
              :tags="item.tag"
              @click="navigateToDetailPlace(item.id)"
            />
          </div>
        </div>
      </div>

      <!-- Restaurants Section -->
      <div class="row title-content">
        <p class="p-5 restaurants">Restaurants</p>
        <div class="container-fluid context">
          <div class="row">
            <Cards
              v-for="(item, index) in restaurants"
              :key="index"
              :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
              :name="item.name"
              :description="item.description"
              :rating="item.rating"
              :stars="generateStars(item.rating)"
              :ratingCount="item.numOfReviews"
              :tags="item.tag"
              @click="navigateToDetailRestaurant(item.restaurant_id)"
            />
          </div>
        </div>
      </div>

      <!-- Resort & Hotels Section -->
      <div class="row title-content">
        <p class="p-5 resorts">Resort & Hotels</p>
        <div class="container-fluid context">
          <div class="row">
            <Cards
              v-for="(item, index) in hotels"
              :key="index"
              :imageUrl="item.images[0]?.url || '/blue-image.jpg'"
              :name="item.name"
              :description="item.description"
              :rating="item.rating"
              :stars="generateStars(item.rating)"
              :ratingCount="item.numOfReviews"
              :tags="item.tag"
              @click="navigateToDetailHotel(item.hotel_id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchViewModel from "../../viewModels/SearchViewModel";
import generate_ratingViewModel from '@/components/viewModels/generate_ratingViewModel.js';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const searchQuery = route.query.q;

const {
  search,
  searchResult,
  isLoading,
  cities,
  destinations,
  hotels,
  restaurants,
} = SearchViewModel(searchQuery);

onMounted(() => {
  search();
});

const { generateStars } = generate_ratingViewModel();

// Navigation Functions
const navigateToDetailPlace = (id) => window.location.assign(`/Detail/Place/${id}`);
const navigateToDetailRestaurant = (restaurant_id) => window.location.assign(`/Detail/Restaurant/${restaurant_id}`);
const navigateToDetailHotel = (hotel_id) => window.location.assign(`/Detail/Hotel/${hotel_id}`);
const navigateToDestination = (id) => {
  window.location.assign(`/Destination/${id}`);
};
</script>

<script>
import Header from '../Header.vue';
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Top_Button from '../Top_Button.vue';
import Img_Card from '../Img_Card.vue';
import Cards_City from './Cards_City.vue';
import Cards from './Cards.vue';
import Form_Search from '../Form_Search_Simple.vue';

export default {
  name: "ThingsToDo_List",
  components: {
    Header, Scroll_Bar_Component, Top_Button,
    Img_Card, Cards_City, Cards, Form_Search,
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  padding: 20px;
  width: 100%; /* Đảm bảo chiều rộng của main là 100% */
}

.header-container {
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  z-index: 1;
  width: 100%; /* Đảm bảo chiều rộng của header là 100% */
}

.container {
  display: flex;
  flex-direction: column;  /* Sắp xếp các phần tử con theo chiều dọc */
  width: 100%; /* Đảm bảo chiều rộng của container là 100% */
  background-color: none;
  padding: 20px;
  margin-top: 160px;
}

.container-search {
  display: flex;
  flex-direction: column;  /* Sắp xếp các phần tử con theo chiều dọc */
  width: 90vw; /* Đảm bảo chiều rộng của container-search là 100% */
  background-color: #4996ee;
  padding: 20px;
  border-radius: 50px;
}

.title-content {
  color: #13357B;
  font-size: 25px;
  font-weight: 900;
  margin-bottom: 10px; /* Giảm khoảng cách giữa tiêu đề và phần cards */
}

.context {
  display: flex;
  flex-direction: column; /* Đảm bảo các card được sắp xếp theo chiều dọc */
  width: 100%; /* Đảm bảo chiều rộng của context là 100% */
}

.row {
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  gap: 20px; /* Khoảng cách giữa các card */
  width: 90vw;
}

.cards {
  margin-bottom: 20px; /* Tạo không gian giữa các card */
  width: 100%; /* Đảm bảo chiều rộng của card là 100% */
}
</style>

