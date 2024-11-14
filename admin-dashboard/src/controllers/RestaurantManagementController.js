// src/controllers/HotelManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getRestaurants as fetchRestaurantsAPI,
  getRestaurantById,
  addRestaurant,
  updateRestaurant as updateRestaurantAPI,
  deleteRestaurant as deleteRestaurantAPI,
  getDestinationName,
} from "@/models/RestaurantManagementModel";
import {
  addDestination,
  updateDestination as updateDestinationAPI,
} from "@/models/DestinationManagementModel";
import { getCities as fetchCitiesAPI } from "@/models/CityManagementModel";

export default function () {
  const actionStep = ref("read");
  const toast = useToast();

  const fetchCities = async () => {
    try {
      const cities = await fetchCitiesAPI();
      return cities;
    } catch (error) {
      toast.error("Error fetching cities:", error);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const restaurants = await fetchRestaurantsAPI();
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      toast.error("Error fetching restaurant");
    }
  };

  const confirmCreate_destination = async (destination, images) => {
    try {
      const result = await addDestination(destination, images);
      return result.id;
    } catch (error) {
      toast.error("Error add destination");
    }
  };

  const confirmUpdate_destination = async (
    destination,
    new_images,
    image_ids_to_remove
  ) => {
    try {
      await updateDestinationAPI(destination, new_images, image_ids_to_remove);
    } catch (error) {
      toast.error("Error update destination");
    }
  };

  const getDestination = async (destinationID) => {
    try {
      const destination = await getDestinationName(destinationID);
      return destination;
    } catch (error) {
      toast.error("Error to get Destination");
    }
  };

  const getRestaurant = async (restaurantID) => {
    try {
      const restaurant = await getRestaurantById(restaurantID);
      return restaurant;
    } catch (error) {
      toast.error("Error to get Restaurant");
    }
  };

  const createRestaurant = () => {
    actionStep.value = "create";
  };

  const updateRestaurant = async (RestaurantID) => {
    try {
      const restaurant = getRestaurant(RestaurantID);
      actionStep.value = "update";
      return restaurant;
    } catch (error) {
      console.error("Error to get Restaurant");
    }
  };

  const confirmCreate = async (Restaurant, destination, images) => {
    try {
      const id = await confirmCreate_destination(destination, images);
      Restaurant.id = id;
      await addRestaurant(Restaurant);
      actionStep.value = "read";
      toast.success("Add Restaurant successfull");
    } catch (error) {
      toast.error("Error to add Restaurant");
    }
  };
  const confirmUpdate = async (Restaurant, new_images, image_ids_to_remove) => {
    try {
      confirmUpdate_destination(Restaurant, new_images, image_ids_to_remove);
      await updateRestaurantAPI(Restaurant);
      actionStep.value = "read";
      toast.success("Update Restaurant successfull");
    } catch (error) {
      toast.error("Error to update Restaurant");
    }
  };

  const deleteRestaurant = async (RestaurantID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Restaurant?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteRestaurantAPI(RestaurantID);
        if (response.success) {
          toast.success(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          toast.error("Failed to delete Restaurant:", response.message);
        }
      } catch (error) {
        toast.error("Error deleting Restaurant:", error);
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
    fetchCities,
  };
}
