// src/controllers/DestinationManagementController.js

import { ref } from "vue";
import {
  getDestinations as fetchDestinationsAPI,
  getDestinationById,
  addDestination,
  updateDestination as updateDestinationAPI,
  deleteDestination as deleteDestinationAPI,
} from "@/models/DestinationManagementModel";

export default function () {
  const actionStep = ref("read");

  const fetchDestinations = async () => {
    try {
      const destinations = await fetchDestinationsAPI();
      return destinations;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const getDestination = async (destinationID) => {
    const destination = await getDestinationById(destinationID);
    return destination;
  };

  const createDestination = () => {
    actionStep.value = "create";
  };

  const updateDestination = async (destinationID) => {
    const destination = getDestination(destinationID);
    actionStep.value = "update";
    return destination;
  };

  const confirmCreate = async (destination, images) => {
    await addDestination(destination, images);
    actionStep.value = "read";
    fetchDestinations();
  };
  const confirmUpdate = async (destination, images) => {
    await updateDestinationAPI(destination, images);
    console.log(destination);
    actionStep.value = "read";
    fetchDestinations();
  };

  const deleteDestination = async (destinationID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this destination?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteDestinationAPI(destinationID);
        if (response.success) {
          console.log(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          console.error("Failed to delete destination:", response.message);
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
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
  };
}
