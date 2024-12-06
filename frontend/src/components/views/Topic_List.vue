<template>
    <div class="main-container">
      <div class="flex-row-b">
        <div class="image"></div>
        <span class="travel-tips">Travel Tips</span>
        <button class="union" @click="toggleMenu"></button>
        <button class="home" @click="alert('Đã nhấn Home')">Home</button>
        <button class="travel-itinerary"  @click.prevent="alert('Đã nhấn')">Travel Itinerary</button>
        <button class="tour-proposal"  @click.prevent="alert('Đã nhấn Proposal')">Tour Proposal</button>
        <button class="forum"  @click.prevent="alert('Đã nhấn Forum')">Forum</button>
        <button class="trips"  @click.prevent="alert('Đã nhấn Trip')">Trips</button>
        <div class="line"></div>

        <div class="menu-container" v-if="isMenuVisible">
              <div class="menu-options">
                <button class="menu-button my-trips">My Trips</button>
                <button class="menu-button review">Review</button>
                <button class="menu-button my-favorite">My Favorite</button>
                <button class="menu-button logout">Logout</button>
              </div>
        </div>
      </div>
      <div class="line-1"></div>
      <div class="flex-row-bf">
        <button class="thing-to-do">Things to do</button>
        <button class="restaurant">Restaurant</button>
        <button class="hotel">Resort & Hotel</button>
      </div>

      <div class="flex-row-aa">
        
        <div class="line-3"></div>
      </div>
      <div class="container">
        <div class="left-panel">
            <div class="dropdown">
                <!-- Button hiển thị tên quốc gia hoặc tỉnh thành được chọn -->
                <button 
                    class="dropdown-button" 
                    :class="{ 'active': dropdownVisible }" 
                    @click="toggleDropdown">
                    {{ selectedRegion }}
                    <span class="arrow" :class="{ 'up': dropdownVisible }">▼</span>
                </button>
                
                <!-- Dropdown danh sách các lựa chọn -->
                <div class="dropdown-list" v-if="dropdownVisible">
                    <button 
                        class="dropdown-item" 
                        v-for="region in regions" 
                            :key="region" 
                            @click="selectRegion(region)">
                            {{ region }}
                    </button>
                </div>

            </div>
        </div>
        <div class="right-panel">
            <button class="back" @click="prevButton"></button>
            <div class="button-grid">
                
                <button v-for="(item, index) in visibleButtons" 
                    :key="index" class="button-item" 
                    :class="{ selected: selectedIndex === (currentIndexButton + index) }"    
                    @click="selectButton(index)"
                >
                    {{ item }}
                </button>
                
            </div>
            <button class="forward" @click="nextButton"></button>
        </div>
      </div>
      
      <div class="list-layout">
        <div v-for="(item, index) in entertainments" :key="index" class="list-item">
    
        <!-- Save Button + Heart Icon with Number (entire element) -->
        <div class="top-right">
      
          <div class="save-button" @click="toggleLikeStatus(item.id)">
            <img :src="liked[item.id] ? heartFull : heartEmpty" alt="heart icon" class="heart-icon" />
            <span class="save-text">Save</span>
          </div>
        </div>

        <!-- Image -->
        <div class="picture">
          <img :src="getImageUrl(item.imageUrl)" alt="Entertainment Image" class="entertainment-img" />
        </div>

        <!-- Info Section -->
        <div class="info">
          <span class="item-number">{{ index + 1 }}.</span>
          <h3 class="item-name">{{ item.name }}</h3>

          <div class="location">
            <i class="location-icon"></i>
            <span class="location-name">{{ item.location }}</span>
          </div>
      
          <!-- Rating -->
          <div class="rating">
            <img v-for="star in generateStars(item.rating)" :src="star" class="star" />
            <span class="rating-count">{{ item.reviewNumber }}</span>
          </div>
          <!-- Description -->
          <span class="item-description">{{ truncatedDescription(item.description) }}</span>

          <div class="quick-facts">
            <h4 class="quick-facts-title">Quick facts</h4>
  
            <!-- Tags Section -->
            <div class="fact-item">
              <span class="icon-cuisine">🍽️</span> <!-- You can replace this icon with your preferred SVG or image -->
              <span class="fact-content">
                <span v-for="(tag, index) in item.tag" :key="tag" class="tag">
                  {{ tag }}<span v-if="index < item.tag.length - 1">, </span> <!-- Adds a comma between tags -->
                </span>
              </span>
            </div>

            <!-- Price Section -->
            <div class="fact-item">
              <span class="icon-price">💰</span> <!-- Icon representing the price -->
              <span class="fact-content">Price: {{ item.price }}</span>
            </div>
          </div>
        </div>    
      </div>
    </div>     
  </div>
</template>

