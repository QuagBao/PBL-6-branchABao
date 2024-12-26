<template>
    <div class="trip-item">
        <div class="row align-items-center">
            <!-- Hình ảnh chiếm 20% -->
            <div class="col-sm-2 p-2">
                <img src="@/assets/images/tms-hotel-da-nang-beach.jpg" alt="Avatar" class="img-fluid rounded" />
            </div>
            <!-- Nội dung chữ chiếm 80% -->
            <div class="col-sm-10 p-2">
                <div class="name-of-trip">
                    <span>{{ trip?.name }}</span>
                </div>
                <div class="row info-of-trip">
                    <div class="col-sm-4 date-of-trip d-flex align-items-center">
                        <svg fill="#13357B" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.000,32.000 L2.000,32.000 C0.897,32.000 -0.000,31.103 -0.000,30.000 L-0.000,5.000 C-0.000,3.897 0.897,3.000 2.000,3.000 L10.000,3.000 L10.000,1.000 C10.000,0.448 10.448,-0.000 11.000,-0.000 C11.552,-0.000 12.000,0.448 12.000,1.000 L12.000,3.000 L20.000,3.000 L20.000,1.000 C20.000,0.448 20.448,-0.000 21.000,-0.000 C21.552,-0.000 22.000,0.448 22.000,1.000 L22.000,3.000 L30.000,3.000 C31.103,3.000 32.000,3.897 32.000,5.000 L32.000,30.000 C32.000,31.103 31.103,32.000 30.000,32.000 ZM22.000,5.000 L22.000,6.000 C22.000,6.552 21.552,7.000 21.000,7.000 C20.448,7.000 20.000,6.552 20.000,6.000 L20.000,5.000 L12.000,5.000 L12.000,6.000 C12.000,6.552 11.552,7.000 11.000,7.000 C10.448,7.000 10.000,6.552 10.000,6.000 L10.000,5.000 L2.000,5.000 L2.000,30.000 L29.997,30.000 L30.000,5.000 L22.000,5.000 Z"/>
                        </svg>
                        <span>{{ trip?.month_time }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Trip_Item",
    props: {
        trip: Object,
    }
}
</script>

<style scoped>

.trip-item {
    width: 80vw;
    margin: 20px 0;
    background-color: #CAF0F8;
    color: #13357B;
    border-radius: 10px;
    outline: 2px solid #13357B;
    transition: all 0.3s ease-in-out;
}

.img-container img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
}

.trip-item:hover {
    cursor: pointer;
    transition: 0.7ms ease-in-out;
    transform: translateY(-5px);
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.img-fluid {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
}
.name-of-trip span{
    font-size: 1.5rem;
    font-weight: 800;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.date-of-trip{
    display: inline-flex;
    align-items: center;
    margin: 0px 0 0 0px;
}

.date-of-trip span{
    font-size: 1rem;
    gap: 10px;
    margin-left: 10px;
}

.date-of-trip button{
    font-size: 1rem;
    font-weight: 800;
    color: #13357B;
    background-color: transparent;
    border: none;
    border-radius: 10px;
    padding: 10px 10px;
    text-decoration: underline;
    margin: 0 0 0 10px;
}

.date-of-trip button:hover{
    color: #CAF0F8;
    background-color: #13357B;
} 
</style>