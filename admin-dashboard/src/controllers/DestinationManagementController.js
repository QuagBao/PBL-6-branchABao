// src/controllers/DestinationManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getDestinations as fetchDestinationsAPI,
  getDestinationById,
  addDestination,
  updateDestination as updateDestinationAPI,
  deleteDestination as deleteDestinationAPI,
  addRestaurant,
  updateRestaurant as updateRestaurantAPI,
  deleteRestaurant as deleteRestaurantAPI,
  addHotel,
  updateHotel as updateHotelAPI,
  deleteHotel as deleteHotelAPI,
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

  const fetchDestinations = async () => {
    try {
      const destinations = await fetchDestinationsAPI();
      return destinations;
    } catch (error) {
      toast.error("Error fetching destination:", error);
    }
  };

  const getDestination = async (destinationID) => {
    try {
      const destination = await getDestinationById(destinationID);
      return destination;
    } catch (error) {
      toast.error("Error fetching destination:", error);
    }
  };

  const createDestination = () => {
    actionStep.value = "create";
  };

  const showDetailDestination = (destinationID) => {
    try {
      const destination = getDestination(destinationID);
      actionStep.value = "viewDetail";
      return destination;
    } catch (error) {
      toast.error("Error fetching destination");
    }
  };

  const updateDestination = async (destinationID) => {
    try {
      const destination = getDestination(destinationID);
      actionStep.value = "update";
      return destination;
    } catch (error) {
      toast.error("Error fetching destination");
    }
  };

  const confirmCreate = async (destination, images) => {
    try {
      const result = await addDestination(destination, images);
      actionStep.value = "read";
      toast.success(`Add Destination successful: ${result.name}`);
    } catch (error) {
      toast.error("Error add destination");
    }
  };
  const confirmUpdate = async (
    destination,
    new_images,
    image_ids_to_remove
  ) => {
    try {
      await updateDestinationAPI(destination, new_images, image_ids_to_remove);
      actionStep.value = "read";
      toast.success("Update Destination successfull");
    } catch (error) {
      toast.error("Error update destination");
    }
  };

  const deleteDestination = async (destinationID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteDestinationAPI(destinationID);
        if (response.success) {
          toast.success(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          toast.error("Failed to delete destination:", response.message);
        }
      } catch (error) {
        toast.error("Error deleting destination:", error);
      }
    }
  };

  const createHotel = () => {
    actionStep.value = "create-hotel";
  };

  const updateHotel = async (destinationID) => {
    try {
      const hotel = getDestination(destinationID);
      actionStep.value = "update-hotel";
      return hotel;
    } catch (error) {
      toast.error("Error fetching Hotel");
    }
  };

  const confirmCreateHotel = async (hotel) => {
    try {
      await addHotel(hotel);
      showDetailDestination(hotel.id);
      toast.success("Add Hotel successfull");
    } catch (error) {
      toast.error("Error add Hotel");
    }
  };
  const confirmUpdateHotel = async (hotel) => {
    try {
      await updateHotelAPI(hotel);
      showDetailDestination(hotel.id);
      toast.success("Update Hotel successfull");
    } catch (error) {
      toast.error("Error update Hotel");
    }
  };
  const deleteHotel = async (hotelID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteHotelAPI(hotelID);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error("Failed to delete hotel:", response.message);
        }
      } catch (error) {
        toast.error("Error deleting hotel:", error);
      }
    }
  };

  const createRestaurant = () => {
    actionStep.value = "create-restaurant";
  };

  const updateRestaurant = async (DestinationID) => {
    try {
      const restaurant = getDestination(DestinationID);
      actionStep.value = "update-restaurant";
      return restaurant;
    } catch (error) {
      console.error("Error to get Restaurant");
    }
  };

  const confirmCreateRestaurant = async (Restaurant) => {
    try {
      await addRestaurant(Restaurant);
      showDetailDestination(Restaurant.id);
      toast.success("Add Restaurant successfull");
    } catch (error) {
      toast.error("Error to add Restaurant");
    }
  };
  const confirmUpdateRestaurant = async (Restaurant) => {
    try {
      await updateRestaurantAPI(Restaurant);
      showDetailDestination(Restaurant.id);
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
    fetchDestinations,
    actionStep,
    createDestination,
    updateDestination,
    confirmCreate,
    confirmUpdate,
    deleteDestination,
    getDestination,
    fetchCities,
    showDetailDestination,
    createHotel,
    updateHotel,
    confirmCreateHotel,
    confirmUpdateHotel,
    deleteHotel,
    createRestaurant,
    updateRestaurant,
    confirmCreateRestaurant,
    confirmUpdateRestaurant,
    deleteRestaurant,
  };
}
