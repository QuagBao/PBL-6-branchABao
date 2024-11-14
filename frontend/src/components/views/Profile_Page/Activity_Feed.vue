<template>
    <div class="container-fluid activity-feed">
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
        <Content_Trip></Content_Trip>
        <Content_review></Content_review>
    </div>
</template>

<script>
import Content_review from './Content_review.vue';
import Content_Trip from './Content_Trip.vue';
export default {
    name: "Activity_Feed_Profile",
    components: {
        Content_Trip, Content_review
    }
}
</script>

<style scoped>
.activity-feed {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>