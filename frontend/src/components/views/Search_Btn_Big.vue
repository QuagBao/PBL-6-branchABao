<template>
  <div class="container-fluid search">
      <div class="container-fluid position-relative">
          <!-- Input search -->
          <input 
              class="form-control" 
              type="text" 
              v-model="searchQuery" 
              :placeholder="placeholderText"
          />
          
          <!-- Nút Search -->
          <button type="button" class="btn btn-primary" @click="performSearch">Search</button>
          
          <!-- Danh sách kết quả -->
          <div v-if="results.length" class="search-results" :class="{'show': results.length > 0}">
              <ul>
                  <li 
                      v-for="(result, index) in results" 
                      :key="index" 
                      @click="selectResult(result)"
                  >
                      {{ result }}
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import useLiveSearch from '../viewModels/LiveSearchViewModel.js';

const searchQuery = ref('');
const { search, isLoading, results } = useLiveSearch(searchQuery);

// Hàm thực hiện tìm kiếm
const performSearch = (query = null) => {
  const queryToSearch = query || searchQuery.value;
  if (queryToSearch) {
      window.location.assign(`/search?q=${queryToSearch}`);
  } else {
      alert('Please enter a search query.');
  }
};

// Hàm xử lý khi chọn một kết quả
const selectResult = (result) => {
  performSearch(result);
};
</script>

<script>
    export default {
  props: {
    placeholderText: {
        type: String,
        default: 'Where do you want to go?'
    }
  },
        name: "Search_Btn_Big",
    }
</script>

<style scoped>
.position-relative {
    display: flex;
    position: relative;
    background: #014f86;
    border-radius: 50rem;
    padding: 2.5rem;
    width: 100%;
}
.form-control::placeholder,
.form-control:focus{
    color: #13357B;
}
.form-control {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem 1rem 1.5rem;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #13357B;
    background-color: #EDF6F9;
    border-radius: 30px;
}
input:focus, input:hover {
  outline: none;
  background-color: #caf0f8;
  color: #13357B;
}
.btn-primary {
    top : 50%;
    right: 46px;
    transform: translateY(-50%);
    box-shadow: inset 0 0 0 0 #13357B;  
    border-radius: 50rem;
    font-weight: 600;
    transition: all 0.5s;
    position: absolute;
    color: #EDF6F9;
    background-color: #13357B;
    border: 0;
    border-color: #13357B;
    padding: .5rem 1.5rem;
    margin-right: .5rem;
    display: inline-block;
    line-height: 1.5;
}
button {
    justify-content: center;
    margin: 0;
    border: none;
    font-size: 100%;
    border-radius: 10px;
    text-transform: none;
    background-color: transparent;
}
.btn-primary:hover {
    color: #13357B;
    background-color: #EDF6F9;  
    border: 2px solid #13357B;
}
.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color:#EDF6F9;
    border: 1px solid #ddd;
    border-radius: 15px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: 10px;
    padding: 10px;
    
    /* Hiệu ứng đổ xuống */
    opacity: 0;
    transform: translateY(100px);
    animation: slideDown 0.3s ease-out forwards;
}

.search-results.show {
    opacity: 1;
    transform: translateY(0);
}

/* Animation: Đổ xuống */
@keyframes slideDown {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.search-results ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.search-results li {
    padding: 10px 35px;
    cursor: pointer;
    border-radius: 10px;
}

.search-results li:hover {
    background-color: #CAF0F8;
}

:deep(.scrool)
</style>