<template>
    <div class="create-trip-container">
        <div v-if="currentStep === 1">
            <h2 class="title">Where do you want to go?</h2>
            <form class="search-container" @submit.prevent="searchDestinations">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Attraction, activities or destination"
                    class="search-input"
                />
                <button type="submit" class="search-button">Search</button>
            </form>
            <div class="suggestions-grid">
                <div
                    v-for="(destination, index) in suggestedDestinations.slice(0, 4)"
                    :key="index"
                    class="suggestion-card"
                    @click="selectDestination(destination)"
                >
                    <img :src="destination.imageUrl" alt="Destination Image" class="destination-image" />
                    <p class="destination-name">{{ destination.name }}</p>
                </div>
            </div>
            <button @click="goToCalendar" class="next-button">Next</button>
        </div>

        <div v-else-if="currentStep === 2">
            <h2 class="title">Select Your Travel Dates</h2>
            <VueDatePicker
                v-model="selectedDates"
                range
                color="primary"
                :active-picker.sync="activePicker"
                @change="onDateChange"
                class="calendar"
                show-current="true"
            />
            <button @click="goToDestinationSelection" class="back-button">Back</button>
            <button @click="submitTrip" class="submit-button">Submit</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CreateTripViewModel from '../viewModels/CreateTripViewModel';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const {
    searchQuery,
    suggestedDestinations,
    searchDestinations,
    goToCalendar,
    goToDestinationSelection,
    submitTrip,
    currentStep,
    selectedDates,
    activePicker,
    onDateChange,
} = CreateTripViewModel();
</script>



  
  <style scoped>
  .create-trip-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #edf6f9;
    overflow: hidden;
    border-radius: 20px;
  }
  
  .title {
      font-size: 4vw; /* Scale font-size with viewport width */
      color: #00bcd4;
      margin-bottom: 2vh; /* Scale margin with viewport height */
      text-align: center;
      margin-top: 20px;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    
    margin-top: 100px;
    margin-left: 20vw;
    margin-right: 20vw;
    justify-content: center;
    width: 60vw;
    
    margin-bottom: 2vh;
    padding: 1vh;
    border: 1px solid #006494;
    border-radius: 30px;
    background-color: #f0f8ff;
}

.search-input {
    flex: 1;
    padding: 1.5vh;
    border: none;
    outline: none;
    font-size: 2vw;
    color: #0099cc;
    background-color: transparent;
}

.search-button {
    background-color: #006494;
    color: #fff;
    padding: 1vh 2vw;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 2vw;
}

.suggestions-grid {
    display: flex;
    gap: 2vw;
    margin-top: 2vh;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
}

.suggestion-card {
    text-align: center;
    width: 15vw;
}

.destination-image {
    width: 10vw;
    height: 10vw;
    border-radius: 1vh;
    object-fit: cover;
}

.destination-name {
    margin-top: 0.5vh;
    font-size: 1.5vw;
    color: #333;
}

.next-button {
    position: absolute;
    bottom: 2vh;
    right: 2vw;
    padding: 1.5vh 3vw;
    background-color: #00bcd4;
    color: white;
    border: none;
    border-radius: 2vh;
    cursor: pointer;
    font-size: 2vw;
}
  
.calendar{
    background-color: #00bcd4;
    color:aquamarine;
}


.back-button, .submit-button {
    margin-top: 20px;
    padding: 10px 20px;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1em;
}

.back-button {
    background-color: #888;
}

.submit-button {
    background-color: #00bcd4;
}


  </style>
  
  
  
  