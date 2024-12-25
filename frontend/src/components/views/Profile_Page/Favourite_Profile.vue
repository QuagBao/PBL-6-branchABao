<template>
    <div class="container-fluid frame-items">
        <div class="list-favourite-items">
            <Favourite_Item v-for="destID in likes"
                            :key="destID"
                            :destID="destID" />
        </div>
    </div>
  </template>

<script setup>
import DestinationLike from '../../viewModels/DestinationLikeViewModel';
import { ref, computed, onMounted, watch } from 'vue';
const {
        likeList,
} = DestinationLike();
const likes = ref([]);
onMounted(async () => {
    likes.value =  await likeList();
});

</script>
<script>
import Favourite_Item from './Favourite_Item.vue';
export default {
    name: "Favourite_Profile",
    components: {
        Favourite_Item
    }
}
</script>

<style scoped>
.frame-items {
    margin-top: 50px;
    margin-bottom: 50px;
}
.list-favourite-items {
    display: grid;
    column-gap: 10%;
    row-gap: 1%;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
}
</style>