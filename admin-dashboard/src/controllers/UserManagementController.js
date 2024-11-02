// src/controllers/UserManagementController.js
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "@/models/UserManagementModel";

export const fetchUsers = () => getUsers();
export const createUser = (user) => addUser(user);
export const modifyUser = (user) => updateUser(user);
export const removeUser = (id) => deleteUser(id);
