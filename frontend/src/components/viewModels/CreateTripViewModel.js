import { ref, onMounted, computed } from 'vue';
import CreateTripModel from '../models/CreateTripModel';

export default function CreateTripViewModel() {
    const model = CreateTripModel();
    const currentStep = ref(1);
    const searchQuery = ref('');
    const suggestedDestinations = ref([]);
    const activePicker = ref('');
    const rawSelectedDates = ref([]);
    const topics = ref([
        "Religious Site/ Historic Sites",
        "Great Food",
        "Museum",
        "Theater",
        "Parks",
        "Mountain",
        "Gallery",
        "Points of interest & Landmark",
        "Neighborhoods",
        "Flea & Street Markets",
        "Scenic Walking Areas"
    ]);
    const selectedTopics = ref([]);

    onMounted(async () => {
        suggestedDestinations.value = await model.fetchCities();
    });

    const searchDestinations = () => {
        console.log('Search initiated with query:', searchQuery.value);
    };

    const goToCalendar = () => {
        currentStep.value = 2;
    };

    const goToDestinationSelection = () => {
        currentStep.value = 1;
    };

    // Computed properties for startDay and endDay
    const startDay = computed(() => {
        return rawSelectedDates.value && rawSelectedDates.value.length > 0 ? new Date(rawSelectedDates.value[0]) : null;
    });

    const endDay = computed(() => {
        return rawSelectedDates.value && rawSelectedDates.value.length > 1 ? new Date(rawSelectedDates.value[1]) : null;
    });

    // Computed property to keep the dates without the time component
    const selectedDates = computed(() => {
        if (!rawSelectedDates.value || rawSelectedDates.value.length === 0) return null;
        return rawSelectedDates.value.map(date => {
            const newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
            return newDate;
        });
    });

    const onDateChange = (dates) => {
        rawSelectedDates.value = dates; // Keep raw dates
    };

    const gotoTopic = () => {
        console.log('Trip submitted with dates:', selectedDates.value);
    
        // Format startDay and endDay as dd/MM/yyyy
        const startDateFormatted = startDay.value
            ? startDay.value.toLocaleDateString('en-GB') // 'en-GB' formats as dd/MM/yyyy
            : 'No start date';
        const endDateFormatted = endDay.value
            ? endDay.value.toLocaleDateString('en-GB')
            : 'No end date';
    
        console.log('Start Date:', startDateFormatted);
        console.log('End Date:', endDateFormatted);
        currentStep.value = 3;
    };

    const toggleTopic = (topic) => {
        if (selectedTopics.value.includes(topic)) {
            selectedTopics.value = selectedTopics.value.filter(t => t !== topic);
        } else {
            selectedTopics.value.push(topic);
        }
    };
    

    return {
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
    };
}
