<template>
  <div id="app">
    <!-- Sidebar on the left -->
    <aside class="sidebar">
      <ul>
        <li>
          <router-link
            to="/dashboard"
            :class="{ active: isActive('/dashboard') }"
            @click="handleNavigation"
          >
            <i class="icon-dashboard"></i> Dashboard
          </router-link>
        </li>
        <li>
          <router-link
            to="/users"
            :class="{ active: isActive('/users') }"
            @click="handleNavigation"
          >
            <i class="icon-user-management"></i> User Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/cities"
            :class="{ active: isActive('/cities') }"
            @click="handleNavigation"
          >
            <i class="icon-city-management"></i> City Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/destinations"
            :class="{ active: isActive('/destinations') }"
            @click="handleNavigation"
          >
            <i class="icon-destination-management"></i> Destination Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/hotels"
            :class="{ active: isActive('/hotels') }"
            @click="handleNavigation"
          >
            <i class="icon-hotel-management"></i> Hotel Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/restaurants"
            :class="{ active: isActive('/restaurants') }"
            @click="handleNavigation"
          >
            <i class="icon-restaurant-management"></i> Restaurant Management
          </router-link>
        </li>
        <li>
          <router-link
            to="/tours"
            :class="{ active: isActive('/tours') }"
            @click="handleNavigation"
          >
            <i class="icon-tour-management"></i> Tour Management
          </router-link>
        </li>
      </ul>
    </aside>

    <!-- Top Navigation -->
    <header class="top-nav">
      <div class="auth-section">
        <template v-if="!loggedInUser">
          <router-link to="/login" class="auth-button login-button">
            Login
          </router-link>
        </template>
        <template v-else>
          <span class="welcome-message">
            Welcome, {{ loggedInUser.username }}
          </span>
          <button @click="handleLogout" class="auth-button logout-button">
            Logout
          </button>
        </template>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view :key="viewKey"></router-view>
    </main>
  </div>
</template>

<script>
import AuthController from "./controllers/AuthController";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const viewKey = ref(Date.now()); // Unique key for router-view to refresh
    const { logout, loggedInUser } = AuthController();
    let checkUserInterval = null;

    // Function to load user from sessionStorage if available
    const loadUserFromSession = () => {
      const savedUser = sessionStorage.getItem("user");
      if (savedUser) {
        loggedInUser.value = JSON.parse(savedUser);
      }
    };

    // Set up a 5-second interval to recheck loggedInUser
    onMounted(() => {
      loadUserFromSession(); // Initial load
      checkUserInterval = setInterval(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
          logout();
        }
        loadUserFromSession();
      }, 5000); // Repeat every 5 seconds
    });

    onBeforeUnmount(() => {
      clearInterval(checkUserInterval); // Clear interval on component unmount
    });

    const refreshView = () => {
      viewKey.value = Date.now(); // Update key to force router-view refresh
    };

    const handleLogout = () => {
      logout();
    };

    const handleNavigation = () => {
      refreshView(); // Refresh view on navigation
    };

    const isActive = (route) => {
      return router.currentRoute.value.path === route;
    };

    return { loggedInUser, handleLogout, handleNavigation, isActive, viewKey };
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* Sidebar styling on the left */
.sidebar {
  position: fixed;
  left: 0;
  top: 50px; /* Below the top navigation */
  width: 15%;
  height: calc(100vh - 50px);
  background-color: #34495e; /* Darker background for contrast */
  color: #ecf0f1; /* Lighter text color */
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); /* Enhanced shadow for depth */
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  margin-bottom: 20px;
  transition: transform 0.2s, color 0.2s;
}

.sidebar li:hover {
  transform: translateX(5px);
  color: #00acee; /* Twitter blue for a fresh look */
}

.sidebar a {
  color: #bdc3c7; /* Subtle link color for improved readability */
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  transition: background-color 0.3s, color 0.3s;
}

.active {
  background-color: #1abc9c; /* Distinctive active color */
  color: #ffffff !important; /* Ensure active text is fully visible */
}

.sidebar a:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Softer hover effect */
  color: #1abc9c; /* Hover text color */
}

.icon-dashboard,
.icon-user-management {
  margin-right: 10px;
  font-size: 20px;
}

/* Top navigation bar styling */
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: linear-gradient(90deg, #023b61, #025040); /* Gradient effect */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.welcome-message {
  color: #ecf0f3;
  font-weight: bold;
  margin-right: 10px;
}

.auth-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer;
}

.login-button {
  background-color: #42b983;
}

.login-button:hover {
  background-color: #379970;
  transform: scale(1.05);
}

.logout-button {
  background-color: #dc3545;
}

.logout-button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

/* Main content area styling */
.main-content {
  position: fixed;
  top: 50px;
  left: 15%;
  width: 85%;
  height: calc(100vh - 50px);
  padding: 0px;
  background: linear-gradient(145deg, #f8f9fb, #e6e8eb);
  border-radius: 0px;
  overflow-y: auto;
}

/* General icon styling */
li i {
  margin-right: 8px;
  font-size: 16px;
  display: inline-block;
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
}

/* Icons for different management sections */
.icon-dashboard:before {
  content: "\f015";
  color: #007bff;
}
.icon-user-management:before {
  content: "\f007";
  color: #007bff;
}
.icon-city-management:before {
  content: "\f1ad";
  color: #007bff;
}
.icon-destination-management:before {
  content: "\f5a0";
  color: #007bff;
}
.icon-hotel-management:before {
  content: "\f594";
  color: #007bff;
}
.icon-restaurant-management:before {
  content: "\f2e7";
  color: #007bff;
}
.icon-tour-management:before {
  content: "\f5b1";
  color: #007bff;
}
</style>
