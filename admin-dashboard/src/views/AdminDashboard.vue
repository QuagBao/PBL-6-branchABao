<template>
  <div class="container">
    <h2 class="text-center my-4">City Ratings Overview</h2>
    <canvas id="cityChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminController from '../controllers/AdminController';
import Chart from 'chart.js/auto';
const { getRatingsOfCities } = AdminController();
const cityRatings = ref([]);

const fetchCityRatings = async () => {
  try {
    const data = await getRatingsOfCities();
    cityRatings.value = data;
    drawChart();
  } catch (error) {
    console.error('Error fetching city ratings:', error);
  }
};


const drawChart = () => {
  const ctx = document.getElementById('cityChart').getContext('2d');
  const labels = cityRatings.value.map(city => city.city_name);
  const averageRatings = cityRatings.value.map(city => city.average_rating);
  const reviewCounts = cityRatings.value.map(city => city.total_review_count);

  new Chart(ctx, {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Average Rating',
          data: averageRatings,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          type: 'line',
          label: 'Total Reviews',
          data: reviewCounts,
          borderColor: '#42b983',
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

onMounted(fetchCityRatings);
</script>

<style scoped>
.dashboard-intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background: linear-gradient(to right, #2e3b4e, #42b983);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: fadeIn 1s ease forwards;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0;
  animation: fadeIn 1s ease forwards 0.5s;
}

.get-started {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.get-started:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.container {
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Keyframes for fadeIn animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
