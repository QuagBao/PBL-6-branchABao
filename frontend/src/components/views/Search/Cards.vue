<template>
  <div class="container-fluid cards">
    <div class="row p-2">
      <!-- Image Section (30% width) -->
      <div class="col-3 p-2 img-location">
        <img :src="imageUrl" alt="pic" class="img-location" />
      </div>

      <!-- Content Section (60% width) -->
      <div class="col-6 p-2 content-section">
        <!-- Location Name and Category -->
        <div class="name-category p-2">
          <h3>{{ name }}</h3>
        </div>

        <!-- Rating Section -->
        <div class="rating p-2">
          <div class="stars">
            <img v-for="(star, index) in stars" :key="index" :src="star" alt="Star" class="star" />
          </div>
          <div class="rating-info">
            <div class="rating-value">
              <span class="star-icon">⭐</span> {{ rating }}
            </div>
            <div class="rating-count">
              ({{ ratingCount }} reviews)
            </div>
          </div>
        </div>

        <!-- Description Section -->
        <div class="description p-2">
          <p>{{ description }}</p>
        </div>
      </div>

      <!-- Heart Icon Section (10% width) -->
      <div class="col-1 p-2">
        <div class="btn-heart">
          <btn_heart :destID="destID" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import btn_heart from "../btn_heart.vue";

export default {
  name: "Cards",
  components: {
    btn_heart,
  },
  props: {
    imageUrl: String,
    destID: Number,
    name: String,
    rating: Number,
    stars: Array,
    tags: Array,
    description: String,
    ratingCount: Number,
  },
};
</script>

<style scoped>
.container-fluid {
  display: block;
  color: #13357b;
  height: 100%;
}

.img-location {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 15px;
}

.cards {
  display: flex;
  flex-direction: row;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  transition: 0.75s ease-in-out;
}

.cards:hover {
  cursor: pointer;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #f7f7f7;
}

.content-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-heart {
  text-align: right;
  margin-top: 10px;
}

.name-category h5 {
  font-weight: 600;
  font-size: 14px;
  color: #999;
}

.name-category h3 {
  font-weight: 900;
  font-size: 18px;
  margin: 5px 0;
}

.rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  margin-right: 10px;
}

.rating img {
  width: 18px;
  height: 18px;
}

.rating span {
  font-size: 14px;
  color: #666;
}

.description p {
  font-weight: 400;
  font-size: 14px;
  color: #666;
}

.cards:hover .description p {
  color: #000;
}

.row {
  display: flex;
  width: 100%;
  margin: 0;
}

.col-3 {
  flex: 0 0 30%;
  max-width: 30%;
}

.col-6 {
  flex: 0 0 60%;
  max-width: 60%;
}

.col-1 {
  flex: 0 0 10%;
  max-width: 10%;
}

.p-2 {
  padding: 10px;
}

.star {
  margin-right: 2px;
}

.rating-info {
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;
}

.rating-value {
  font-size: 18px;
  font-weight: bold;
  color: #FFA500; /* Màu vàng cho ngôi sao */
  margin-right: 5px;
}

.star-icon {
  font-size: 18px;
  margin-right: 2px;
}

.rating-count {
  font-size: 14px;
  color: #666; /* Màu xám nhạt */
}
</style>
