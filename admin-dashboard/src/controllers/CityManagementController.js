// src/controllers/CityManagementController.js

import { ref } from "vue";
import {
  getCities as fetchCitiesAPI,
  getCityById,
  addCity,
  updateCity,
  deleteCity,
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
    try {
      const city = await getCityById(cityID);
      return city;
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  };

  const createCity = async (cityData) => {
    actionStep.value = "create";
    try {
      const response = await addCity(cityData);
      actionStep.value = "read";
      if (response.success) {
        console.log(response.message);
        // Trigger a data refresh instead of a page reload if possible
      } else {
        console.error("Failed to add city:", response.message);
      }
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  const updateCityInfo = async (cityData) => {
    actionStep.value = "update";
    try {
      const response = await updateCity(cityData);
      actionStep.value = "read";
      if (response.success) {
        console.log(response.message);
        // Trigger a data refresh instead of a page reload if possible
      } else {
        console.error("Failed to update city:", response.message);
      }
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const deleteCityInfo = async (cityID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this city?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteCity(cityID);
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
    updateCityInfo,
    deleteCityInfo,
    getCity,
  };
}
