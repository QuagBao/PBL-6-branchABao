// src/controllers/UserManagementController.js
import { getUsers as fetchUsersAPI } from "@/models/UserManagementModel";

export const fetchUsers = async () => {
  const users = await fetchUsersAPI();
  return users;
};
