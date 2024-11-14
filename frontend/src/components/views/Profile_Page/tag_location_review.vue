<template>
    <div class="container-fluid-1">
        <div class="row">
            <div class="col-sm-4 p-2">
                <img src="@/assets/images/tms-hotel-da-nang-beach.jpg" alt="Avatar" class="ava"/>
            </div>
            <div class="col-sm-8 p-2">
                <div class="name-of-location">
                    <span>TMS Hotel Da Nang Beach</span>
                </div>

                <diV class="rating">
                    <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
                    <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
                    <img src="@/assets/svg/circle-full.svg" alt="Circle" class="circle"/>
                    <img src="@/assets/svg/circle-half.svg" alt="Circle" class="circle"/>
                    <img src="@/assets/svg/circle-none.svg" alt="Circle" class="circle"/>
                </diV>

                <div class="row-of-address">
                    <div class="col-sm-2 icon-of-type">
                        <img src="@/assets/svg/bed-3-svgrepo-com.svg" alt="Icon" class="icon"/>
                    </div>
                    <div class="col-sm-10 address-of-location">
                        <span>Hoi An, Da Nang</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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