<script setup>
import destinationViewModel from '../viewModels/Topic_ListViewModel';

const {
    isMenuVisible,
    toggleMenu,
    
    buttons,
    visibleButtons,
    prevButton,
    nextButton,
    selectedIndex,
    selectButton,
    currentIndexButton,
    entertainments,
    generateStars,
    getImageUrl,
    liked,
    toggleLikeStatus,
    heartFull: heartFull,
    heartEmpty: heartEmpty,

    // Các biến và hàm cho chức năng chọn tỉnh thành
    regions, // Danh sách tỉnh thành
    selectedRegion, // Tỉnh thành hiện tại
    dropdownVisible, // Trạng thái dropdown
    toggleDropdown, // Hàm bật/tắt dropdown
    selectRegion, // Hàm chọn tỉnh thành

    truncatedDescription,
} = destinationViewModel();


</script>


<style>

:root {
  --default-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei",
    "Source Han Sans CN", sans-serif;
}

.main-container {
  overflow: hidden;
}

.main-container,
.main-container * {
  box-sizing: border-box;
}

input,
select,
textarea,
button {
  outline: 0;
}

.main-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: max-content;
  margin: 0 auto;
  background: #edf6f9;
  overflow: hidden;
  border-radius: 20px;
}

.flex-row-b {
  position: relative;
  width: 100%;
  height: 145px;
  margin: -2px 0 0 0;
  z-index: 30;
}

.image {
  position: absolute;
  width: 8%;
  height: 82%;
  top: 9%;
  left: 1%;
  background: url('@/assets/images/company_image.png')
    no-repeat center;
  background-size: cover;
  z-index: 27;
  border-radius: 70px;
}
.travel-tips {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  height: 40%;
  top: 30%;
  left: 12%;
  color: #1836ba;
  font-family: Jost, var(--default-font-family);
  font-size: 3vw;
  font-weight: 700;
  line-height: 100%;
  text-align: left;
  white-space: nowrap;
  z-index: 11;
}
.union {
  position: absolute;
  top: 34%;
  right: 5%;
  width: 4%; /* Đặt kích thước logo phù hợp */
  height: 34%; /* Đặt kích thước logo phù hợp */
  background: url('@/assets/personal.svg') no-repeat center;
  background-size: contain; /* Hoặc cover nếu muốn ảnh bao phủ */
  z-index: 13;
  border: none; /* Đảm bảo không có viền bao quanh logo */
}




.menu-container {
  position: absolute;
  top: 69%; 
  right: 4%; 
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 1vw;
  z-index: 9999; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; 
  max-width: 20%; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  pointer-events: auto; /* Đảm bảo có thể tương tác với menu */
}

/* Cho các phần tử khác */
.other-elements {
  pointer-events: none; /* Ngăn không cho phần tử khác chặn menu */
}




.menu-options {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Tăng khoảng cách giữa các nút */
  width: 100%; /* Bảo đảm các nút nằm gọn trong khung */
}

.menu-button {
  background-color: #1877f2; /* Màu xanh đậm giống Facebook */
  color: white; /* Màu chữ trắng */
  font-family: Poppins, var(--default-font-family);
  font-size: 1vw; /* Tăng kích thước chữ */
  font-weight: 700;
  padding: 15px 20px; /* Tăng kích thước vùng bấm */
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%; /* Đặt rộng 100% so với menu */
  text-align: center; /* Đặt chữ ở giữa */
  transition: background-color 0.3s ease; /* Hiệu ứng hover */
}

.menu-button:hover {
  background-color: #165bb7; /* Màu tối hơn khi hover */
}

.logout {
  background-color: #ff3b30; /* Màu đỏ cho nút Logout */
}

.logout:hover {
  background-color: #c73227; /* Màu đỏ tối hơn khi hover */
}




.travel-itinerary {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 14%;
  height: 100%;
  top: 0%;
  left: 68%;
  background: none;
  color: #13357b;
  font-family: Poppins, var(--default-font-family);
  font-size: 1.75vw;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  border: none;
  white-space: nowrap;
  z-index: 21;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 10%;
  height: 100%;
  top: 0%;
  left: 40%;
  background: #13357b;
  color: #f4fff8;
  font-family: Poppins, var(--default-font-family);
  font-size: 1.75vw;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  
  white-space: nowrap;
  z-index: 21;
}

.tour-proposal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 12%;
  height: 100%;
  top: 0%;
  left: 50%;
  background: none;
  color: #13357b;
  font-family: Poppins, var(--default-font-family);
  font-size: 1.75vw;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  border: none;
  white-space: nowrap;
  z-index: 21;
}
.forum {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 6%;
  height: 100%;
  top: 0%;
  left: 82%;
  background: none;
  color: #13357b;
  font-family: Poppins, var(--default-font-family);
  font-size: 1.75vw;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  border: none;
  white-space: nowrap;
  z-index: 21;
}
.trips {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 6%;
  height: 100%;
  top: 0%;
  left: 62%;
  background: none;
  color: #13357b;
  font-family: Poppins, var(--default-font-family);
  font-size: 1.75vw;
  font-weight: 700;
  line-height: 150%;
  text-align: center;
  border: none;
  white-space: nowrap;
  z-index: 21;
}

