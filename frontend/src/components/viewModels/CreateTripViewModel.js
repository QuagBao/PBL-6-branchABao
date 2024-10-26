import { ref, onMounted } from 'vue';
import CreateTripModel from '../models/CreateTripModel';

export default function CreateTripViewModel() {
    const model = CreateTripModel();
    const currentStep = ref(1);
    const searchQuery = ref('');
    const suggestedDestinations = ref([]);
    const selectedDates = ref([]);
    const activePicker = ref('');

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

    const submitTrip = () => {
        console.log('Trip submitted with dates:', selectedDates.value);
    };

    const onDateChange = (value) => {
        if (value.length === 2) {
            selectedDates.value = value;
            console.log('Selected dates:', selectedDates.value);
        }
    };

    return {
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
    };
}
