// src/controllers/DestinationManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getDestinations as fetchDestinationsAPI,
  getDestinationById,
  addDestination,
  updateDestination as updateDestinationAPI,
  deleteDestination as deleteDestinationAPI,
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
      await addDestination(destination, images);
      actionStep.value = "read";
      fetchDestinations();
      toast.success("Add Destination successfull");
    } catch (error) {
      toast.error("Error add destination");
    }
  };
  const confirmUpdate = async (destination, images) => {
    try {
      await updateDestinationAPI(destination, images);
      actionStep.value = "read";
      fetchDestinations();
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
  };
}
