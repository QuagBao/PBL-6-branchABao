<template>
    <Swiper class="swiper"
            :slides-per-view="3"
            :space-between="30"
            :grid="{ rows: 2, fill: 'row' }"
            pagination >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
      <SwiperSlide>Slide 10</SwiperSlide>
    </Swiper>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/grid';
  import 'swiper/css/pagination';
  
  </script>
  
  <style scoped>
  .swiper {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: calc((100% - 30px) / 2);
  
    /* Center slide text vertically */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  </style>
  