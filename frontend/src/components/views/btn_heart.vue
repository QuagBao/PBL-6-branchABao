<template>
    <button :class="{ active: isActive, hover: isHovered }"
            @click.stop="toggleActive"
            @mouseover="isHovered = true"
            @mouseleave="isHovered = false">
        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="#curentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</template>

<script>
export default {
    name: "btn_heart",
    data() {
        return {
            isActive: false,
            isHovered: false
        };
    },
    methods: {
        toggleActive() {
            this.isActive = !this.isActive;
        }
    }
};
</script>

<style scoped>
button {
    background-color: #EDF6F9;
    fill: #EDF6F9;
    stroke: #13357B;
    border: none;
    border-radius: 50%;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    z-index: 16;
    transition: 0.5s;
}

button.hover:not(.active) {
    background-color: #CAF0F8;
    stroke: #E63946;
    fill: #CAF0F8;
    z-index: 16;
}

button.active {
    background-color: #CAF0F8;
    stroke: #E63946;
    fill: #E63946;
    z-index: 16;
}
</style>