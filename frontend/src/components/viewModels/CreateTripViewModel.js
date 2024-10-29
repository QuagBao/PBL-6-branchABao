import { ref, onMounted, computed, watch } from 'vue';
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
    const destinations = ref([]);
    const places = ref([]);
    const attractions = ref([]);
    const restaurants = ref([]);
    const hotels = ref([]);

    onMounted(async () => {
        suggestedDestinations.value = await model.fetchCities();
    });

    // Watcher to fetch data whenever currentStep changes to 4
    watch(currentStep, async (newStep) => {
        if (newStep === 4) {
            const allDestinations = await model.fetchEntertainments();
            destinations.value = allDestinations;
            places.value = allDestinations.filter(dest => dest.destinationType === 'Place' || dest.destinationType === 'Attraction');
            attractions.value = allDestinations.filter(dest => dest.destinationType === 'Attraction');
            restaurants.value = allDestinations.filter(dest => dest.destinationType === 'Restaurant');
            hotels.value = allDestinations.filter(dest => dest.destinationType === 'Hotel');
        }
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

    const startDay = computed(() => {
        return rawSelectedDates.value && rawSelectedDates.value.length > 0 ? new Date(rawSelectedDates.value[0]) : null;
    });

    const endDay = computed(() => {
        return rawSelectedDates.value && rawSelectedDates.value.length > 1 ? new Date(rawSelectedDates.value[1]) : null;
    });
    
    const generateStars = (rating) => {
        return model.generateStars(rating);
    };

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

    const gotoPickPlace = () => {
        currentStep.value = 4;
    };

    const gotoChoosePlanning = () => {
        currentStep.value = 5;
    };

    const toggleTopic = (topic) => {
        if (selectedTopics.value.includes(topic)) {
            selectedTopics.value = selectedTopics.value.filter(t => t !== topic);
        } else {
            selectedTopics.value.push(topic);
        }
    };

    const picked = ref({});

    const togglePickStatus = (id) => {
        picked.value[id] = !picked.value[id];
    };

    const pickFull = new URL('@/assets/pick.svg', import.meta.url).href;
    const pickEmpty = new URL('@/assets/pick-none.svg', import.meta.url).href;

    // Đếm tổng số items và số đã chọn
    const selectedCount = computed(() => Object.values(picked.value).filter(isPicked => isPicked).length);
    const totalItems = computed(() => places.value.length + restaurants.value.length + hotels.value.length);

    const isAllSelected = ref(false); // Thêm biến để theo dõi trạng thái chọn tất cả

    const selectAll = () => {
        const allItems = places.value.concat(restaurants.value, hotels.value);
    
        if (isAllSelected.value) {
            // Nếu đã chọn tất cả, bỏ chọn tất cả
            allItems.forEach((item) => {
                picked.value[item.id] = false;
            });
        } else {
            // Nếu chưa chọn tất cả, chọn tất cả
            allItems.forEach((item) => {
                picked.value[item.id] = true;
            });
        }

        // Đảo ngược trạng thái
        isAllSelected.value = !isAllSelected.value;
    };
    const createItinerary = () => {
        currentStep.value = 6;
    };

    const saveForLater = () => {
        console.log('Search initiated with query:', searchQuery.value);
        console.log('Trip submitted with dates:', selectedDates.value);
        console.log('Place pick', picked.value);
        console.log("Save for later");

        
    };

    const itineraryName = ref('');

    const finishItinerary = () => {
        console.log('Search initiated with query:', searchQuery.value);
        console.log('Trip submitted with dates:', selectedDates.value);
        console.log('Place pick: ', picked.value);
        console.log("Itineary name: ", itineraryName);
    }

    return {
        searchQuery,
        suggestedDestinations,
        searchDestinations,
        goToCalendar,
        goToDestinationSelection,
        gotoTopic,
        gotoPickPlace,
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
        destinations,
        places,
        attractions,
        hotels,
        restaurants,
        generateStars,
        picked,
        togglePickStatus,
        pickFull,
        pickEmpty,
        isAllSelected,
        selectedCount,
        totalItems,
        selectAll,
        gotoChoosePlanning,
        createItinerary,
        saveForLater,
        itineraryName,
        finishItinerary
    };
}
