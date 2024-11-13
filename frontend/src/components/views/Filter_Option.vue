<template>
    <div class="container-fluid">
        <div class="container left-panel">
            <div class="filter-section">
                <div class="filter-item"
                    @click = "toggleOptions('establishment-type-options')"
                    :class="{ active: activeOption === 'establishment-type-options' }">
                    Establishment Type
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </div>

                <div v-if="activeOption === 'establishment-type-options'" class="options">
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="restaurant" v-model="isChecked"/>
                        <label class="label" for="restaurant">Restaurant</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="coffee-tea" />
                        <label class="label" for="coffee-tea">Coffee & Tea</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="bar-pubs" />
                        <label class="label" for="bar-pubs">Bar & Pubs</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="dessert" />
                        <label class="label" for="dessert">Dessert</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="bakeries" />
                        <label class="label" for="bakeries">Bakeries</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="delivery-only" />
                        <label class="label" for="delivery-only">Delivery Only</label>
                    </div>
                </div>
                    
                <div class="filter-item"
                    @click = "toggleOptions('meals-options')"
                    :class="{ active: activeOption === 'meals-options' }">
                    Meals
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </div>
                <div v-if="activeOption === 'meals-options'" class="options">
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="breakfast" />
                        <label class="label" for="breakfast">Breakfast</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="brunch" />
                        <label class="label" for="brunch">Brunch</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="lunch" />
                        <label class="label" for="lunch">Lunch</label>
                    </div>
                    <div :class="{'option': true, 'checked': isChecked}">
                        <input type="checkbox" id="dinner" />
                        <label class="label" for="dinner">Dinner</label>
                    </div>
                </div>


                <div class="filter-item"
                    @click = "toggleOptions('price-options')"
                    :class="{ active: activeOption === 'price-options' }">
                    Price
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </div>

                <div v-if="activeOption === 'price-options'" class="options">
                    <div class="currency-options">
                        <label class="label"><input type="radio" name="currency" value="VND" checked @change="handleCurrencyChange('VND')"> VNĐ</label>
                        <label class="label"><input type="radio" name="currency" value="USD" @change="handleCurrencyChange('USD')"> USD</label>
                    </div>
                    <div class="price-inputs">
                        <input type="number"
                                v-model="minPrice" @input="updateSliderFromInput('min')"
                                :placeholder="currency === 'USD' ? 'Min Price (USD)' : 'Min Price (VNĐ)'" 
                                min="0"/>
                        <span>-</span>
                        <input type="number" v-model="maxPrice"
                                @input="updateSliderFromInput('max')"
                                :placeholder="currency === 'USD' ? 'Max Price (USD)' : 'Max Price (VNĐ)'"
                                min="0"/>
                    </div>

                    <div id="price-slider" class="range-slider"></div>

                    <div class="price-labels">
                        <p class="col text-start">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(minPrice) }}</p>
                        <span class="col">-</span>
                        <p class="col text-end">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(maxPrice) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../viewModels/Restaurant_ListViewModel';

const {
    isMenuVisible, toggleMenu, buttons, selectedIndices, selectButton,
    entertainments, generateStars, getImageUrl,
    liked, toggleLikeStatus, heartFull, heartEmpty,
    currency, minPrice, maxPrice, setupSlider, updatePrice, handleCurrencyChange,
    activeOption, toggleOptions, searchQuery, updateSliderFromInput
} = destinationViewModel();

// Khởi tạo slider khi component được mount
watch(activeOption, (newValue) => {
    console.log('Active Option Changed:', newValue);
    if (newValue === 'price-options') {
        setupSlider();
    }
});
watch(activeOption, async (newValue) => {
    if (newValue === 'price-options') {
        await nextTick(); // Đợi cho DOM cập nhật
        setupSlider();
    }
});
</script>

<script>
import FilterViewModel from '@/components/viewModels/FilterViewModel';
export default {
    data() {
        return {
            FilterViewModel: new FilterViewModel(),
        };
    },
    methods: {
        toggleEstablishmentType(id) {
            this.FilterViewModel.toggleEstablishmentType(id);
        },
        toggleMeal(id) {
            this.FilterViewModel.toggleMeal(id);
        },
        handleCurrencyChange(currency) {
            this.FilterViewModel.handleCurrencyChange(currency);
        },
        updateSliderFromInput(type) {
            const {minPrice, maxPrice} = this.FilterViewModel;
            if (type === 'min') {
                this.FilterViewModel.updatePriceRange(minPrice, maxPrice);    
            } else if (type === 'max') {
                this.FilterViewModel.updatePriceRange(minPrice, maxPrice);
            }
            
        }
    }
};
</script>

<style scoped>
.filter-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    margin-top: 0px;
    padding: 30px;
    border-radius: 25px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
