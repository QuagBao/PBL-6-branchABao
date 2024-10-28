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
                v-model="rawSelectedDates"
                range
                color="primary"
                :multiCalendars="2"
                :active-picker.sync="activePicker"
                @change="onDateChange"
                :enableTime="false" 
                :format="'dd/MM/yyyy'"
                class="calendar"
                show-current="false"
            />
            <button @click="goToDestinationSelection" class="back-button">Back</button>
            <button @click="gotoTopic" class="submit-button">Next</button>
        </div>
        <div v-else-if="currentStep === 3">
            <h2 class="title">Tell us what you’re interested in</h2>
            <h3 class="title-detail">Select all that apply</h3>
            <div class="topics">
                <button
                    v-for="(topic, index) in topics"
                    :key="index"
                    :class="['topic-button', { selected: selectedTopics.includes(topic) }]"
                    @click="toggleTopic(topic)"
                >
                    {{ topic }}
                </button>
            </div>
            <button @click="goToCalendar" class="back-button">Back</button>
            <button @click="gotoTopic" class="submit-button">Next</button>
        </div>
        <div v-else-if="currentStep === 4">
            <h2 class="cities">Danang</h2>
            <h3 class="title-detail">Select all that apply</h3>
            
            <button @click="goToCalendar" class="back-button">Back</button>
            <button @click="gotoTopic" class="submit-button">Next</button>
        </div>
    </div>
</template>

<script setup>
import CreateTripViewModel from '../viewModels/CreateTripViewModel';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const {
    searchQuery,
        suggestedDestinations,
        searchDestinations,
        goToCalendar,
        goToDestinationSelection,
        gotoTopic,
        currentStep,
        selectedDates,
        activePicker,
        onDateChange,
        rawSelectedDates,
        startDay,
        endDay,
        topics,
        selectedTopics,
        toggleTopic,
        
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
    bottom: 100px;
    right: 100px;
    padding: 12px 24px;
    font-size: 1.2em;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #00bcd4;
}

.next-button:hover {
    background-color: #0088a9;
}
  
.calendar {
    background-color: #e3f2fd; /* Soft blue background */
    color: #1a237e; /* Dark blue text for readability */
    border-radius: 12px;
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 10%;
    width: 60%;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for elevation */
}

/* Header styling for the month and navigation arrows */
.calendar .vc-nav-header {
    color: #1a237e;
    font-weight: bold;
    font-size: 1.4em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
}

/* Styling for days in the calendar */
.calendar .vc-day {
    color: #1a237e; /* Regular day color */
    font-weight: 500;
    padding: 10px;
    margin: 2px;
    border-radius: 50%; /* Make days circular */
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
}

/* Styling for hovered day */
.calendar .vc-day:hover {
    background-color: #bbdefb; /* Light blue hover */
    color: #1a237e;
}

/* Styling for selected day */
.calendar .vc-day.selected {
    background-color: #0d47a1; /* Dark blue for selected day */
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Disabled days style */
.calendar .vc-day.disabled {
    color: #90a4ae;
    background-color: transparent;
    cursor: not-allowed;
}

/* Style for the 'Select' and 'Cancel' buttons */
.calendar .vc-actions button {
    background-color: #1a237e;
    color: white;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 0.9em;
    cursor: pointer;
    margin: 0 6px;
    transition: background-color 0.3s ease;
}

.calendar .vc-actions button:hover {
    background-color: #3949ab; /* Darker on hover */
}

/* Separate style for the 'Cancel' button */
.calendar .vc-actions .vc-btn-cancel {
    background-color: #e0e0e0;
    color: #455a64;
}

.calendar .vc-actions .vc-btn-cancel:hover {
    background-color: #cfd8dc;
    color: #263238;
}

/* Navigation arrows */
.calendar .vc-nav-btn {
    color: #1a237e;
    font-size: 1.2em;
    padding: 6px;
    transition: color 0.2s ease;
}

.calendar .vc-nav-btn:hover {
    color: #0d47a1;
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

.back-button, .submit-button {
    position: absolute;
    bottom: 100px;
    padding: 12px 24px;
    font-size: 1.2em;
    font-weight: bold;
    border: none;
    border-radius: 30px;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.back-button {
    left: 100px;
    background-color: #888;
}

.back-button:hover {
    background-color: #666;
}

.submit-button {
    right: 100px;
    background-color: #00bcd4;
}

.submit-button:hover {
    background-color: #0088a9;
}
.title-detail{
    font-size: 2vw; /* Scale font-size with viewport width */
    color: #1a237e;
    margin-bottom: 1.5vh; /* Scale margin with viewport height */
    text-align: center;
    margin-top: 20px;
}

.topics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    width: 45%;
    margin: 0 auto; /* Center horizontally */
    gap: 10px;
    justify-content: center;
}

.topic-button {
    padding: 10px 20px;
    border: 5px solid #2a4f8d;
    border-radius: 40px;
    background-color: #f5faff;
    color: #2a4f8d;
    font-weight: 700;
    font-size: 1.2vw;
    cursor: pointer;
    text-align: center;
}

.topic-button.selected {
    background-color: #2a4f8d;
    color: #fff;
}

  </style>
  
  
  
  