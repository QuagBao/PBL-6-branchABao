import { createRouter, createWebHistory } from 'vue-router';

// Sử dụng dynamic import để lazy load các component
const SignInView = () => import('./components/views/SignInView.vue');
const SignUpView = () => import('./components/views/SignUpView.vue');
const DashBoardView = () => import('./components/views/dashboard.vue');
const DashBoardView_Test = () => import('./components/views/Dashboard_Test.vue');
const destinationView = () => import('./components/views/destinationView.vue');
const detailLocation_Place = () => import('./components/views/detailLocation_Place.vue');
const detailLocation_Attraction = () => import('./components/views/detailLocation_Attraction.vue');
const detailLocation_Restaurant = () => import('./components/views/detailLocation_Restaurant.vue');
const detailLocation_Hotel = () => import('./components/views/detailLocation_Hotel.vue');
const writeReviewView = () => import('./components/views/writeReviewView.vue');
const uploadPictureView = () => import('./components/views/uploadPictureView.vue');
const city_ThingToDo_list = () => import('./components/views/city_ThingToDo_List.vue');
const city_Restaurant_list = () => import('./components/views/city_Restaurant_List.vue');
const city_Hotel_list = () => import('./components/views/city_Hotel_List.vue');
const ThingToDo_list = () => import('./components/views/ThingToDo_List.vue');
const Restaurant_list = () => import('./components/views/Restaurant_List.vue');
const Hotel_list = () => import('./components/views/Hotel_List.vue');
const Profile_Page = () => import('./components/views/Profile_Page/Profile_Page.vue');
const Destination_Final = () => import('./components/views/Destination/destinationView_Test.vue');
// const test = () => import('./components/views/Destination/destinationView_Test.vue');
const test1 = () => import('./components/views/Destination/Cards.vue');
const test2 = () => import('./components/views/Profile_Page/Favourite_Profile.vue');
const routes = [
  {
    path: '/login',
    name: 'Login to Account',
    component: SignInView,  // Lazy load SignInView
  },
  {
    path: '/Destination_Final',
    name: 'Destination_Final',
    component: Destination_Final,  // Lazy load SignInView
  },
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: test,  // Lazy load SignInView
  // },
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
    path: '/sign-up',
    name: 'Create a new account',
    component: SignUpView,  // Lazy load SignUpView
  },
  {
    path: '/home',
    name: 'Dashboard',
    component: DashBoardView,  // Lazy load DashBoardView
  },
  {
    path: '/DashBoardView_Test',
    name: 'DashBoardView_Test',
    component: DashBoardView_Test,  // Lazy load DashBoardView
  },
  {
    path: '/Profile_Page',
    name: 'Profile_Page',
    component: Profile_Page,  // Lazy load DashBoardView
  },
  {
    path: '/destination',
    name: 'Destination',
    component: destinationView,  // Lazy load destinationView
  },
  {
    path: '/city/thingtodo',
    name: 'City_ThingToDo',
    component: city_ThingToDo_list,  // Lazy load destinationView
  },
  {
    path: '/city/restaurant',
    name: 'City_Restaurant',
    component: city_Restaurant_list,  // Lazy load destinationView
  },
  {
    path: '/city/hotel',
    name: 'City_Hotel',
    component: city_Hotel_list,  // Lazy load destinationView
  },
  {
    path: '/thingtodo',
    name: 'Thing_To_Do',
    component: ThingToDo_list,  // Lazy load destinationView
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: Restaurant_list,  // Lazy load destinationView
  },
  {
    path: '/hotel',
    name: 'Hotel',
    component: Hotel_list,  // Lazy load destinationView
  },
  {
    path: '/detailLocation/Place',
    name: 'DetailLocation_Place',
    component: detailLocation_Place,  // Lazy load detailLocation_Place
  },
  {
    path: '/detailLocation/Attraction',
    name: 'DetailLocation_Attraction',
    component: detailLocation_Attraction,  // Lazy load detailLocation_Attraction
  },
  {
    path: '/detailLocation/Restaurant',
    name: 'DetailLocation_Restaurant',
    component: detailLocation_Restaurant,  // Lazy load detailLocation_Restaurant
  },
  {
    path: '/detailLocation/Hotel',
    name: 'DetailLocation_Hotel',
    component: detailLocation_Hotel,  // Lazy load detailLocation_Hotel
  },
  {
    path: '/writeReview',
    name: 'WriteReview',
    component: writeReviewView,  // Lazy load detailLocation_Hotel
  },
  {
    path: '/uploadPicture',
    name: 'UploadPicture',
    component: uploadPictureView,  // Lazy load detailLocation_Hotel
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

