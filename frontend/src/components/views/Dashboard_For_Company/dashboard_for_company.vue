<template>
    <div class="container-fluid header" style="z-index: 9999;">
        <Header/>
    </div>

    <div class="container-fluid-carousel">
        <div class="carousel-header">
            <!-- Carousel -->
            <div id="carouselId" class="carousel slide" data-bs-ride="carousel">

            <!-- The slideshow/carousel -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="@/assets/image/company/Vinpearl/images/vinpearl.webp" alt="City 1" class="img-fluid">
                </div>
                <div class="carousel-item">
                    <img src="@/assets/image/company/Vinpearl/images/vinpearl_1.webp" alt="City 1" class="img-fluid">
                </div>
                <div class="carousel-item">
                    <img src="@/assets/image/company/Vinpearl/images/vinpearl_2.webp" alt="City 1" class="img-fluid">
                </div>
            </div>

            <!-- Left and right controls/icons -->
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                <span class="carousel-control-prev-icon btn"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                <span class="carousel-control-next-icon btn"></span>
            </button>
            </div>
        </div>
    </div>

    <div class="container-fluid">
        <div class="container">
            <div class="position-relative">
                <input class="form-control" type="text" placeholder="Where do you want to go?">
                <button type="button" class="btn btn-primary">Search</button>
            </div>
        </div>
    </div>

    <div class="container-fluid" style="margin-top: 100px; color: #13357B;">
        <div class="container">
            <div class="mx-auto text-center p-5">
                <h2 class="section-title px-5 ">Room & Rates</h2>
                <h4 class="mb-0" style="margin-top: 20px;">Popular Room</h4>
            </div>

            <div class="container-fluid list-card-rooms">
                <Card_room/> <Card_room/> <Card_room/>
            </div>
        </div>
    </div>

    <div class="container-fluid" style="margin-top: 100px; color: #13357B;">
        <div class="container">
            <div class="mx-auto text-center p-5">
                <h2 class="section-title px-5 ">Our services</h2>
                <h6 class="mb-0" style="margin-top: 20px;">Info about of service of hotels provide</h6>
            </div>

            <div class="container-fluid list-our-services">
                
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../Header.vue';
    import Card_room from './Card_room.vue';
    export default {
        name: "Dashboard_For_Company",
        components: {
            Header, Card_room
        }   
    } 
</script>

<style scoped>

.position-relative {
    position: relative;
    background: rgba(19, 53, 123, 0.8);
    border-radius: 50rem;
    padding: 3rem;
    margin-right: auto;
    margin-left: auto;
    margin-top: -78px;
    width: 100%;
}
.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    padding-left: 1.5rem;
    padding-right: 3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #13357B;
    background-color: #EDF6F9;
    background-clip: padding-box;
    border: 2px solid #EDF6F9;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 30px;
    transition: border-color 0.15s ease-in-out, 
    box-shadow 0.15s ease-in-out;
}
.form-control::placeholder,
.form-control:focus{
    color: #13357B;
}

.btn-primary {
    top : 50%;
    right: 46px;
    transform: translateY(-50%);
    box-shadow: inset 0 0 0 0 #13357B;  
    border-radius: 50rem;
    font-weight: 600;
    transition: all 0.5s;
    position: absolute;
    color: #fff;
    background-color: #13357B;
    border: 0;
    border-color: #13357B;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.5rem;    
    padding-right: 1.5rem;
    margin-right: 1rem;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
}
.btn-primary:hover {
    color: #13357B;
    background-color: #EDF6F9;  
    border: 2px solid #13357B;
}
.carousel-item img{
    height: 600px;
    object-fit: cover
}
.carousel-item{
    height: 600px;
}
.section-title {
    position: relative;
    display: inline-block;
    color: #13357B;
    text-transform: uppercase;  
    /* font-size: 30px; */
    font-weight: 700;
}

.section-title::before {
    position: absolute;
    content: "";
    width: 100px;
    top: 50%;
    left: 0;
    border-radius: 5px;
    transform: translateY(-50%); 
    margin-left: -150px;   
    border: 2px solid #13357B;
}
.section-title::after{
    position: absolute;
    content: "";
    width: 100px;
    top: 50%;
    right: 0;
    border-radius: 5px;
    transform: translateY(-50%); 
    margin-right: -150px;   
    border: 2px solid #13357B;
}
.list-card-rooms{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    width: 100%;
    height: 100%;
    gap:40px;
}
</style>