.home:hover, 
.tour-proposal:hover, 
.trips:hover, 
.travel-itinerary:hover, 
.forum:hover {
  background-color: #8c9aec;
  color: #dbe4f5;
}
.line {
  position: absolute;
  width: 100%;
  height: 2%;
  top: 99%;
  left: 0;
  background-color: #13357b;
  z-index: 15;
}
.line-1 {
  position: relative;
  width: 100%;
  height: 1%;
  margin: 0 0 0 8px;
  background-color: #13357b;
  z-index: 2;
}
.flex-row-bf {
  display: flex; /* Đặt flexbox để các nút nằm cạnh nhau */
  justify-content: 10%; /* Tạo khoảng cách đều giữa các nút */
  align-items: center; /* Căn giữa các nút theo chiều dọc */
  width: 100%; /* Tổng chiều rộng của container */
  margin: 8.01px 0 0 33px;
  z-index: 154;
}

.thing-to-do, 
.restaurant,
.hotel {
  width: 20%; /* Chiều rộng của mỗi nút */
  height: 60px; /* Chiều cao của mỗi nút */
  color: #13357b;
  font-family: Poppins, var(--default-font-family);
  font-size: 2vw;
  font-weight: 700;
  line-height: 100%;
  text-align: center;
  display: flex; /* Sử dụng Flexbox */
  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center; /* Căn giữa theo chiều dọc */
  
  background-color: transparent; /* Nền trong suốt */
  border: none; /* Loại bỏ đường viền của nút */
  
  cursor: pointer; /* Con trỏ chuyển thành tay khi hover */
}

.thing-to-do:hover, 
.restaurant:hover,
.hotel:hover {
  background-color: #f0f0f0; /* Hiệu ứng khi hover vào nút */
}
.flex-row-aa {
  position: relative;
  width: 100%;
  height: 2%;
  margin: 9.004px 0 0 0;
  z-index: 20;
}

.line-3 {
  position: absolute;
  width: 100%;
  height: 1.99px;
  top: 0px;
  left: 0;
  background-color: #13357b;
  background-size: cover;
  z-index: 16;
}



.container { 
    position: relative;
    display: flex;
    align-items: center;
    background-color: #e8f4f8;
    padding: 40px;
    height: 200px;
    top: 50px;
    left: 10%;
    right: 10%;
    border-radius: 10px;
    width: 100%;
}

.left-panel {
  width: 20%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
}

.right-panel {
  width: 70%;
  padding: 20px;
  position: relative;
  display: flex;
  justify-content: space-between; /* Căn chỉnh phần tử với khoảng cách đều */
  align-items: center; /* Căn giữa các phần tử theo chiều dọc */
  box-sizing: border-box;
}

.dropdown {
    position: relative;
    display: inline-block;
}

/* Container cho nút dropdown và danh sách */
.dropdown-container {
  position: relative;
  display: inline-block;
  
}

/* Nút dropdown */
.dropdown-button {
  background-color: #b3e5fc;
  color: #0d47a1;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 1.75vw;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
}

/* Khi nút được nhấn (dropdownVisible === true) */
.dropdown-button.active {
  background-color: #0d47a1; /* Nền xanh đậm */
  color: white; /* Chữ trắng */
}

/* Mũi tên bên phải của nút */
.dropdown-button .arrow {
  margin-left: 10px;
  font-size: 12px;
  transition: transform 0.3s;
}

/* Khi mũi tên lộn ngược (dropdownVisible === true) */
.dropdown-button .arrow.up {
  transform: rotate(180deg);
}

/* Danh sách dropdown */
.dropdown-list {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #e3f2fd;
  border-radius: 10px;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 400px; /* Giới hạn chiều cao */
  overflow-y: auto; /* Cho phép scroll dọc */
}
/* Tùy chỉnh scrollbar (chỉ hoạt động trên WebKit - Chrome, Safari) */
.dropdown-list::-webkit-scrollbar {
  width: 20px; /* Độ rộng của scrollbar */
}

.dropdown-list::-webkit-scrollbar-track {
  background: #e3f2fd; /* Màu nền của track */
  border-radius: 10px; /* Bo tròn track scrollbar */
}

.dropdown-list::-webkit-scrollbar-thumb {
  background-color: #0d47a1; /* Màu của thanh cuộn */
  border-radius: 10px; /* Bo tròn thanh cuộn */
  border: 2px solid #e3f2fd; /* Đường viền quanh thanh cuộn */
}

