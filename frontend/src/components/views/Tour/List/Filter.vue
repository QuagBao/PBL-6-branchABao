<template>
    <div class="frame-selection"> 
        <!-- Dropdown Regions -->
        <div class="frame-select-location">
            <h5>Location</h5>
            <button class="dropdown-button" 
                    :class="{ 'active': viewModel.dropdownVisible_region }" 
                    @click="toggleDropDown_region">
                {{ viewModel.selectedRegion.label }}
                <span class="arrow" :class="{ 'up': viewModel.dropdownVisible_region }">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <!-- Dropdown danh sách các lựa chọn -->
            <div class="dropdown-list" v-if="viewModel.dropdownVisible_region">
                <button class="dropdown-item" v-for="region in viewModel.regions" 
                        :key="region" @click="selectRegion(region.id)">
                    {{ region.label }}
                </button>
            </div>
        </div>
        <!-- Dropdown lengths -->
        <div class="frame-select-length">
            <h5>Length Trip</h5>
            <button class="dropdown-button" 
                    :class="{ 'active': viewModel.dropdownVisible_length }" 
                    @click="toggleDropDown_length">
                {{ viewModel.selectedLength.label }}
                <span class="arrow" :class="{ 'up': dropdownVisible_length }">
                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L14 14.1599C13.7429 14.4323 13.4329 
                        14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 
                        12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 
                        14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9" 
                        stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round"/>
                    </svg>
                </span>
            </button>
            <!-- Dropdown danh sách các lựa chọn -->
            <div class="dropdown-list" v-if="viewModel.dropdownVisible_length">
                <button class="dropdown-item" v-for="region in viewModel.length_trip" 
                        :key="region.id" @click="selectRegion(region.id)">
                    {{ region.label }}
                </button>
            </div>
        </div>
        <!-- Price -->
        <div class="frame-select-price">
            <h5>Price</h5>
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
                <!-- <p class="col text-start">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(minPrice) }}</p> -->
                <span class="col">-</span>
                <!-- <p class="col text-end">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(maxPrice) }}</p> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import destinationViewModel from '../../../viewModels/Restaurant_ListViewModel';

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
            viewModel: new FilterViewModel(), // Khởi tạo ViewModel
        };
    },
    methods: {
        // Toggle trạng thái hiển thị dropdown
        toggleDropDown_region() {
            this.viewModel.toggleDropDown_region();
        },
        toggleDropDown_length() {
            this.viewModel.toggleDropDown_length();
        },

        // Cập nhật vùng được chọn
        selectRegion(region) {
            this.viewModel.updateRegionSelected(region.id);
            this.viewModel.toggleDropDown(); // Đóng dropdown sau khi chọn
        },

        handleCurrencyChange(currency) {
            this.viewModel.handleCurrencyChange(currency);
        },
        updateSliderFromInput(type) {
            const {minPrice, maxPrice} = this.viewModel;
            if (type === 'min') {
                this.viewModel.updatePriceRange(minPrice, maxPrice);    
            } else if (type === 'max') {
                this.viewModel.updatePriceRange(minPrice, maxPrice);
            }
            
        }
    },
};
</script>

<style scoped>
.frame-selection {
    display: flex;
    flex-direction: column;
    color: #13357B;
    gap: 30px;
}
h5 {
    font-weight: 700;
    font-size: 22px;
}
.dropdown-button{
    min-width: 300px;
    padding: 10px;
    border-radius: 15px;
    border: none;
    margin: 20px 0;
    background-color: #CAF0F8;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    color: #13357B;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    gap: 20px;
}
.dropdown-button svg {
    stroke: #13357B;
}
.dropdown-button.active {
    background-color: #13357B;
    color: #EDF6F9;
}
.dropdown-button.active svg {
    stroke: #EDF6F9;
    transform: rotate(180deg);
}
.dropdown-list {
    position: absolute;
    margin-top: 10px;
    min-width: 300px;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #EDF6F9;
    box-shadow: 0px 5px 15px rgba(19, 53, 123, 0.25);
    z-index: 5;
    overflow-y: auto;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.dropdown-item {    
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}
.dropdown-item:hover {
    background-color: #13357B;
    color: #EDF6F9;
}

/* Style cho slider */
.currency-options {
    min-width: 300px;
    margin: 20px 0;
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
    min-width: 300px;
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
    min-width: 300px;
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
    min-width: 285px;
    margin: 50px 0px 0 0 ;
    width: 100%;
    height: 10px;
}
</style>