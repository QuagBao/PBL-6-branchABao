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

//write review
const writeReviewView = () => import('./components/views/writeReviewView.vue');

// Create a Trip
const Create_Trip = () => import('./components/views/Create_Trip.vue');
const Page_1 = () => import('./components/views/Creat_Trip/Page_1.vue');
const Page_2 = () => import('./components/views/Creat_Trip/Page_2.vue');
const Page_2_1 = () => import('./components/views/Creat_Trip/Page_2_1.vue');
const Page_3 = () => import('./components/views/Creat_Trip/Page_3.vue');
const Page_4 = () => import('./components/views/Creat_Trip/Page_4.vue');
const Page_5 = () => import('./components/views/Creat_Trip/Page_5.vue');
const Page_6_1 = () => import('./components/views/Creat_Trip/Page_6_1.vue');
const Page_6_2 = () => import('./components/views/Creat_Trip/Page_6_2.vue');
const Page_7 = () => import('./components/views/Creat_Trip/Page_7.vue');

// Detail Trip
const Detail_Trip = () => import('./components/views/Trip/Detail_Trip.vue');

//Dashboard_For_Company
const Dashboard_For_Company = () => import('./components/views/Dashboard_For_Company/dashboard_for_company.vue')

// Topic
const Topic_List = () => import('./components/views/Topic/Topic_List.vue');

//Tour
const Detail_Tour = () => import('./components/views/Tour/Detail/Detail_Tour.vue');
const List_Tour = () => import('./components/views/Tour/List/List_Tour.vue');

// Test UI
const test   = () => import('./components/views/Dashboard_For_Company/dashboard_for_company.vue'); 
const test1 = () => import('./components/views/Dashboard_For_Company/Service.vue');
const test2 = () => import('./components/views/Tour/Detail/Detail_Tour.vue');
const test3 = () => import('./components/views/Tour/List/Tour_Item.vue');

const routes = [
  { path: '/login',
    name: 'Login to Account',
    component: SignInView,  // Lazy load SignInView
  },
  { path: '/sign-up',
    name: 'Create a new account',
    component: SignUpView,  // Lazy load SignUpView
  },
  { path: '/Dashboard_Final',
    name: 'Dashboard_Final',
    component: Dashboard_Final,  // Lazy load SignUpView
  },
  { path: '/Destination_Final/:id',
    name: 'Destination_Final',
    component: Destination_Final,  // Lazy load SignInView
  },
  { path: '/ThingsToDo_List_All',
    name: 'ThingsToDo_List_All',
    component: ThingsToDo_List_All,  // Lazy load destinationView
  },
  { path: '/Restaurants_List_All',
    name: 'Restaurants_List_All',
    component: Restaurants_List_All,  // Lazy load SignInView
  },
  { path: '/Hotels_List_All',
    name: 'Hotels_List_All',
    component: Hotels_List_All,  // Lazy load SignInView
  },
  { path: '/Profile_Page',
    name: 'Profile_Page',
    component: Profile_Page,  // Lazy load DashBoardView
  },
  { path: '/City/ThingsToDo_List',
    name: 'city_ThingsToDo_List',
    component: city_ThingsToDo_List,  // Lazy load DashBoardView
  },
  { path: '/City/Restaurants_List',
    name: 'city_Restaurants_List',
    component: city_Restaurants_List,  // Lazy load DashBoardView
  },
  { path: '/City/Hotels_List',
    name: 'city_Hotels_List',
    component: city_Hotels_List,  // Lazy load DashBoardView
  },
  { path: '/Profile_Page',
    name: 'Profile_Page',
    component: Profile_Page,  // Lazy load DashBoardView
  },
  { path: '/Detail/Place',
    name: 'Place',
    component: Place,  // Lazy load SignInView
  },
  { path: '/Detail/Restaurant',
    name: 'Res',
    component: Res,  // Lazy load SignInView
  },
  { path: '/Detail/Hotel',
    name: 'Hot',
    component: Hot,  // Lazy load SignInView
  },
  { path: '/Create_Trip',
    name: 'Create_Trip',
    component: Create_Trip,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_1',
    name: 'Page_1',
    component: Page_1,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_2',
    name: 'Page_2',
    component: Page_2,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_2_1',
    name: 'Page_2_1',
    component: Page_2_1,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_3',
    name: 'Page_3',
    component: Page_3,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_4',
    name: 'Page_4',
    component: Page_4,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_5',
    name: 'Page_5',
    component: Page_5,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_6_1',
    name: 'Page_6_1',
    component: Page_6_1,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_6_2',
    name: 'Page_6_2',
    component: Page_6_2,  // Lazy load SignInView
  },
  { path: '/Create_Trip/Page_7',
    name: 'Page_7',
    component: Page_7,  // Lazy load SignInView
  },
  { path: '/Detail_Trip',
    name: 'Detail_Trip',
    component: Detail_Trip,  // Lazy load SignInView
  },  
  { path: '/Topic_List',
    name: 'Topic_List',
    component: Topic_List,  // Lazy load SignInView
  },
  { path: '/Detail_Tour',
    name: 'Detail_Tour',
    component: Detail_Tour,  // Lazy load SignInView
  },
  { path: '/List_Tour',
    name: 'List_Tour',
    component: List_Tour,  // Lazy load SignInView
  },
  { path: '/Dashboard_For_Company',
    name: 'Dashboard_For_Company',
    component: Dashboard_For_Company,  // Lazy load SignInView
  },
  { path: '/test',
    name: 'test',
    component: test,  // Lazy load SignInView
  },
  { path: '/test1',
    name: 'test1',
    component: test1,  // Lazy load SignInView
  },
  { path: '/test2',
    name: 'test2',
    component: test2,  // Lazy load SignInView
  },
  { path: '/test3',
    name: 'test3',
    component: test3,  // Lazy load SignInView
  },
  { path: '/writeReview',
    name: 'WriteReview',
    component: writeReviewView,  // Lazy load detailLocation_Hotel
  },
  // Đường dẫn mặc định nếu không có URL cụ thể
  { path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