.filter-item {
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    color: #13357B;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 0.3s;
    gap: 50px;
    font-size: 25px;
    width: 100%;
}
.filter-item svg{
    stroke: #13357B;
}
.filter-item:hover {
    background-color: #13357B;
    color: #EDF6F9;
}
.filter-item:hover svg{
    stroke: #EDF6F9;
}
.filter-item.active {
    background-color: #13357B;
    color: #e7c6ff;
}
.filter-item.active svg{
    stroke: #e7c6ff;
    transform: rotate(180deg);
}
.options {
    display: flex;
    flex-direction: column;
    padding: 25px;
    background-color: #EDF6F9;
    border-radius: 8px;
    width: 100%;
    min-width: 400px;
    gap: 20px;
    max-height: 280px; /* Set a maximum height for the scroll area */
    overflow-y: auto;  /* Enable vertical scroll */
}
.option{
    display: flex;
    padding: 20px;
    gap: 10px;
    background-color: #EDF6F9;
    border-radius: 10px;
}
.option label{
    color: #13357B;
    font-size: 20px;
}
.option input[type="checkbox"]  {
    appearance: none;
    background-color: #EDF6F9;
    margin-right: 10px;
    border: 2px solid #13357B;
    width: 25px;
    height: 25px;
    border-radius: 25%;
}
.option input[type = "checkbox"]:checked { 
    background-color: #13357B;
}
.option input[type = "checkbox"]:checked +label { 
    font-weight: 900;
}
.option input[type = "checkbox"]:checked::after { 
    content: "\2714";
    color: #EDF6F9;
    font-size: 15px;
    font-weight: bold;
    position: relative;
    left: 20%;
    bottom: 7%;
    transform: translate(-25%, -25%);
}
.option:hover {
    background-color: #00b4d8;
}
.option:hover label{
    color: #EDF6F9;
    font-weight: 800;
}
.option.active {
    background-color: #13357B;
    font-weight: 800;
    color: #e7c6ff;
}
.option.active label{
    color: #e7c6ff;
    font-weight: 800;
}
.checked {
    /* Background color when checked */
    background-color: #CAF0F8;
}
.checked label{
    color: #13357B;
    font-weight: 900;
}
.currency-options {
    margin-top: -15px;
    display: flex;
    gap: 20px;
    justify-content: space-around;
}
.currency-options label{
    color: #13357B;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    gap: 5px;
}
.currency-options input[type="radio"] {
    appearance: none;
    background-color: #EDF6F9;
    border: 2px solid #13357B;
    width: 25px;
    height: 25px;
    border-radius: 50%;
}
.currency-options input[type = "radio"]:checked { 
    background-color: #13357B;
}
.price-inputs{
    display: flex;
    gap: 10px;
    justify-content: space-between;
    color: #13357B;
}
.price-inputs input[type="number"]{
    width: 100%;
    padding: 8px;
    border: 1px solid #00b4d8;
    border-radius: 5px;
    font-size: 14px;
    color: #13357B;
    background-color: #EDF6F9;
    outline: none;
    text-align: center;
}
.price-inputs input[type="number"]:focus{
    border: 2px solid #13357B;
    color: #00b4d8;
}
.price-inputs input[type="number"]::-webkit-outer-spin-button,
.price-inputs input[type="number"]::-webkit-inner-spin-button {
    background-color: #f1f1f1; /* Default background color for the spinner buttons */
    color: #13357B; /* Color of the spinner icon */
    border-radius: 2px;
    width: 20px;
}
.price-inputs input[type="number"]::-webkit-inner-spin-button:hover,
.price-inputs input[type="number"]::-webkit-outer-spin-button:hover {
    background-color: #13357B; /* Background color on hover */
    color: #EDF6F9; /* Icon color on hover */
}

.price-labels{
    display: flex;
    justify-content: space-between;
}
.price-labels{
    color : #13357B;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: first baseline;
    text-align: center;
    padding: 7px;
    margin-bottom: -20px;
}

::v-deep .noUi-target {
    background-color: #CAF0F8;
    border-radius: 8px;
    border: 1px solid #00b4d8;
    height: 10px;
}

::v-deep .noUi-connect {
    background-color: #13357B !important; /* Màu sắc nền của đoạn đã chọn */
    box-shadow: none !important; /* Loại bỏ box-shadow */
    border: none !important; /* Loại bỏ đường viền nếu có */
}

::v-deep .noUi-handle {
    background-color: #CAF0F8;
    border: 2px solid #13357B;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}

::v-deep .noUi-tooltip {
    background-color: #EDF6F9;
    color: #13357B;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
}
::v-deep .noUi-handle .icon-class {
    opacity: 0 !important;  
    visibility: hidden !important;
}
::v-deep .noUi-handle::before,
::v-deep .noUi-handle::after {
    content: '' !important;
    background: none !important;
    display: none !important;
}
.range-slider{
    margin: 25px 0px 0 0 ;
    width: 90.5%;
    height: 10px;
}
</style>