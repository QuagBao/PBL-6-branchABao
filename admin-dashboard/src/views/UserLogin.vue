<template>
  <div class="login-container">
    <h2 class="login-title">Login to the system</h2>
    <input v-model="username" placeholder="Username" class="login-input" />
    <input
      v-model="password"
      type="password"
      placeholder="Password"
      class="login-input"
    />
    <button @click="handleLogin" class="login-button">Login</button>
  </div>
</template>

<script>
import { login } from "@/controllers/AuthController";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "UserLogin",
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");

    const handleLogin = async () => {
      const response = await login(username.value, password.value);

      if (response.success) {
        const userData = response.user;
        console.log("User data:", userData); // Log or use user data as needed

        if (userData.role !== "admin") {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          alert("You do not have permission to access this system."); // Thông báo nếu không phải admin
          return; // Dừng lại nếu không phải admin
        }

        setTimeout(() => {
          location.reload();
        }, 0);
        router.push("/dashboard"); // Redirect to dashboard only after fetching user data
      } else {
        alert(response.message || "Invalid credentials");
      }
    };

    return { username, password, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #2e3b4e, #42b983);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.login-input {
  width: 100%;
  max-width: 400px; /* Set a maximum width for inputs */
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.login-input::placeholder {
  color: #cfd8dc; /* Placeholder color */
}

.login-input:focus {
  background-color: rgba(255, 255, 255, 0.1); /* Change background on focus */
}

.login-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.login-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
