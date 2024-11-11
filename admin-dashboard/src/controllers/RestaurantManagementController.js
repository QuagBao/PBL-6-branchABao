// src/controllers/HotelManagementController.js

import { ref } from "vue";
import {
  getRestaurants as fetchRestaurantsAPI,
  getRestaurantById,
  addRestaurant,
  updateRestaurant as updateRestaurantAPI,
  deleteRestaurant as deleteRestaurantAPI,
  getDestinationName,
} from "@/models/RestaurantManagementModel";

export default function () {
  const actionStep = ref("read");

  const fetchRestaurants = async () => {
    try {
      const restaurants = await fetchRestaurantsAPI();
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const getDestination = async (destinationID) => {
    console.log("Calling API with ID:", destinationID);
    const destination = await getDestinationName(destinationID);
    console.log(destination);
    return destination;
  };

  const getRestaurant = async (restaurantID) => {
    const restaurant = await getRestaurantById(restaurantID);
    return restaurant;
  };

  const createRestaurant = () => {
    actionStep.value = "create";
  };

  const updateRestaurant = async (RestaurantID) => {
    const restaurant = getRestaurant(RestaurantID);
    console.log(restaurant);
    actionStep.value = "update";
    return restaurant;
  };

  const confirmCreate = async (Restaurant) => {
    await addRestaurant(Restaurant);
    fetchRestaurants();
    actionStep.value = "read";
  };
  const confirmUpdate = async (Restaurant) => {
    await updateRestaurantAPI(Restaurant);
    fetchRestaurants();
    actionStep.value = "read";
  };

  const deleteRestaurant = async (RestaurantID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Restaurant?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteRestaurantAPI(RestaurantID);
        if (response.success) {
          console.log(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          console.error("Failed to delete Restaurant:", response.message);
        }
      } catch (error) {
        console.error("Error deleting Restaurant:", error);
      }
    }
  };

  return {
    fetchRestaurants,
    actionStep,
    createRestaurant,
    updateRestaurant,
    confirmCreate,
    confirmUpdate,
    deleteRestaurant,
    getRestaurant,
    getDestination,
  };
}