.dropdown-list::-webkit-scrollbar-thumb:hover {
  background-color: #1565c0; /* Màu thanh cuộn khi hover */
}
/* Từng mục trong dropdown */
.dropdown-item {
  background-color: transparent;
  color: #0d47a1;
  padding: 10px 20px;
  border: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-size: 1.5vw;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #0d47a1;
  color: #e3f2fd;
}

/* Để tùy chỉnh thêm */
.dropdown-item:focus {
  outline: none;
}

button {
  border: none; /* Loại bỏ viền mặc định của nút */
  background-color: transparent; /* Nền trong suốt */
  cursor: pointer; /* Thay đổi con trỏ khi di chuột vào */
  padding: 0; /* Loại bỏ padding mặc định */
}

.back, .forward {
  width: 5%;  /* Chiếm 5% chiều rộng */
  height: 50px; /* Điều chỉnh kích thước theo chiều cao */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
}

.back {
  background: url('@/assets/back-button.svg') center no-repeat; /* Icon cho nút back */
}

.forward {
  background: url('@/assets/forward-button.svg') center no-repeat; /* Icon cho nút forward */
}

.button-grid {
  width: 80%; 
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Chia 3 cột */
  grid-gap: 5%;  /* Khoảng cách giữa các nút */
  justify-items: center;  /* Căn giữa các nút */
}

.button-item {
  background-color: #e9eef0;
  color: #003366;
  border: 2px solid #003366;
  width: 100%;  /* Nút chiếm toàn bộ chiều rộng của cột */
  font-size: 1.75vw;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button.selected {
  background-color: #003366;
  color: white;
}
.thing-to-do-1 {
  display: block;
  position: relative;
  height: 53px;
  margin: 4.5% 0 0 8%;
  color: #000000;
  font-family: Poppins, var(--default-font-family);
  font-size: 2.5vw;
  font-weight: 700;
  line-height: 100%;
  text-align: left;
  white-space: nowrap;
  z-index: 149;
}
.list-item {
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: center;
  height: 400px; /* Fixed height for each item */
  margin-bottom: 24px; /* Space between each item */
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative; /* Make the list-item relative to position the Save button correctly */
  transition: all 0.3s ease-in-out;
}

.list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-color: #888;
}

/* Save Button + Number in the top-right of the entire element */
.top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  z-index: 99;
}

.item-number {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-right: 8px;
}

.save-button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 12px;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #f0f0f0;
}

.heart-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.save-text {
  font-size: 16px;
  color: #333;
}

/* Picture */
.picture {
  width: 30%;
  height: 100%; /* Ensure picture takes full height */
  position: relative;
}

.entertainment-img {
  width: 100%;
  height: 100%; /* Full height image */
  object-fit: cover; /* Ensures the image covers the area without distortion */
  border-radius: 20px 0 0 20px;
}

/* Info Section */
.info {
  padding: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #003366;
}

.item-name {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 8px;
}

.rating {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.rating img {
  width: 20px;
  height: 20px;
}

.rating-count {
  margin-left: 8px;
  font-size: 16px;
}

.item-description {
  font-size: 1.25vw;
  color: #003366;
}

.location-icon::before{
  content: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE0IDE4Ij4KICA8cGF0aCBkPSJNMTIgN2MwIDMuMzEtNiA5LTYgOUMyIDExLjMxIDAgOS4zMSAwIDdjMC0zLjMxIDItNiA2LTZzNiAyLjY5IDYgNnptLTYtN2MtMS42NiAwLTMgMS4zNC0zIDNzMS4zNCAzIDMgM2MxLjY2IDAgMy0xLjM0IDMtM3MtMS4zNC0zLTMtM3oiIGZpbGw9IiMwMDAwZmYiLz4KPC9zdmc+Cg==');
}
.location-name{
  font-size: 1.25vw;
  text-decoration: underline;
  color: #003366;
}

.quick-facts {
  margin-top: 20px;
}

.quick-facts-title {
  font-size: 1.5vw;
  font-weight: bold;
  color: #003366;
  margin-bottom: 10px;
}

.fact-item {
  display: inline-flex;
  align-items: center;
  background-color: #ecebeb; /* Light grey background similar to the image */
  padding: 10px 15px;
  border-radius: 25px;
  margin-right: 10px; /* Space between fact items */
}

.icon-cuisine, .icon-price {
  font-size: 1.25vw; /* Adjust this based on your desired icon size */
  margin-right: 8px; /* Space between icon and text */
}

.fact-content {
  font-size: 1vw;
  color: #003366;
}

.tag {
  display: inline-block;
  font-size: 1vw;
  color: #003366;
}

</style>