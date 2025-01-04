<template>
    <div class="top-rating">
        <div class="name-of-table">
            <h4>Top Ratings</h4>
        </div>
        <table class="table table-responsive">
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th class="location-col">Location</th>
                    <th>Rating</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(destination, index) in paginatedList" :key="index"
                    :class="{ selected: selectedDestinationId === destination.id }"
                    @click="$emit('update:selected-destination-id', destination.id)">
                    <td><img class="img" :src="destination.images[0]?.url || '/blue-image.jpg'" alt=""></td>
                    <td> {{ destination.name }} </td>
                    <td class="location" v-if="destination.address">{{ [destination.address.street,
                    destination.address.ward, destination.address.district, destination.cityName].filter(Boolean)
                        .map(item => item.replace(/,\s*$/, '')) // Loại bỏ dấu phẩy cuối cùng
                        .join(', ') }}
                    </td>
                    <td>{{ destination.rating }}</td>
                    <td>
                        <button class="btns" @click="navigateToDetailDestination(destination)">
                            <svg class="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                    stroke="#currentColor" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Pagination -->
        <div class="pagination-container d-flex justify-content-center align-items-center mt-3">
            <button class="btn-pagination prev" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
            <!-- Trang đầu -->
            <button class="btn-pagination" :class="{ active: currentPage === 1 }" @click="currentPage = 1">
                1
            </button>
            <!-- Dấu ... trước trang hiện tại -->
            <span class="dot" v-if="currentPage > 3">...</span>

            <button v-for="page in pagesToShow" :key="page" class="btn-pagination"
                :class="{ active: page === currentPage }" @click="currentPage = page">
                {{ page }}
            </button>

            <!-- Dấu ... sau trang hiện tại -->
            <span class="dot" v-if="currentPage < totalPages - 2">...</span>

            <!-- Trang cuối -->
            <button class="btn-pagination" :class="{ active: currentPage === totalPages }"
                @click="currentPage = totalPages">
                {{ totalPages }}
            </button>
            <button class="btn-pagination next" :disabled="currentPage === totalPages"
                @click="currentPage++">Next</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    destinations: Array,
    selectedDestinationId: Number
})

const navigateToDetailDestination = (destination) => {
    if (destination.hotel_id !== null && destination.restaurant_id == null) {
        window.location.assign(`/Detail/Hotel/${destination.hotel_id}`);
    }
    else if (destination.hotel_id == null && destination.restaurant_id !== null) {
        window.location.assign(`/Detail/Restaurant/${destination.restaurant_id}`);
    }
    else {
        window.location.assign(`/Detail/Place/${destination.id}`);
    }
};

const currentPage = ref(1);
const itemsPerPage = 5;

// Computed property to calculate paginated list
const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return props.destinations.slice(start, end);
});

// Tính tổng số trang
const totalPages = computed(() => {
    return Math.ceil(props.destinations.length / itemsPerPage);
});

// Tính danh sách các trang cần hiển thị
const pagesToShow = computed(() => {
    const pages = [];
    // Hiển thị các trang từ currentPage - 2 đến currentPage + 2
    for (let i = Math.max(2, currentPage.value - 1); i <= Math.min(totalPages.value - 1, currentPage.value + 1); i++) {
        pages.push(i);
    }
    return pages;
});


</script>

<style scoped>
.top-rating h4 {
    color: #13357B;
    font-weight: 900;
    margin-bottom: 20px;
}

tbody {
    max-height: 200px;
}

th {
    border-color: #13357B !important;
    color: #13357B;
    background-color: #8ECAE6 !important;
    text-align: center;
    padding: .5rem 1.5rem;
    font-weight: 900 !important;
}

tr {
    vertical-align: middle !important;
    text-align: center !important;
    border-color: rgba(19, 53, 123, 0.4) !important;
    font-size: 14px;
}

td {
    color: #13357B !important;
    background-color: #EDF6F9 !important;
}

.location {
    text-align: left !important;
}

.img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
}

.svg {
    stroke: #13357B;
}

.svg:hover {
    stroke: #008EAC;
    cursor: pointer;
}

tbody tr:hover td {
    background-color: #CAF0F8 !important;
    /* Màu khi hover */
    cursor: pointer;
    /* Thêm con trỏ dạng tay */
}

tbody tr.selected td {
    background-color: #AEDEFE !important;
    /* Màu khi active */
    cursor: pointer;
    /* Thêm con trỏ dạng tay */
}

.btns {
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.pagination-container {
    gap: 10px;
}

.btn-pagination {
    padding: 8px 16px;
    border: 1px solid #4AA4D9;
    background-color: #EDF6F9;
    color: #13357B;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
}

.btn-pagination:hover {
    background-color: #4AA4D9;
    color: #EDF6F9;
}

.btn-pagination:disabled {
    background-color: #CAF0F8;
    cursor: not-allowed;
}

.btn-pagination.active {
    background-color: #4AA4D9;
    color: #EDF6F9;
    font-weight: bold;
}
</style>