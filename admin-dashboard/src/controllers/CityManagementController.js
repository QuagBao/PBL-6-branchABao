// src/controllers/CityManagementController.js

import { ref } from "vue";
import {
  getCities as fetchCitiesAPI,
  getCityById,
  addCity,
  updateCity as updateCityAPI,
  deleteCity as deleteCityAPI,
} from "@/models/CityManagementModel";

export default function () {
  const actionStep = ref("read");

  const fetchCities = async () => {
    try {
      const cities = await fetchCitiesAPI();
      return cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getCity = async (cityID) => {
    const city = await getCityById(cityID);
    return city;
  };

  const createCity = () => {
    actionStep.value = "create";
  };

  const updateCity = async (cityID) => {
    const city = getCity(cityID);
    actionStep.value = "update";
    return city;
  };

  const confirmCreate = async (city) => {
    await addCity(city);
    actionStep.value = "read";
    window.location.reload();
  };
  const confirmUpdate = async (city) => {
    await updateCityAPI(city);
    actionStep.value = "read";
    window.location.reload();
  };

  const deleteCity = async (cityID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this city?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteCityAPI(cityID);
        if (response.success) {
          console.log(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          console.error("Failed to delete city:", response.message);
        }
      } catch (error) {
        console.error("Error deleting city:", error);
      }
    }
  };

  return {
    fetchCities,
    actionStep,
    createCity,
    updateCity,
    confirmCreate,
    confirmUpdate,
    deleteCity,
    getCity,
  };
}
