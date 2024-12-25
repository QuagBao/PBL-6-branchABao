<template>
    <div class="container-fluid-1">
        <div class="container-fluid">
            <div class="container-fluid frame-title" style="width: 1480px;">
                <h1>Trip Saved</h1>
                <h5>Your selections have been saved to a trip.</h5>
            </div>

            

            <div class="container-fluid frame-button px-5 py-2">
                <button class="button back" @click="goBack" >Back</button>
                <button type="submit" @click="goView" class="button next-button">View trip</button>
            </div>
        </div>
    </div>
</template>

<script>
import Scroll_Bar_Component from '../Scroll_Bar_Component.vue';


export default {
    name: "Page_7",
    data() {
        return {
            id: this.$route.params.id // Lấy ID từ route params
        };
    },
    mounted() {
        console.log('ID received via params:', this.id); // Kiểm tra giá trị ID
    },
    methods: {
        goBack() {
            this.$router.push({ name: 'Page_5' });
        },
        goView() {
            if (this.id) {
                this.$router.push({ path: `/Trip/${this.id}` });
            } else {
                console.error("Trip ID is not defined");
            }
        },
    },
};
</script>



<style scoped>
.container-fluid-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
.frame-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: top; 
    margin-top: -300px;
    color: #00B4D8;
}
.frame-title h1{
    font-weight: 900;
    font-size: 60px;
}
.frame-title h5{
    color: #13357B;
}
.frame-name{
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
}
:deep(.custom .ava) {
    margin-top: -10px;
    margin-bottom: -9.5px;
    margin-left: 2.5px;
}
.frame-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 45px;
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