// src/controllers/TourManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getTours as fetchToursAPI,
  getTourById,
  addTour,
  updateTour as updateTourAPI,
  deleteTour as deleteTourAPI,
  getDestination as getDestinationAPI,
} from "@/models/TourManagementModel";
import { getCities as fetchCitiesAPI } from "@/models/CityManagementModel";
import { getUsers as fetchUsersAPI } from "@/models/UserManagementModel";

export default function () {
  const actionStep = ref("read");
  const toast = useToast();
  const fetchTours = async () => {
    try {
      const tours = await fetchToursAPI();
      return tours;
    } catch (error) {
      toast.error("Error fetching hotel:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await fetchUsersAPI();
      return users;
    } catch (error) {
      toast.error("Error to get User");
    }
  };

  const fetchCities = async () => {
    try {
      const cities = await fetchCitiesAPI();
      return cities;
    } catch (error) {
      toast.error("Error fetching cities:", error);
    }
  };

  const getDestination = async () => {
    try {
      const destination = await getDestinationAPI();
      return destination;
    } catch (error) {
      toast.error("Error fetching destination");
    }
  };

  const getTour = async (tourID) => {
    try {
      const tour = await getTourById(tourID);
      return tour;
    } catch (error) {
      toast.error("Error fetching tour");
    }
  };

  const showDetailTour = (tourID) => {
    try {
      const tour = getTour(tourID);
      actionStep.value = "viewDetail";
      return tour;
    } catch (error) {
      toast.error("Error fetching tour");
    }
  };

  const createTour = () => {
    actionStep.value = "create";
  };

  const updateTour = async (TourID) => {
    try {
      const tour = getTour(TourID);
      actionStep.value = "update";
      return tour;
    } catch (error) {
      toast.error("Error fetching tour");
    }
  };

  const confirmCreate = async (tour) => {
    try {
      await addTour(tour);
      actionStep.value = "read";
      toast.success("Create a tour success");
    } catch (error) {
      toast.error("Error add tour");
    }
  };
  const confirmUpdate = async (tour) => {
    try {
      await updateTourAPI(tour);
      actionStep.value = "read";
      toast.success("Update a tour success");
    } catch (error) {
      toast.error("Error update tour");
    }
  };

  const deleteTour = async (tourID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteTourAPI(tourID);
        if (response.success) {
          toast.success("Delete a tour complete");
          fetchTours();
          // Trigger a data refresh instead of a page reload if possible
        } else {
          toast.error("Failed to delete tour");
          console.error("Failed to delete tour:", response.message);
        }
      } catch (error) {
        console.error("Error deleting tour:", error);
      }
    }
  };

  return {
    fetchTours,
    actionStep,
    createTour,
    updateTour,
    confirmCreate,
    confirmUpdate,
    deleteTour,
    getTour,
    getDestination,
    showDetailTour,
    fetchCities,
    fetchUsers,
  };
}
