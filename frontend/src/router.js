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

//Review

const writeReviewView = () => import('./components/views/Review/Review_WriteReview.vue');
const uploadPictureView = () => import('./components/views/Review/Review_UploadPicture.vue');

// Test UI
const test   = () => import('./components/views/Detail/Place.vue');
const test1 = () => import('./components/views/Detail/Restaurant.vue');
const test2 = () => import('./components/views/Detail/Hotel.vue');
const test3 = () => import('./components/views/Filter_Option.vue');


const routes = [
  {
    path: '/login',
    name: 'Login to Account',
    component: SignInView,  // Lazy load SignInView
  },
  {
    path: '/sign-up',
    name: 'Create a new account',
    component: SignUpView,  // Lazy load SignUpView
  },
  {
    path: '/home',
    name: 'Dashboard_Final',
    component: Dashboard_Final,  // Lazy load SignUpView
  },
  {
    path: '/Destination/:id',
    name: 'Destination_Final',
    component: Destination_Final,  // Lazy load SignInView
  },
  {
    path: '/ThingsToDo',
    name: 'ThingsToDo_List_All',
    component: ThingsToDo_List_All,  // Lazy load destinationView
  },
  {
    path: '/Restaurants',
    name: 'Restaurants_List_All',
    component: Restaurants_List_All,  // Lazy load SignInView
  },
  {
    path: '/Hotels',
    name: 'Hotels_List_All',
    component: Hotels_List_All,  // Lazy load SignInView
  },
  {
    path: '/Profile_Page',
    name: 'Profile_Page',
    component: Profile_Page,  // Lazy load DashBoardView
  },
  {
    path: '/ThingsToDo/:id',
    name: 'city_ThingsToDo_List',
    component: city_ThingsToDo_List,  // Lazy load DashBoardView
  },
  {
    path: '/Restaurants/:id',
    name: 'city_Restaurants_List',
    component: city_Restaurants_List,  // Lazy load DashBoardView
  },
  {
    path: '/Hotels/:id',
    name: 'city_Hotels_List',
    component: city_Hotels_List,  // Lazy load DashBoardView
  },
  {
    path: '/Profile_Page',
    name: 'Profile_Page',
    component: Profile_Page,  // Lazy load DashBoardView
  },
  {
    path: '/Detail/Place/:id',
    name: 'Place',
    component: Place,  // Lazy load SignInView
  },
  {
    path: '/Detail/Restaurant/:id',
    name: 'Res',
    component: Res,  // Lazy load SignInView
  },
  {
    path: '/Detail/Hotel/:id',
    name: 'Hot',
    component: Hot,  // Lazy load SignInView
  },
  {
    path: '/Review/Write/:id',
    name: 'WriteReview',
    component: writeReviewView,  // Lazy load detailLocation_Hotel
  },
  {
    path: '/Review/Upload/:id',
    name: 'UploadPicture',
    component: uploadPictureView,  // Lazy load detailLocation_Hotel
  },


  {
    path: '/test',
    name: 'test',
    component: test,  // Lazy load SignInView
  },
  {
    path: '/test1',
    name: 'test1',
    component: test1,  // Lazy load SignInView
  },
  {
    path: '/test2',
    name: 'test2',
    component: test2,  // Lazy load SignInView
  },
  {
    path: '/test3',
    name: 'test3',
    component: test3,  // Lazy load SignInView
  },
  
  
  // Đường dẫn mặc định nếu không có URL cụ thể
  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

