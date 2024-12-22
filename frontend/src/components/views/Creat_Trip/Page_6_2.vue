<template>
    <div class="container-fluid">
        <div class="container-fluid p-2">
            <div class="container-fluid frame-title" style="width: 1480px;">
                <svg fill="#currentColor" width="60px" height="60px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 14 3 C 12.90625 3 12 3.90625 12 5 L 12 6 L 9 6 L 9 5 L 7 5 L 7 6 L 5 6 C 3.90625 6 3 6.90625 3 8 L 3 24 C 3 25.09375 3.90625 26 5 26 L 27 26 C 28.09375 26 29 25.09375 29 24 L 29 8 C 29 6.90625 28.09375 6 27 6 L 25 6 L 25 5 L 23 5 L 23 6 L 20 6 L 20 5 C 20 3.90625 19.09375 3 18 3 Z M 14 5 L 18 5 L 18 6 L 14 6 Z M 5 8 L 27 8 L 27 24 L 25 24 L 25 9 L 23 9 L 23 24 L 9 24 L 9 9 L 7 9 L 7 24 L 5 24 Z"/>
                </svg>
                <h1>My trip</h1>
            </div>
            <div class="container title-save d-flex flex-column gap-1">
                <h4>Save to trip</h4>
                <Trip_List/>
            </div>
            <div class="container-fluid frame-button px-5">
                <button class="button back" @click="goBack" >Back</button>
                <button class="button back" @click="goCreate" >Create a trip</button>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';
import Trip_List from '../Trip/Trip_List.vue';
export default {
    name: "Page_6_2",
    components: {
        Trip_List
    },
    methods: {
        // Method for 'Back' button (to go to the previous page)
        goBack() {
            this.$router.push({name: 'Page_5'}); // This will take the user to the previous page in the history
        },
        goCreate() {
            this.$router.push({name: 'Page_6_1'}); // This will take the user to the previous page in the history
        },
    }
}
</script>


<style scoped>
.frame-title{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    color: #00B4D8;
    gap: 20px;
    padding-left: 20px;
}
.frame-title h1{
    font-weight: 900;
    font-size: 60px;
}
.frame-title svg{
    fill: #00B4D8;
}
.title-save{
    margin-top: 40px;
    color: #13357B;
    padding: 0 0 0 25px;
}
.title-save h4{
    font-weight: 900;
    font-size: 30px;
}
.frame-save{
    margin-top: 50px;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
}
.button {
    padding: 10px 50px;
    border: none;
    border-radius: 30px;
    background-color: #00B4D8;
    color: #EDF6F9;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.2);
}
button:hover {
    background-color: #13357B;
    color: #EDF6F9
}
</style>