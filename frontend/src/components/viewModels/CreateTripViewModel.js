import { ref, onMounted, watch, nextTick } from 'vue';
import { getTags } from '../models/TagModel';
import { useTripStore } from '@/store/useTripStore';
import { fetchDestinationsByCity_Tag } from '../models/destinationModel';
import SignInModel from '../models/SignInModel';
import { addTour } from '../models/TourModel';

export default function () {
    const tripStore = useTripStore();
    const data = {
      city: '',
      month: '',
      dayLength: '',
      topics: [],
      destinations: [],
      tripOption: '',
      tourName: '',
    };

    const tags = ref([]);
    const selectTags = ref([]);
    const places = ref([]);
    const destinations = ref([]);
    const restaurants = ref([]);
    const hotels = ref([]);
    const selectedPlace = ref([]);
    const isAllSelected = ref(false);

    const itineraryName = ref('');
    const descriptionName = ref('');
  
    const updateCity = (city) => {
      data.city = city.id;
      tripStore.setCity(city.id);
      tripStore.setSelectedDestination({ id: city.id, name: city.name });
      console.log('All Data:', tripStore.getAllInformation());
    }
  
    const updateDetails = ( month, dayLength ) => {
      data.month = month;
      data.dayLength = dayLength;
      tripStore.setSelectedMonth(month);
      tripStore.setSelectLength(dayLength);

      console.log('All Data:', tripStore.getAllInformation());
    }

    const toggleTopic = (topic) => {
      const index = selectTags.value.findIndex(t => t === topic);
      if (index === -1) {
        selectTags.value.push(topic); // Thêm topic nếu chưa có
      } else {
        selectTags.value.splice(index, 1); // Xóa topic nếu đã tồn tại
      }
  };

    const getTopics = async () => {
      return await getTags();
    }
  
    const updateTopics = () => {
      data.topics = selectTags.value;
      tripStore.setSelectTags(selectTags.value);
      console.log('All Data:', tripStore.getAllInformation());
    }

    const getPlaceData = async () => {
      try{
        places.value = await fetchDestinationsByCity_Tag(tripStore.cityId, tripStore.selectedTags);
        destinations.value = places.value.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);
        hotels.value = places.value.filter(destination => destination.hotel_id !== null);
        restaurants.value = places.value.filter(destination => destination.restaurant_id !== null);
      } catch (error) {
        console.error('An error occurred while getting place data:', error);
      }
    }

    const togglePickStatus = (place) => {
      const index = selectedPlace.value.findIndex(t => t === place);
      if (index === -1) {
        selectedPlace.value.push(place); // Thêm topic nếu chưa có
      } else {
        selectedPlace.value.splice(index, 1); // Xóa topic nếu đã tồn tại
      }
    }

    const selectAll = () => {
      // Chuyển đổi giá trị của isAllSelected
      isAllSelected.value = !isAllSelected.value;
  
      // Kiểm tra xem isAllSelected có true hay không
      if (isAllSelected.value) {
          // Lấy toàn bộ place.id nếu isAllSelected là true
          selectedPlace.value = places.map(place => place.id);
      } else {
          // Xóa toàn bộ nếu isAllSelected là false
          selectedPlace.value = [];
      }
  };

    
  
    const updateDestinations = () => {
      tripStore.setListDestination(selectedPlace.value);
      tripStore.setDestinationIds();
      console.log('All Data:', tripStore.getAllInformation());
    }

    const user = ref(null);

    const loadUser = async () => {
      const signInModel = new SignInModel("", "");
      const token = sessionStorage.getItem('access_token');
      try{
        if(token){
          const userResult = await signInModel.fetchCurrentUser(token);
          if(userResult.success){
            user.value = userResult.user;
          } else {
          console.error('Cannot get user:', error);
          }
        }
        
      } catch (error) {
        console.error('An error occurred during authentication:', error);
        return { success: false, message: error.message || 'An error occurred' };
      }
      
    }
  
    const finishItinerary = async () => {
      tripStore.setDescription(descriptionName.value);
      tripStore.setName(itineraryName.value);
      await loadUser();
      tripStore.setUserId(user.value.id);
      console.log('All Data:', tripStore.getAllInformation());
      const tour = {
        name: tripStore.name,
        description: tripStore.description,
        user_id: tripStore.userId,
        city_id: tripStore.cityId,
        destination_ids: tripStore.listDestination,
      }
      await addTour(tour);

    }

    
  
    return {
      data,
      toggleTopic,
      updateCity,
      updateDetails,
      getTopics,
      updateTopics,
      updateDestinations,
      selectTags,
      getPlaceData,
      destinations,
      hotels,
      restaurants,
      places,
      togglePickStatus,
      selectedPlace,
      isAllSelected,
      selectAll,
      itineraryName,
      descriptionName,
      finishItinerary,
    };
  }