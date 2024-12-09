<template>
    <div class="container-fluid-1">
        <div class="row">
            <div class="col-sm-4 p-2">
                <img :src="destination?.images && destination.images[0] ? destination.images[0].url : '/blue-image.jpg'" alt="pic" class="img-location"/>
            </div>
            <div class="col-sm-8 p-2">
                <div class="name-of-location">
                    <span>{{ destination?.name }}</span>
                </div>

                <div class="rating">
                    <div v-for="(star, index) in generateStars(destination?.rating)" :key="index">
                        <img :src="star" alt="Star" class="star"/>
                    </div>
                </div>

                <div class="row-of-address">
                    <div class="col-sm-10 address-of-location">
                        <span>{{ destination?.address?.district }}, {{ city?.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import UserReviewViewModel from '../../viewModels/UserReviewViewModel';
import generateViewModel from '../../viewModels/generate_ratingViewModel';


// Khai báo props
const props = defineProps({
  destID: {
    type: Number,
    required: true,
  },
});

const { loadDestination, loadCity } = UserReviewViewModel();
const {
    generateStars,
  } = generateViewModel();
const destination = ref(null);
const city = ref(null);

// Tải dữ liệu khi component được mount
onMounted(async () => {
    // Sử dụng props.destID thay vì destID
    destination.value = await loadDestination(props.destID);
    city.value = await loadCity(destination.value.address.city_id);
});
</script>
<script>
export default {
    name: "tag_location_review",

}
</script>

<style scoped>
.container-fluid-1 .row{
    background-color: #CAF0F8;
    width: 350px;
    color: #13357B;
    border-radius: 13px;
    border: 1px solid #13357B;
}
.container-fluid .row .col-sm-4 img{
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    object-fit: cover;
    border-radius: 10px;
}

.container-fluid .row .col-sm-8{
    top: 25px;
    left: 180px;
}
.rating{
    display: flex;
    margin: 0px 0 0 5px;
}

.rating img{
    width: 10px;
    height: 10px;
    margin-right: 2px;
}

    
.name-of-location span{
    font-size: 15px;
    font-weight: 700;
}

.icon {
    width: 20px;
}
</style>