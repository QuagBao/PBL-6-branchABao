// src/controllers/HotelManagementController.js

import { ref } from "vue";
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

  const fetchHotels = async () => {
    try {
      const hotels = await fetchHotelsAPI();
      return hotels;
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const getDestination = async (destinationID) => {
    console.log("Calling API with ID:", destinationID);
    const destination = await getDestinationName(destinationID);
    console.log(destination);
    return destination;
  };

  const getHotel = async (hotelID) => {
    const hotel = await getHotelById(hotelID);
    return hotel;
  };

  const createHotel = () => {
    actionStep.value = "create";
  };

  const updateHotel = async (HotelID) => {
    const hotel = getHotel(HotelID);
    console.log(hotel);
    actionStep.value = "update";
    return hotel;
  };

  const confirmCreate = async (hotel) => {
    await addHotel(hotel);
    actionStep.value = "read";
    fetchHotels();
  };
  const confirmUpdate = async (hotel) => {
    await updateHotelAPI(hotel);
    actionStep.value = "read";
    fetchHotels();
  };

  const deleteHotel = async (hotelID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteHotelAPI(hotelID);
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
