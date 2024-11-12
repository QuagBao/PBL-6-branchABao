// src/controllers/HotelManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";
import {
  getHotels as fetchHotelsAPI,
  getHotelById,
  addHotel,
  updateHotel as updateHotelAPI,
  deleteHotel as deleteHotelAPI,
  getDestinationName,
} from "@/models/HotelManagementModel";

export default function () {
  const actionStep = ref("read");
  const toast = useToast();

  const fetchHotels = async () => {
    try {
      const hotels = await fetchHotelsAPI();
      return hotels;
    } catch (error) {
      toast.error("Error fetching hotel:", error);
    }
  };

  const getDestination = async (destinationID) => {
    try {
      const destination = await getDestinationName(destinationID);
      return destination;
    } catch (error) {
      toast.error("Error fetching Destination");
    }
  };

  const getHotel = async (hotelID) => {
    try {
      const hotel = await getHotelById(hotelID);
      return hotel;
    } catch (error) {
      toast.error("Error fetching Hotel");
    }
  };

  const createHotel = () => {
    actionStep.value = "create";
  };

  const updateHotel = async (HotelID) => {
    try {
      const hotel = getHotel(HotelID);
      actionStep.value = "update";
      return hotel;
    } catch (error) {
      toast.error("Error fetching Hotel");
    }
  };

  const confirmCreate = async (hotel) => {
    try {
      await addHotel(hotel);
      actionStep.value = "read";
      fetchHotels();
      toast.success("Add Hotel successfull");
    } catch (error) {
      toast.error("Error add Hotel");
    }
  };
  const confirmUpdate = async (hotel) => {
    try {
      await updateHotelAPI(hotel);
      actionStep.value = "read";
      fetchHotels();
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
          // Trigger a data refresh instead of a page reload if possible
        } else {
          toast.error("Failed to delete hotel:", response.message);
        }
      } catch (error) {
        toast.error("Error deleting hotel:", error);
      }
    }
  };

  return {
    fetchHotels,
    actionStep,
    createHotel,
    updateHotel,
    confirmCreate,
    confirmUpdate,
    deleteHotel,
    getHotel,
    getDestination,
  };
}
