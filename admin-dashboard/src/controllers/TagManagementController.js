// src/controllers/CityManagementController.js

import { ref } from "vue";
import { useToast } from "vue-toastification";


import {
    getTags as fetchTagsAPI,
    getTagById,
    addTag,
    updateTag as updateTagAPI,
    deleteTag as deleteTagAPI,
    addTagToDestination
} from "@/models/TagManagementModel";

import { getDestinationByTagID, getDestinations } from "@/models/DestinationManagementModel";

export default function () {
  const actionStep = ref("read");
  const toast = useToast();

  const fetchTags = async () => {
    try {
      const tags = await fetchTagsAPI();
      return tags;
    } catch (error) {
      toast.error("Error fetching tags:", error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const destinations = await getDestinations();
      return destinations;
    } catch (error) {
      toast.error("Error fetching destinations:", error);
    }
  }
  const getTag = async (tagID) => {
    try {
      const tag = await getTagById(tagID);
      return tag;
    } catch (error) {
      toast.error("Error fetching tag:", error);
    }
  };

  const getDestByTagID = async (tagID) => {
    try {
      const destinations = await getDestinationByTagID(tagID);
      return destinations;
    } catch (error) {
      toast.error("Error fetching destinations:", error);
    }
  };

  const showDetailTag = async (tagID) => {
    try {
      const tag = await getTag(tagID);
      return tag;
    } catch (error) {
      toast.error("Error fetching tag:", error);
    }
  }; 

  const createTag = () => {
    actionStep.value = "create";
  };

  const updateTag = async (tagID) => {
    try {
      const tag = await getTag(tagID);
      actionStep.value = "update";
      return tag;
    } catch (error) {
      toast.error("Error fetching tag:", error);
    }
  };

  const confirmCreate = async (tag) => {
    try {
      await addTag(tag);
      actionStep.value = "read";
      toast.success("Add Tag successfull");
    } catch (error) {
      toast.error("Error add tag:", error);
    }
  };
  const confirmUpdate = async (tag) => {
    try {
      await updateTagAPI(tag);
      actionStep.value = "read";
      toast.success("Update Tag successfull");
    } catch (error) {
      toast.error("Error update tag:", error);
    }
  };

  const createAddDest = () => {
    actionStep.value = "create-des";
  };

  const confirmAddDest = async (tag_id, dest_id) => {
    try {
        await addTagToDestination(tag_id, dest_id);
        toast.success("Add Destination to Tags successfull");
    } catch (error) {
        toast.error("Error Destination to Tags:", error);
    }
  }


  const deleteTag = async (tagID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag?"
    );
    if (confirmDelete) {
      try {
        const response = await deleteTagAPI(tagID);
        if (response.success) {
          toast.success(response.message);
          // Trigger a data refresh instead of a page reload if possible
        } else {
          toast.error("Failed to delete tag:", response.message);
        }
      } catch (error) {
        toast.error("Error deleting tag:", error);
      }
    }
  };

  return {
    fetchTags,
    getTag,
    actionStep,
    createTag,
    updateTag,
    confirmCreate,
    confirmUpdate,
    deleteTag,
    getDestByTagID,
    showDetailTag,
    createAddDest,
    confirmAddDest,
    fetchDestinations,
  };
}
