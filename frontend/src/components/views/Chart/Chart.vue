<template>
    <canvas id="myChart" height="550" width="600px"></canvas>
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

const labels = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
                'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const data = {
    labels: labels,
    datasets: [{
        label: 'Reviews',
        backgroundColor: '#8ecae6',
        borderColor: '#8ecae6',
        data: [ 400, 200, 120, 400, 50, 102, 
        440, 220, 412, 240, 320, 102 ],
        type: 'bar',
        order: 1,
        yAxisID: 'y'
    },
    {
        label: 'Rating 4 star +',
        backgroundColor: '#13357B',
        borderColor: '#13357B',
        data: [ 50, 12, 24, 52, 32, 13,
        100, 120, 204, 502, 302, 103 ],
        type: 'line',
        tension: 0.225,
        yAxisID: 'y1'
    }]
};

const config = {    
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#13357B' // Màu chữ của chú thích (legend)
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#13357B', // Màu chữ trên trục X
                },
                grid : {
                    color: '#CAF0F8', // Màu chữ trên trục Y
                }
            },
            y: {
                type: 'linear', // Trục Y bên trái cho Reviews
                position: 'left',
                title: {
                    display: true,
                    text: 'Number of Reviews', // Tên cho trục Y bên trái
                    color: '#13357B',         // Màu chữ của tên trục
                    font: {
                        size: 12,             // Kích thước chữ
                        weight: 'bold'        // Đậm chữ
                    }
                },
                ticks: {
                    color: '#13357B', // Màu chữ trên trục Y (bên trái)
                },
                grid: {
                    color: '#CAF0F8', // Màu các đường kẻ ngang
                }
            },
            y1: {
                type: 'linear', // Trục Y bên phải cho Rating 4 star +
                position: 'right',
                title: {
                    display: true,
                    text: 'Rating (4 stars+)', // Tên cho trục Y bên phải
                    color: '#13357B',         // Màu chữ của tên trục
                    font: {
                        size: 12,             // Kích thước chữ
                        weight: 'bold'        // Đậm chữ
                    }
                },
                ticks: {
                    color: '#13357B', // Màu chữ trên trục Y (bên phải)
                },
                grid: {
                    drawOnChartArea: false // Không vẽ đường kẻ ngang từ trục bên phải
                }
            }
        }
    }
};

onMounted(() => {
    // const ctx = document.getElementById('myChart');
    // new Chart(ctx, config);
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
})
</script>

<style scoped>
#myChart {
    margin: 0 auto;
    color: #13357B;
}
</style>