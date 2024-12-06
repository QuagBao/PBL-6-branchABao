<template>
    <div class="container-fluid list-favourite-items">
        <Favourite_Item/>
        <Favourite_Item/>
        <Favourite_Item/>
        <Favourite_Item/>
        <Favourite_Item/>
        <Favourite_Item/>
    </div>
</template>

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
.list-favourite-items {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>