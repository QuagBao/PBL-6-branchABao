<template>
    <div :class="['container-fluid header p-0', { 'scrolled': state.isScrolled }]">
      <nav class="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
        <div class="navbar-brand p-0">
          <h1 class="m-0">
            <img src="@/assets/images/company_image.png" alt="Logo" class="logo" />
            Travel Trips
          </h1>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-lg-end" id="navbarCollapse">
          <div class="navbar-nav ms-auto py-0">
            <button
              class="nav-item nav-link"
              :class="{ active: state.activeButton === 'home' }"
              @click="handleButtonClick('home', '/home')"
            >
              Home
            </button>
            <button
              class="nav-item nav-link"
              :class="{ active: state.activeButton === 'tour' }"
              @click="handleButtonClick('tour', '/tour-proposal')"
            >
              Tour Proposal
            </button>
            <div class="nav-item dropdown">
              <button class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Trips</button>
              <div class="dropdown-menu m-0">
                <button class="dropdown-item" @click="handleButtonClick('myTrips', '/my-trips')">My Trips</button>
                <button class="dropdown-item" @click="handleButtonClick('startNewTrip', '/start-new-trip')">Start a new trip</button>
                <button class="dropdown-item" @click="handleButtonClick('createAITrip', '/create-ai-trip')">Create a new trip by AI</button>
              </div>
            </div>
            <button
              class="nav-item nav-link"
              :class="{ active: state.activeButton === 'itinerary' }"
              @click="handleButtonClick('itinerary', '/itinerary')"
            >
              Travel Itinerary
            </button>
            <button
              class="nav-item nav-link"
              :class="{ active: state.activeButton === 'forum' }"
              @click="handleButtonClick('forum', '/forum')"
            >
              Forum
            </button>
            <div class="nav-item dropdown">
              <button class="nav-link dropdown-toggle user" data-bs-toggle="dropdown">
                <svg width="30" height="30" viewBox="0 0 45 45" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20 4C11.1634 4 4 11.1634 4 20C4 24.1982 5.61612 28.0197 8.26399 30.8755C8.36396 30.5447 8.49691 30.2198 8.67035 29.9097C9.25835 28.8584 10.0001 27.8863 10.8802 27.0267C11.7634 26.1641 12.7599 25.4401 13.8347 24.8681C12.1977 23.3012 11.1743 21.1113 11.1743 18.6667C11.1743 13.836 15.1704 10 20 10C24.8296 10 28.8257 13.836 28.8257 18.6667C28.8257 21.1113 27.8023 23.3012 26.1653 24.8681C27.2401 25.4401 28.2366 26.1641 29.1198 27.0267C29.9999 27.8863 30.7417 28.8585 31.3296 29.9097C31.5031 30.2198 31.636 30.5447 31.736 30.8755C34.3839 28.0197 36 24.1982 36 20C36 11.1634 28.8366 4 20 4ZM27.8822 33.9273C27.9599 33.5279 27.9988 33.1529 28 32.8206C28.0019 32.2716 27.9013 31.9745 27.8386 31.8623C27.4375 31.1451 26.93 30.4793 26.3249 29.8883C24.6553 28.2576 22.381 27.3333 20 27.3333C17.619 27.3333 15.3447 28.2576 13.6751 29.8883C13.07 30.4793 12.5625 31.1451 12.1614 31.8623C12.0987 31.9745 11.9981 32.2716 12 32.8206C12.0012 33.1529 12.0401 33.5279 12.1178 33.9273C14.443 35.2466 17.131 36 20 36C22.869 36 25.557 35.2466 27.8822 33.9273ZM20 23.3333C22.7099 23.3333 24.8257 21.1998 24.8257 18.6667C24.8257 16.1335 22.7099 14 20 14C17.2901 14 15.1743 16.1335 15.1743 18.6667C15.1743 21.1998 17.2901 23.3333 20 23.3333ZM0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 27.1145 36.2837 33.3597 30.696 36.9023C27.6014 38.8643 23.9303 40 20 40C16.0697 40 12.3986 38.8643 9.30403 36.9023C3.71627 33.3597 0 27.1145 0 20Z" fill="#currentColor"/>
                </svg>
              </button>
              <div class="dropdown-menu m-0">
                <button class="dropdown-item" @click="handleButtonClick('profile', '/Profile_Page')">My Profile</button>
                <button class="dropdown-item">Account Settings</button>
                <button class="dropdown-item" @click="handleButtonClick('signout', '/login')">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  import useHeaderViewModel from "../viewModels/headerViewModel";
  
  export default {
    setup() {
      const { state, setActiveButton, navigateToPage } = useHeaderViewModel();
  
      const handleButtonClick = (buttonName, route) => {
        setActiveButton(buttonName);
        navigateToPage(route);
      };
  
      return {
        state,
        handleButtonClick,
      };
    },
  };
  </script>

<style scoped>
body{
    margin: 0;
}
.header{
    background-color: transparent;    
    border-bottom: 1px solid #13357B; 
}

.logo {
    height: 70px;
    margin-right: 10px;
    border-radius: 50%;
    z-index: 8;
    border:1.5px solid #48cae4;
}

.container-fluid {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}

/*** Navbar ***/
.navbar-light {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
}

.navbar-light .navbar-nav .nav-link {
    position: relative;
    padding: 35px 25px;
    color: #8da9c4 !important;
    font-size: 20px;
    font-weight: 400;
    outline: none;
    transition: .5s;
}

.navbar-light .navbar-nav .nav-link:hover,
.navbar-light .navbar-nav .nav-link.active {
    color: #EDF6F9 !important;
}

.header.scrolled .navbar-light .navbar-nav .nav-link:hover,
.header.scrolled .navbar-light .navbar-nav .nav-link.active {
    color: #EDF6F9 !important;
}

.navbar-light .navbar-brand h1 {
    color: #8da9c4 !important;
}

.header.scrolled {
  background-color: #EDF6F9;
  border-bottom: 1px solid #13357B; 
}

.header.scrolled .navbar-light .navbar-brand h1 {
    color: #13357B !important;
}

.navbar-light .navbar-brand img {
    max-height: 60px;
    transition: .5s;
}

.header.scrolled .navbar-light .navbar-nav .nav-link {
    color: #13357B !important;
}

.navbar-light .navbar-nav .nav-link:hover::before,
.navbar-light .navbar-nav .nav-link.active::before {
    height: calc(100% + 1px);
    left: 1px;
}

.navbar-light .navbar-nav .nav-link::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: -1px;
    left: 0;
    background: #13357B;
    transition: .5s;
    z-index: -1;
}

.navbar-light .navbar-nav .nav-link::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: -1px;
    left: 0;
    background: #13357B;
    transition: .5s;
    z-index: -1;
}

/* Dropdown Menu */
.navbar .nav-item .dropdown-menu {
    display: block;
    visibility: hidden;
    position: absolute;
    top: 100%;
    transform: rotateX(-75deg);
    transform-origin: 0% 0%;
    border: 0;
    border-radius: 10px;
    transition: .5s;
    opacity: 0;
    z-index: 99999;
}

.navbar .nav-item:hover .dropdown-menu {
    transform: rotateX(0deg);
    position: absolute;
    visibility: visible;
    background: #CAF0F8;
    transition: .5s;
    opacity: 1;
    z-index: 99999;
}

.dropdown .dropdown-menu button:hover {
    background: #13357B;
    color: #EDF6F9;
}


.dropdown .dropdown-menu button:hover svg{
    fill: #EDF6F9;
}
@media (min-width: 992px) {
    .text-lg-end {
        text-align: right !important;
    }
}
</style>