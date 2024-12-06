<template>
    <div class="frame-item">
        <div class="frame-image">
            <img class="img" src="@/assets/images/tms-hotel-da-nang-beach.jpg" alt="">
        </div>
        <div class="container-fluid frame-info d-flex flex-column justify-content-start">
            <h5 class="name-of-destination">Hotel Da Nang</h5>
            <div class="frame-rating">
                <div class="rating">
                    <img src="@/assets/svg/star_full.svg" alt="">
                    <img src="@/assets/svg/star_full.svg" alt="">
                    <img src="@/assets/svg/star_full.svg" alt="">
                    <img src="@/assets/svg/star_full.svg" alt="">
                    <img src="@/assets/svg/star_full.svg" alt="">
                </div>
                <div class="reviews">
                    <p>/10 reviews</p>
                </div>
            </div>
            <div class="frame-tags d-flex align-items-center gap-5">
                <div class="tag-item d-flex align-items-end gap-3">
                    <svg fill="#13357B" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 17.011719 3.0214844 L 16.099609 4.6816406 C 13.925337 8.6341175 
                        11.752154 12.584804 9.578125 16.537109 L 7.6621094 14.621094 L 7.0019531 
                        15.71875 C 5.0489841 18.973698 3.0956556 22.230199 1.1425781 25.486328 L 
                        0.234375 27 L 2 27 L 31.517578 27 L 30.919922 25.605469 C 29.919963 23.272564 
                        28.919963 20.938564 27.919922 18.605469 L 27.337891 17.248047 L 25.269531 
                        19.316406 C 22.803333 14.44792 20.334132 9.5793478 17.867188 4.7109375 L 
                        17.011719 3.0214844 z M 16.939453 7.3027344 C 17.952378 9.3017082 18.965829 
                        11.299996 19.978516 13.298828 L 19.205078 13.962891 L 16.925781 12.009766 L 
                        14.646484 13.962891 L 13.716797 13.164062 C 14.791046 11.210336 15.864885 
                        9.2563086 16.939453 7.3027344 z M 16.925781 14.642578 L 19.205078 16.595703 L 
                        20.908203 15.136719 C 21.974522 17.24151 23.041208 19.346257 24.107422 21.451172 
                        L 24.730469 22.683594 L 26.662109 20.751953 C 27.268948 22.167887 27.875558 
                        23.583992 28.482422 25 L 3.765625 25 C 5.1965747 22.614689 6.6276315 20.230552 
                        8.0585938 17.845703 L 10.046875 19.833984 L 10.689453 18.667969 C 11.370357 
                        17.430195 12.051768 16.192896 12.732422 14.955078 L 14.646484 16.595703 L 
                        16.925781 14.642578 z"/>
                    </svg>
                    <h6>Mountain</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Itinerary_Item",
}
</script>

<style scoped>
.frame-item {
    display: flex;
    flex-direction: row;
    padding: 15px;
    gap: 15px;
    transition: 0.7ms ease-in-out;
}
.frame-item:hover {
    cursor: pointer;
    transition: 0.7ms ease-in-out;
    transform: translateY(-5px);
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    border-radius: 15px;
}
.frame-image {
    display: flex;
}
.img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}
.frame-info {
    color:#13357B;
    margin-bottom: 10px;
}
h5 {
    font-weight: 600;
}
.frame-rating {
    display: flex;
    gap: 10px;
    font-size: 20px;
    margin-top: -5px;
}
.frame-rating img {
    width: 20px;
    height: 20px;
}
.reviews {
        margin-top: 3px;
}
.frame-tags{
    margin-top: -10px;
}

</style>