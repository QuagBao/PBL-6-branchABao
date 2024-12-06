<template>
    <div class="container-fluid ">
        <Trips_Item_no_date class="custom"/>
        <Trips_Item_no_date class="custom"/>
        <Trips_Item class="custom"/>
        <Trips_Item class="custom"/>
    </div>
</template>

<script>
import Scroll_Bar_Component from '../../Scroll_Bar_Component.vue';
import Trips_Item from '../../Profile_Page/Trips_Item.vue';
import Trips_Item_no_date from '../../Profile_Page/Trips_Item_no_date.vue';
export default {
    name: "Trip_List",
    components: {
        Trips_Item, Trips_Item_no_date
    },
}
</script>

<style scoped>
.frame {
    display: flex;
    flex-direction: column;
}
:deep(.custom .ava) {
    margin-top: -10px;
    margin-bottom: -9.5px;
    margin-left: 2.5px;
}
</style>