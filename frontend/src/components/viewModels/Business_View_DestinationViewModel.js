import { onMounted, ref } from 'vue';
import { fetchDestinationsByUser } from '../models/destinationModel';
import { fetchCities as fetchCitiesAPI } from "../models/CityModel";
import SignInModel from '../models/SignInModel';

export default function() {
    const isLoading = ref(false);
    const places = ref([]);
    const user = ref(null);
    const token = sessionStorage.getItem('access_token');
    const signInModel = new SignInModel("", "");
    const destinations = ref([]);
    const hotels = ref([]);
    const restaurants = ref([]);
    const cities = ref([]);

    const loadDestinations = async () => {
        try {
            isLoading.value = true;
            if (token) {
                const userResult = await signInModel.fetchCurrentUser(token);
                if (userResult.success) {
                    user.value = userResult.user;
                    places.value = await fetchDestinationsByUser(user.value.id);
                    places.reverse();
                    console.log("Places:", places.value);
                    destinations.value = places.value.filter(destination => destination.hotel_id === null && destination.restaurant_id === null);
                    hotels.value = places.value.filter(destination => destination.hotel_id !== null);
                    restaurants.value = places.value.filter(destination => destination.restaurant_id !== null);
                } else {
                    console.error('Cannot get user:', userResult.message);
                }
            }
        } catch (error) {
            console.error('An error occurred during authentication:', error);
        } finally {
            isLoading.value = false;
        }
    }

    const getCities = async () => {
        try {
            cities.value = await fetchCitiesAPI();
            console.log("Cities:", cities.value);
            
        } catch (error) {
            toast.error("Error fetching cities:", error);
        }
    };

    onMounted( async() => {
        await loadDestinations();
        await getCities();
    });
    return {
        isLoading,
        destinations,
        hotels,
        restaurants,
        places, 
        getCities,
        cities
    }
}