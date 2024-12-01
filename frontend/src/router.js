import { createRouter, createWebHistory } from 'vue-router';

// Sử dụng dynamic import để lazy load các component

// Sign in & Sign up
const SignInView = () => import('./components/views/SignInView.vue');
const SignUpView = () => import('./components/views/SignUpView.vue');

// Dashboard
const Dashboard_Final = () => import('./components/views/Dashboard/Dashboard.vue');

// List all thingstodo/restaurants/hotels
const ThingsToDo_List_All = () => import('./components/views/Things_To_Do/ThingsToDo_List_All.vue');
const Restaurants_List_All = () => import('./components/views/Restaurants/Restaurants_List_All.vue');
const Hotels_List_All = () => import('./components/views/Hotel/Hotel_List_All.vue');

// Profile
const Profile_Page = () => import('./components/views/Profile_Page/Profile_Page.vue');

// Destination
const Destination_Final = () => import('./components/views/Destination/destinationView_Test.vue');

// List thingstodo/restaurant/hotel in a city
const city_ThingsToDo_List = () => import('./components/views/Things_To_Do/ThingsToDo_1_City.vue');
const city_Restaurants_List = () => import('./components/views/Restaurants/Restaurants_1_City.vue');
const city_Hotels_List = () => import('./components/views/Hotel/Hotels_1_City.vue');

// Detail place/restaurant/hotel
const Place = () => import('./components/views/Detail/Place.vue');
const Res = () => import('./components/views/Detail/Restaurant.vue');
const Hot = () => import('./components/views/Detail/Hotel.vue');

// Review
const writeReviewView = () => import('./components/views/Review/Review_WriteReview.vue');
const updateReviewView = () => import('./components/views/Review/Review_UpdateReview.vue');
const uploadPictureView = () => import('./components/views/Review/Review_UploadPicture.vue');

// Test UI
const test = () => import('./components/views/Detail/Place.vue');
const test1 = () => import('./components/views/Detail/Restaurant.vue');
const test2 = () => import('./components/views/Detail/Hotel.vue');
const test3 = () => import('./components/views/Filter_Option.vue');

//Business
const addDestination = () => import('./components/views/Business/Business_Destination_Add.vue');
const updateDestination = () => import('./components/views/Business/Business_Destination_Update.vue');
const addHotel = () => import('./components/views/Business/Business_Hotel_Add.vue');
const updateHotel = () => import('./components/views/Business/Business_Hotel_Update.vue');
const addRestaurant = () => import('./components/views/Business/Business_Restaurant_Add.vue');
const updateRestaurant = () => import('./components/views/Business/Business_Restaurant_Update.vue');



// Routes configuration
const routes = [
  { path: '/login', name: 'Login', component: SignInView },
  { path: '/sign-up', name: 'SignUp', component: SignUpView },
  { path: '/home', name: 'Dashboard', component: Dashboard_Final },
  { path: '/Destination/:id', name: 'Destination', component: Destination_Final },
  { path: '/ThingsToDo', name: 'ThingsToDoList', component: ThingsToDo_List_All },
  { path: '/Restaurants', name: 'RestaurantsList', component: Restaurants_List_All },
  { path: '/Hotels', name: 'HotelsList', component: Hotels_List_All },
  { path: '/Profile_Page', name: 'ProfilePage', component: Profile_Page },
  { path: '/ThingsToDo/:id', name: 'CityThingsToDo', component: city_ThingsToDo_List },
  { path: '/Restaurants/:id', name: 'CityRestaurants', component: city_Restaurants_List },
  { path: '/Hotels/:id', name: 'CityHotels', component: city_Hotels_List },
  { path: '/Detail/Place/:id', name: 'PlaceDetail', component: Place },
  { path: '/Detail/Restaurant/:id', name: 'RestaurantDetail', component: Res },
  { path: '/Detail/Hotel/:id', name: 'HotelDetail', component: Hot },
  { path: '/Review/Write/:id', name: 'WriteReview', component: writeReviewView },
  { path: '/Review/Update/:id', name: 'UpdateReview', component: updateReviewView },
  { path: '/Review/Upload/:id', name: 'UploadPicture', component: uploadPictureView },
  { path: '/Business/Destination/Add', name: 'AddDestination', component: addDestination },
  { path: '/Business/Destination/Update/:id', name: 'UpdateDestination', component: updateDestination },
  { path: '/Business/Hotel/Add/:id', name: 'AddHotel', component: addHotel },
  { path: '/Business/Hotel/Update/:id', name: 'UpdateHotel', component: updateHotel },
  { path: '/Business/Restaurant/Add/:id', name: 'AddRestaurant', component: addRestaurant },
  { path: '/Business/Restaurant/Update/:id', name: 'UpdateRestaurant', component: updateRestaurant },
  { path: '/test', name: 'Test', component: test },
  { path: '/test1', name: 'Test1', component: test1 },
  { path: '/test2', name: 'Test2', component: test2 },
  { path: '/test3', name: 'Test3', component: test3 },
  { path: '/', redirect: '/login' },
  
];

// Router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
});

export default router;
