<template>
    <div class="container-fluid cards">
        <div class="container">
            <div class="row p-2">
                <div class="container-fluid p-2 img-room">
                    <img src="@/assets/image/company/Vinpearl/images/room.jpg" alt="pic" class="img-location"/>
                </div>

            </div>
        </div>
        <div class="container name-of-room">Standard Room</div>

        <div class=" container info-location p-2">
            <div class="container info-room p-3">
                <div class="container">
                    <span>Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo ...</span>
                </div>
            </div>
            <div class="container">
                <div class="container">
                    <button class="read-more-or-less" @click="toggleReadMore">{{ isReadMore ? 'Read less' : 'Read more' }}</button>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>

export default {
    name: "Card_room",
}

</script>

<style scoped>
.container-fluid{
    display: grid;
    color: #13357B;
    height: 100%;
}
.cards:hover{
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
img {
    width: 100%;
    height: 350px;
    object-fit: cover;
}
.name-of-room{
    font-weight: 900;
    font-size: 20px;
    margin-left: 15px;
}
.read-more-or-less{
    color: #13357B;
    background: none;
    border: none;
    margin-left: -0.5%;
    font-size: 18px;
    font-weight: 700;
    appearance: none;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
}
.read-more-or-less:hover{
    color: #729AE9;
}
</style>