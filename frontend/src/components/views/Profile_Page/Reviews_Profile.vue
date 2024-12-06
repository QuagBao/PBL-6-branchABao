<template>
    <div class="container-fluid reviews">
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
        <Content_review></Content_review>
    </div>
</template>

<script>
import Content_review from './Content_review.vue';
export default {
    name: "Reviews_Profile",
    components: {
        Content_review
    }
}
</script>

<style scoped>
.reviews {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>