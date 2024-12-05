<template>
    <div class="container-fluid search">
      <div class="container-fluid position-relative">
        <!-- Input search, liên kết với biến searchQuery -->
        <input class="form-control" type="text" v-model="searchQuery" placeholder="Where do you want to go?">
        
        <!-- Nút Search với sự kiện click để gọi hàm performSearch -->
        <button type="button" class="btn btn-primary" @click="performSearch">Search</button>
      </div>
    </div>            
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Biến lưu trữ từ khóa tìm kiếm
  const searchQuery = ref("");
  
  // Hàm thực hiện tìm kiếm và chuyển hướng đến trang kết quả
  const performSearch = () => {
    if (searchQuery.value) {
      // Chuyển hướng tới trang tìm kiếm với query string là giá trị từ searchQuery
      window.location.assign(`/search?q=${searchQuery.value}`);
    } else {
      // Hiển thị cảnh báo nếu không có từ khóa tìm kiếm
      alert("Please enter a search query.");
    }
  };
  </script>

<script>
    export default {
  props: {
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
</style>