<template>
    <button>
        <svg fill="currentColor" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
            <path d="M475.4,121.8H359.6l-12.2-36.6c0-20.2-16.4-36.6-36.6-36.6H201.1c-20.2,0-36.6,16.4-36.6,36.6l-12.2,36.6H36.6
                C16.4,121.8,0,138.2,0,158.4v219.4c0,20.2,16.4,36.6,36.6,36.6h438.9c20.2,0,36.6-16.4,36.6-36.6V158.4
                C512,138.2,495.6,121.8,475.4,121.8z M256,377.8c-60.6,0-109.7-49.1-109.7-109.7c0-60.6,49.1-109.7,109.7-109.7
                c60.6,0,109.7,49.1,109.7,109.7C365.7,328.6,316.6,377.8,256,377.8z M475.4,194.9c0,10.1-8.2,18.3-18.3,18.3h-18.3
                c-10.1,0-18.3-8.2-18.3-18.3v-18.3c0-10.1,8.2-18.3,18.3-18.3h18.3c10.1,0,18.3,8.2,18.3,18.3V194.9z M256,194.9
                c-40.4,0-73.1,32.7-73.1,73.1s32.7,73.1,73.1,73.1s73.1-32.7,73.1-73.1S296.4,194.9,256,194.9z"/>
        </svg>
    </button>
</template>

<script>
    export default {
        name: "Icon",
    }
</script>

<style scoped>
button {
    background-color: #CAF0F8;
    color: #13357B;
    border: none;
    border-radius: 50%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    z-index: 16;
}

button:hover {
    background-color: #13357B;
    color: #CAF0F8;
    fill: #CAF0F8;
    z-index: 16;
}

</style>