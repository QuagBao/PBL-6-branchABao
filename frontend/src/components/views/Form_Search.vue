<template>
    <div class="container-fluid search">
        <h1 class="title">{{ name_of_page }}</h1>
        <div class="container-fluid position-relative">
            <input class="form-control" type="text" :placeholder= "name" v-model="searchQuery">
            <button type="button" class="btn btn-primary">Search</button>
        </div>
    </div>            
</template>

<script>
    export default {
        name: "Form_search",
        props: {
            name_of_page: String,
            name: String
        }
    }
</script>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../viewModels/Restaurant_ListViewModel';
  
const {
    searchQuery
} = destinationViewModel();
</script>

<style scoped>
.search{
    display: flex;
    flex-direction: column;
    gap: 50px;
}
.search .title {
    color: #EDF6F9;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
}
.form-control::placeholder,
.form-control:focus{
    color: #13357B;
}
.form-control {
    display: block;
    width: 100%;
    padding: 1.5rem 1.5rem 1.5rem 3rem ;
    border: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #13357B;
    background-color: #EDF6F9;
    border-radius: 40px;
}
input:focus, input:hover {
  outline: none;
  background-color: #caf0f8;
  color: #13357B;
  padding-left: 3rem;
}
.btn-primary {
    top : 50%;
    right: 25px;
    transform: translateY(-50%);
    box-shadow: inset 0 0 0 0 #13357B;  
    border-radius: 50rem;
    font-weight: 600;
    transition: all 0.5s;
    position: absolute;
    color: #EDF6F9;
    background-color: #13357B;
    border: 0;
    border-color: #13357B;
    padding: .5rem 1.5rem;
    margin-right: .5rem;
    display: inline-block;
    line-height: 1.5;
}
button {
    justify-content: center;
    margin: 0;
    border: none;
    font-size: 100%;
    border-radius: 10px;
    text-transform: none;
    background-color: transparent;
}
.btn-primary:hover {
    color: #13357B;
    background-color: #EDF6F9;  
    border: 2px solid #13357B;
}
</style>