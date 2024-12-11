<template>
<!-- <Bar id="my-chart-id"
     :options="chartOptions"
     :data="chartData" /> -->

    <canvas id="myChart" height="400" width="500"></canvas>
</template>

<!-- <script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
name: 'BarChart',
components: { Bar },
    data() {
        return {
            chartData: {
                labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December' ],
                datasets: [ { data: [40, 20, 12, 40, 20, 12, 
                        40, 20, 12, 40, 20, 12] } ]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script> -->

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

const labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December' ];

const data = {
    labels: labels,
    datasets: [{
        label: 'My First dataset',
        backgroundColor: '#8ecae6',
        borderColor: '#8ecae6',
        data: [ 400, 200, 120, 400, 50, 102, 
        440, 220, 412, 240, 320, 102 ],
        type: 'bar',
        order: 1
    },
    {
        label: 'My Second dataset',
        backgroundColor: '#13357B',
        borderColor: '#13357B',
        data: [ 50, 12, 24, 52, 32, 13,
        100, 120, 204, 502, 302, 103 ],
        type: 'line',
        tension: 0.25
    }]
};

const config = {    
    data: data,
    options: {}
};

onMounted(() => {
    // const ctx = document.getElementById('myChart');
    // new Chart(ctx, config);
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
})
// const myChart = new Chart(
//     document.getElementById('myChart'),
//     config
// );

</script>