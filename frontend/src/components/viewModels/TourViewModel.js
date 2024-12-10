import { ref, onMounted, watch, nextTick } from 'vue';
import { fetchCities } from '../models/CityModel';
import { fetchTours, getTourById, getTourByCityId } from '../models/TourModel';
import { getUserById } from '../models/UserModel';

export default function () {
    const loadCities = async () => {
        try {
            const cities = await fetchCities();
            return cities;
        } catch (error) {
            console.error('Error getting city list:', error);
            return [];
        }
    }
    const loadTours = async () => {
        try {
            const tours = await fetchTours();
            return tours;
        } catch (error) {
            console.error('Error getting tour list:', error);
            return [];
        }
    }
    const loadTourById = async (tourID) => {
        try {
            const tour = await getTourById(tourID);
            return tour;
        } catch (error) {
            console.error('Error getting tour:', error);
            return [];
        }
    }
    const loadTourByCityId = async (city_id) => {
        try {
            const tours = await getTourByCityId(city_id);
            return tours;
        } catch (error) {
            console.error('Error getting tour list:', error);
            return [];
        }
    }
    const loadUser = async (userId) => {    
        try {
            const user = await getUserById(userId);
            return user;
        } catch (error) {
            console.error('Error getting user:', error);
            return [];
        }
    }
    return {
        loadCities,
        loadTours,
        loadTourById,
        loadTourByCityId,
        loadUser,
    }
}